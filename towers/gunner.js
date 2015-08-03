GunnerTower = function() {
	this.towers = [];

	this.spawn = function(pos) {
		var cubeGeometry = new THREE.CubeGeometry(25, 200, 25);
		var cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x392147 });
		var tower = new THREE.Mesh(cubeGeometry, cubeMaterial);
		 
		tower.position.set(pos.x, pos.y, pos.z)
		tower.attackSpeed = 1500;
		tower.grenadeSpeed = 3000;

		tower.timer = clock.getDelta();
		tower.timer2 = clock.getDelta();
		
		tower.cannons = [];
		tower.effects = [];
		tower.grenades = [];
		this.towers.push(tower);
	};


	this.draw = function() {
		this.towers.forEach(function (tower) {
			scene.add(tower);

			tower.cannons.forEach(function (cannon) {
				if (cannon.alive) {
					scene.add(cannon)
				} else {
					scene.remove(cannon)
				}
			})

			tower.effects.forEach(function (effect) {
				scene.add(effect)
			});
		})
	};



	this.update = function() {
		var dt = clock.getDelta();
		this.towers.forEach(function (tower) {

			collidableMeshList.forEach(function (enemy) {
				//console.log(getDistance(enemy.mesh.position, tower.position))
				if (tower.cannons.length < 1)
				if (getDistance(enemy.mesh.position.clone(), tower.position.clone()) < 250) {
					tower.timer += tower.timer;

				//	if (tower.timer > tower.attackSpeed && enemy.alive) {
						CannonTowerAttack(tower, enemy)
						tower.timer = clock.getDelta();	
					//}	
					tower.rotation.y += .01
				}
			});

			tower.effects.forEach(function (effect) {
				var vertices = effect.geometry.vertices;

				vertices.forEach(function (v) {
					
					
						v.set(v.x + v.velocityX * .005, 
							v.y + v.velocityY * .005, 
							v.z  + v.velocityZ * .005)

						v.velocityY = v.velocityY -  5;
					//} else {
					//	v.dead = true;
					//}
				});
				effect.needsUpdate = true;	
			});

			tower.cannons.forEach(function (cannon) {
				cannon.position.x -= cannon.distance.x * .05;
				cannon.position.y -= cannon.distance.y * .05;
				cannon.position.z -= cannon.distance.z * .05;

				if (cannon.position.y < 5 && cannon.alive) {
					cannon.alive = false;
			
					tower.effects.push( CannonParticleEffect(tower, cannon));				
				}
			})	
		});
	};
};


var CannonParticleEffect = function(tower, cannon) {
	var geometry = new THREE.Geometry();
		//var particleTexture = THREE.ImageUtils.loadTexture( 'images/snowFlake.png' )
		var material = new THREE.PointCloudMaterial( {
			size: 6,
			transparent: false,
			opacity: 1,
			vertexColors: true,
			sizeAttenuation: true,
			color: 0xB8EEF2
		})

		var range = 100;
		for (var i = 0; i < range; i++) {
			var particle = new THREE.Vector3(
				getRandomNumber(-1, 1),
				getRandomNumber(-1, 1),
				getRandomNumber(-1, 1)
			);

			var pos =  {
				x: cannon.position.x,
				y: cannon.position.y + 10,
				z: cannon.position.z
			}
					
			particle.velocityX = getRandomNumber(pos.x - 150, pos.x + 150);
			particle.velocityY = getRandomNumber(pos.y + 100, pos.y + 400);
			particle.velocityZ = getRandomNumber(pos.z - 150, pos.z + 150);
			
			//particle.rotation.y = getRandomNumber(-180, 180);
			
			particle.speed = getRandomNumber(.05, .1)
			particle.dead = false;

	
		var color = new THREE.Color(0x00ff00);

		color.setHSL(color.getHSL().h, color.getHSL().s, Math.random() * color.getHSL().l);
		geometry.colors.push(color);
		particle.rotationY = getRandomNumber(-180, 180)  * (Math.PI / 180);
		geometry.vertices.push(particle);
		}

		effect = new THREE.PointCloud(geometry, material);
		var pos = getObjectPosition(cannon);


		effect.position.x = pos.x;
		effect.position.y = pos.y + 10;
		effect.position.z = pos.z;
	
		effect.name = "cannon";
		effect.sortParticles = true;

		return effect;
	
}


var	CannonTowerAttack = function(tower, enemy) {

		var cannonGeometry = new THREE.SphereGeometry(15, 40, 40);
		var cannonMaterial = new THREE.MeshBasicMaterial({wireframe: false, color: 0x360F06});
		var cannon = new THREE.Mesh(cannonGeometry, cannonMaterial);
		cannon.alive = true;
		
		var pos = getObjectPosition(tower);
		cannon.position.x = pos.x;
		cannon.position.y = pos.y + 101;
		cannon.position.z = pos.z;

		var pos = enemy.mesh.position;
		var distance = {
			x: tower.position.x - pos.x,
			y: tower.position.y + 101 - pos.y,
			z: tower.position.z - pos.z
		} 
		cannon.distance =  {
			x: distance.x,
			y: distance.y,
			z: distance.z
		}
		cannon.castShadow = true;
		tower.cannons.push(cannon);		
};
