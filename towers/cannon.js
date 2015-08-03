CannonTower = function() {
	this.towers = [];
	this.spawn = function(pos) {
		var cubeGeometry = new THREE.CubeGeometry(25, 200, 25);
		var cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x392147 });
		var tower = new THREE.Mesh(cubeGeometry, cubeMaterial);
		 
		tower.position.set(pos.x, pos.y, pos.z)
		tower.attackSpeed = 4000;
		tower.isAttacking = false;

		tower.enemyHeight = 0;
		tower.timer = clock.getDelta();

		tower.cannons = [];
		
		this.towers.push(tower);
		allTowers.push(tower);
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
		})
	};

	this.clear = function(tower) {

		this.towers.forEach(function (tower) {
			tower.cannons.forEach(function (cannon) {
				scene.remove(cannon);	
			});

			tower.cannons = [];
		})
		
	}

	this.update = function() {
		var dt = clock.getDelta();
		this.towers.forEach(function (tower) {

			collidableMeshList.forEach(function (enemy) {
				//console.log(getDistance(enemy.mesh.position, tower.position))
				if (!tower.isAttacking)
				if (getDistance(enemy.mesh.position.clone(), tower.position.clone()) < 250 && enemy.health > 0) {
					tower.timer += tower.timer;
					tower.isAttacking = true;

					if (enemy.race === "crawler") {
						tower.enemyHeight = 5;
					} else if (enemy.race === "tank") {
						tower.enemyHeight = 20
						tower.tankToHit = enemy;
					}
					CannonTowerAttack(tower, enemy)
					tower.timer = clock.getDelta();	
						
					tower.rotation.y += .01
				}
			});

			tower.cannons.forEach(function (cannon) {
				cannon.position.x -= cannon.distance.x * .05;
				cannon.position.y -= cannon.distance.y * .05;
				cannon.position.z -= cannon.distance.z * .05;

				if (cannon.position.y < tower.enemyHeight && cannon.alive) {
					cannon.alive = false;
					damageEnemies(tower, cannon.position.clone())
					particleEffects.CannonParticleEffect(cannon)			
				}
			})	
		});
	};
};

var damageEnemies = function(tower, pos) {

	if (tower.enemyHeight == 5) 
		crawler.crawlers.forEach(function (crawler) {
			if (crawler.alive && !crawler.squished) {
				var origin = crawler.mesh.position.clone();
				//console.log(getDistance(origin, pos))
				if (getDistance(origin, pos) < 100) {
					player.rewardGold(crawler);
					crawler.mesh.scale.y = .2;

					crawler.health =0 ;
					var difference = crawler.health - crawler.maxHP;		
					var diff = difference / crawler.maxHP;
						
					crawler.healthBar.material.map.offset.x = diff * -1;
					crawler.healthBar.material.map.needsUpdate = true;

					crawler.squished = true
					particleEffects.goldEarned(crawler);
				}
			}
		})
	else {
		var enemy = tower.tankToHit;
		var origin = enemy.mesh.position.clone();
		if (getDistance(origin, pos) < 40) {

			enemy.health = enemy.health - (420 * 1.6);
			var difference = enemy.health - enemy.maxHP;		
			var diff = difference / enemy.maxHP;
				
			enemy.healthBar.material.map.offset.x = diff * -1;
			enemy.healthBar.material.map.needsUpdate = true;

			if (diff < -1) {
				enemy.alive = false;
				player.rewardGold(enemy);
				particleEffects.goldEarned(crawler);
			}
		}
	}
}

var	CannonTowerAttack = function(tower, enemy) {
	setTimeout(function () {
		if (enemy.health > 1) {
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
			tower.attackSpeed = 5000;
		}
		if (getDistance(enemy.mesh.position.clone(), tower.position.clone()) < 250 && enemy.alive && enemy.health > 1) {
			CannonTowerAttack(tower, enemy)
		} else {
			tower.isAttacking = false;
			tower.attackSpeed = 4000;
		}
	}, tower.attackSpeed)
};
