Crawler = function () {
	this.crawlers = [];
	this.geometry = new THREE.BoxGeometry(30, 10, 30);
	this.material = new THREE.MeshBasicMaterial({color: 0xAAF0CD});

	this.craw = function(crawler) {
		var pos;
		var distination;
		var rayCam;
		var target;
		var you =  false;
		
		var tangent = new THREE.Vector3();
		var axis = new THREE.Vector3();
		var up = new THREE.Vector3(0, 0, 0);		

		if (crawler.counter <= 1 && !crawler.squished) {

			crawler.mesh.position.copy(crawler.path.getPointAt(crawler.counter));
			tangent = crawler.path.getTangentAt(crawler.counter);
			axis.crossVectors(up, tangent).normalize();
			//crawler.mesh.rotation = tangent;
			var radians = Math.acos(up.dot(tangent));
			crawler.mesh.quaternion.setFromAxisAngle(axis, radians);
			crawler.counter += crawler.movementSpeed;
			//createCrawlerWalkingParticles(crawler)
		} else {
			crawler.counter = 0;
		}

		crawler.arrows.forEach(function(arrow) {
			if (crawler.alive) {
				arrow.position.x = crawler.mesh.position.x + arrow.enemyPos.x
				arrow.position.z = crawler.mesh.position.z + arrow.enemyPos.z;
				arrow.position.y = 10;
			}
		})

		crawler.healthBar.position.set(crawler.mesh.position.x, crawler.mesh.position.y + 15, crawler.mesh.position.z)

		// if (getDistance(crawler.mesh.position, yawhouse.position) < getDistance(crawler.mesh.position, house.position)) {
		// 	you = true;
		// 	pos = yawhouse.position.clone();
		// 	this.targ = "you"
		//  	distination = pos.normalize(pos);
		//  	rayCam = new THREE.Raycaster(crawler.mesh.position,  distination);
		// } else {
			
		// 	pos = house.position.clone();
		// 	this.targ = "house"
		//  	distination = pos.normalize(pos);
		//  	rayCam = new THREE.Raycaster(crawler.mesh.position,  distination);
		// }
		
		// 	if (you)
		// 	crawler.mesh.lookAt(yawhouse.position)
		// else crawler.mesh.lookAt(house.position)

		// if (rayCam.ray.direction.z > 0)
		// 	crawler.mesh.translateZ(+ (crawler.movementSpeed / 100) * rayCam.ray.direction.z * 10 );
		// else crawler.mesh.translateZ(+ (crawler.movementSpeed / 100)  * rayCam.ray.direction.z * -10 );
		// //console.log(house.position)
		// //console.log(meshy.position.x + ", "  + meshy.position.y + ", " + meshy.position.z + " --- " + yawhouse.position.x + ", " + pos.y + ", " + pos.z + ", ")
		// //console.log(this.distance(meshy.position, yawhouse.position))
		// //console.log(yawhouse.position);
		// if (you)
		// if (getDistance(crawler.mesh.position, yawhouse.position) < 50) {
		// 	crawler.attack.up = true;
		// 	crawler.isMoving = false;
		// 	crawler.attack.isAttacking = true;
		// 	crawler.attack.down = false;
		// }
		// if (!you)


		if (getDistance(crawler.mesh.position, house.house.position) < 60) {
			crawler.attack.up = true;
			crawler.isMoving = false;
			crawler.attack.isAttacking = true;
			crawler.attack.down = false;

		}
	};

	this.attack = function(crawler) {
		if (crawler.attack.up) {
			if (crawler.mesh.position.y < 25) {
				crawler.mesh.position.y += .99;
			}
			if (crawler.mesh.position.y < 10)	
				 crawler.mesh.rotation.y += .25
			else if (crawler.mesh.position.y < 20)
				crawler.mesh.rotation.y -= .75
			else  {
				crawler.attack.up = false;
				if (crawler.targwebgl  === "you")
					player.takeDamage(crawler.damage);
				else {
					house.takeDamage(crawler.damage)
				}
				crawler.attack.down = true;
			}
		}
		else if (crawler.attack.down) {
			if (crawler.mesh.position.y > 1)
				crawler.mesh.position.y -= .99;
			else crawler.attack.down = false;
		}
		else {
			crawler.isMoving = true;
			crawler.attack.isAttacking = false;
		}
	};

	this.distance = function(v1, v2) {
		var dx = v1.x - v2.x;
		var dy = v1.y - v2.y;
		var dz = v1.z - v2.z;

		return Math.sqrt(dx * dx + dy * dy + dz * dz);
	};

	this.spawn = function() {		
		var crawler = createCrawler(this.geometry, this.material);

	 	var path = paths.getRandomPath();
	 
	 	crawler.path = path.path;
	 	crawler.path.points = crawler.path.getPoints(path.points);

		this.crawlers.push(crawler);
		enemies.push(crawler)
		collidableMeshList.push(crawler);
	};

	this.draw = function() {
		this.crawlers.forEach(function (crawler) {
			if (crawler.alive) {
				scene.add(crawler.mesh)
				scene.add(crawler.healthBar) 

				var count = 0;
				crawler.effects.forEach(function (effect) {

					if (effect.alive) {
						scene.add(effect);
						
					 } else {
						scene.remove(effect)
						crawler.effects.splice(count, 1);
						count--;
					}	

					count++;				
					
				});
			}
			else {
				scene.remove(crawler.mesh)
				scene.remove(crawler.healthBar)
			}
		});
	};

	this.update = function() {
		var dt = clock.getDelta();
		this.crawlers.forEach(function (crawler) {
			if (crawler.squished) {
				crawler.timeSquished = crawler.timeSquished + .5; 
			}

			if (crawler.timeSquished > 40) {
				crawler.alive = false;
			}
		});
	
	};

	function createCrawler(geometry, material) {
		var cmesh = new THREE.Mesh(geometry, material );
		cmesh.position.x = 0;
		cmesh.position.y = -40;
		cmesh.position.z = 0 
		cmesh.castShadow= false;

		var hp = new HealthBar();

		var crawler = {
			race: "crawler",
			hurt: false,
			health: 1000,
			maxHP: 1000,
			movementSpeed: .0003,//getRandomNumber(.0005, .001),	
			damage: 15,
			alive: true, 
			isMoving: true,
			targ: "null",
			counter: 0,
			healthBar: hp.getSprite(),
			arrows: [],
			effects: [],
			squished: false,
			timeSquished: 0,
			attack: {
				isAttacking: false,
				up: false,
				down: false
			},
			mesh: cmesh
		}

		crawler.healthBar.position.set(crawler.mesh.position.x, crawler.mesh.position.y + 15, crawler.mesh.position.z)
		crawler.healthBar.scale.set(50, 1, 50);

		return crawler;
	}

	function createCrawlerWalkingParticles(crawler) {
	var geom = new THREE.Geometry();

	var material = new THREE.PointCloudMaterial( {
		size: 2,
		transparent: true,
		opacity: .7,
		vertexColors: true,
		sizeAttenuation: true,
		color: 0x69D9FB
	});

	var range = 4;
	for (var i = 0; i < 2; i++) {
		var particle = new THREE.Vector3(
			getRandomNumber(-1,1),
			getRandomNumber(0, 0),
			getRandomNumber(0, 1)
		);

		var tangent = new THREE.Vector3();
		var axis = new THREE.Vector3();
		var up = new THREE.Vector3(0, 0, 0);

		crawler.mesh.position.copy(crawler.path.getPointAt(crawler.counter));
		tangent = crawler.path.getTangentAt(crawler.counter);
			axis.crossVectors(up, tangent).normalize();
			//crawler.mesh.rotation = tangent;
			var radians = Math.acos(up.dot(tangent));
		var pos = crawler.mesh.quaternion.setFromAxisAngle(axis, radians).clone();
		
		particle.velocityX = getRandomNumber(-100, 100);
		//particle.velocityX = getRandomNumber(-205, 205);
		particle.velocityZ = getRandomNumber(-105, 105);
		particle.speed = getRandomNumber(.01, .04);
		particle.lifetime = 10;
		geom.vertices.push(particle);
		var color = new THREE.Color(0x69D9FB);

		color.setHSL(color.getHSL().h, color.getHSL().s, Math.random() * color.getHSL().l);
		geom.colors.push(color);
	}

	system = new THREE.PointCloud(geom, material);

	var pos = getObjectPosition(crawler.mesh);
	//console.log(pos)
	system.position.x = pos.x;
	system.position.y = pos.y;
	system.position.z = pos.z;
	system.alive = true;
	system.name = "frag";
	system.lifetime = 420 * 1.8;
	system.timer = 0;
	crawler.effects.push(system)
}

};