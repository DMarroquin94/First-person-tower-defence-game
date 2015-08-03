ArcherTower = function() {
	this.towers = [];

	this.spawn = function(pos) {
		var cubeGeometry = new THREE.CubeGeometry(25, 200, 25);
		var cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x1ec876 });
		var tower = new THREE.Mesh(cubeGeometry, cubeMaterial);
		 
		tower.position.set(pos.x, pos.y, pos.z)
		tower.attackSpeed = 420 / 1.5;

		tower.isAttacking = false;
		tower.timer = clock.getDelta();

		tower.arrows = [];
		this.towers.push(tower);
		allTowers.push(tower);
	};


	this.draw = function() {
		this.towers.forEach(function (tower) {
			scene.add(tower);
			var count = 0;
			tower.arrows.forEach(function (arrow) {
				
				if (arrow.alive) {
					scene.add(arrow)
				} else {
					scene.remove(arrow)
					tower.arrows.splice(count, 1);
					count--;
				}	
					count++;		
			})
		})
	};

	this.clear = function(tower) {

		this.towers.forEach(function (tower) {
			tower.arrows.forEach(function (arrow) {
				scene.remove(arrow);	
			});

			tower.arrows = [];
		})
		
	}

	this.update = function() {
		var dt = clock.getDelta();
		this.towers.forEach(function (tower) {
			
			if (!tower.isAttacking)
			collidableMeshList.forEach(function (enemy) {
				if (!tower.isAttacking)
				if (getDistance(enemy.mesh.position.clone(), tower.position.clone()) < 250 && enemy.alive) {
					tower.isAttacking = true;
					ArcherTowerattack(tower, enemy)
				}
			});		

			tower.arrows.forEach(function (arrow) {
				if (arrow.position.y < 5) {
					arrow.hit = true;
					arrow.lifeTime = arrow.lifeTime + 1;
					//console.log(arrow.lifeTime)
					if (arrow.lifeTime > 150) {
						arrow.alive = false;
					}
				} else { 
					var distance =  {
						x: tower.position.x - arrow.chase.x,
						y: tower.position.y - arrow.chase.y,
						z: tower.position.z - arrow.chase.z
					}
						//console.log(arrow.yVelocity)
						//arrow.rotation = distance
						// var quanternion = new THREE.Quanternion;
						//arrow.rotation.x += -85 * (Math.PI / 180);
						//quanternion.setFromAxisAngle(new THREE.Vector3(0, 1))
						//var normalized = arrow.yVelocity 
						var difference = (arrow.startingYV - arrow.yVelocity) / arrow.startingYV;
						var percent = difference / 2
						var angle =  180 - (percent * 180)
			
						//arrow.rotation.y += 1;
						//arrow.rotation.x = angle * (Math.PI / 180);
					//	console.log(arrow.rotation)
						if (arrow.rotation.x > -70 && !arrow.hit)
							arrow.rotation.x -= .1
						arrow.position.z -= ( .02 * distance.z * 1);
						arrow.position.x -= ( .02 * distance.x * 1);

						tower.rotation.y += .01;

						arrow.position.y += arrow.yVelocity * dt;
				}

				arrow.yVelocity = arrow.yVelocity - 20;
			});
		});
	};
};

var	ArcherTowerattack = function(tower, enemy) {
	setTimeout(function () {
		bullet = new THREE.Mesh(arrow, new THREE.MeshBasicMaterial);  

		bullet.scale.set(3, 3, 2)
		bullet.hit = false;
		bullet.alive = true;
		bullet.rotation.x = 90;

		bullet.castShadow = true;

		var origin = tower.position.clone();
		origin.y += 90;

		bullet.position.set(origin.x, origin.y, origin.z)
	
		var dir = enemy.mesh.position;

		var rayCam = new THREE.Raycaster(origin,  dir);
	
		bullet.ray = rayCam;
		bullet.chase = enemy.mesh.position.clone();


		bullet.lifeTime = 0;

		var dis = getDistance(origin, enemy.mesh.position)

		bullet.yVelocity = getRandomNumber(80, 210) + dis;
		bullet.xVelocity = getRandomNumber(-25, 25);
		bullet.zVelocity= getRandomNumber(-25, 25);
			
		bullet.chase.x += bullet.xVelocity;
		bullet.chase.z += bullet.zVelocity;	

		bullet.startingYV = bullet.yVelocity;
		
		tower.arrows.push(bullet);
		
		if (getDistance(enemy.mesh.position.clone(), tower.position < 250) && enemy.alive) {
			ArcherTowerattack(tower, enemy);
		} else tower.isAttacking = false;
	}, tower.attackSpeed)
};