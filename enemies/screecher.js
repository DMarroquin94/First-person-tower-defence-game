Screecher = function() {
	this.screechers = [];

	this.move = function(screecher) {
		var pos;
		var distination;
		var rayCam;
		var target;
		var you =  false;

		var tangent = new THREE.Vector3();
		 var axis = new THREE.Vector3();
		 var up = new THREE.Vector3(0, 0, 0);


		if (screecher.counter <= 1) {
			//console.log(screecher.mesh.position)
			screecher.mesh.position.copy(screecher.path.getPointAt(screecher.counter));
			tangent = screecher.path.getTangentAt(screecher.counter);
			axis.crossVectors(up, tangent).normalize();
			//screecher.mesh.rotation = tangent;
			var radians = Math.acos(up.dot(tangent));
			screecher.mesh.quaternion.setFromAxisAngle(axis, radians);
			screecher.counter += 0.002;
		} else {
			screecher.counter = 0;
		}
		screecher.healthBar.position.set(screecher.mesh.position.x, screecher.mesh.position.y + 75, screecher.mesh.position.z)
		// if (getDistance(screecher.mesh.position, yawObject.position) < getDistance(screecher.mesh.position, house.position)) {
		// 	you = true;
		// 	screecher.focus = yawObject.position.clone(); 
		// 	pos = yawObject.position.clone();
		// 	this.targ = "you"
		//  	distination = pos.normalize(pos);
		//  	rayCam = new THREE.Raycaster(screecher.mesh.position,  distination);
		// } else {
		// 	screecher.focus = house.position.clone();
		// 	pos = house.position.clone();
		// 	this.targ = "house"
		//  	distination = pos.normalize(pos);
		//  	rayCam = new THREE.Raycaster(screecher.mesh.position,  distination);
		// }
		
		
		// screecher.mesh.lookAt(screecher.focus)
			
		// if (rayCam.ray.direction.z > 0)
		// 	screecher.mesh.translateZ(+ (screecher.movementSpeed / 100) * rayCam.ray.direction.z * 10 );
		// else screecher.mesh.translateZ(+ (screecher.movementSpeed / 100)  * rayCam.ray.direction.z * -10 );



		// if (you)
		// if (getDistance(screecher.mesh.position, screecher.focus) < 300) {
		// 	screecher.isMoving = false;
		// 	screecher.attack.isAttacking = true;
		// 	screecher.attack.primaryAttacking = true;
		// }
		// if (!you)
		//console.log(getDistance(screecher.mesh.position, house.position))
		if (getDistance(screecher.mesh.position, house.house.position) < 175) {
			screecher.isMoving = false;
			screecher.attack.isAttacking = true;

		}
	};
	
	this.spawn = function() {
		var geometry = new THREE.SphereGeometry(10, 30, 30);
		var material = new THREE.MeshBasicMaterial({wireframe: false, color: 0xD66B00});
		var cannon = new THREE.Mesh(geometry, material);

		var mesh = new THREE.Mesh(geometry, material );
		
		mesh.position.x = 1000
		mesh.position.y = -80;
		mesh.position.z = 1000;
		mesh.castShadow= true;

		var hp = new HealthBar();
		var screecher = {
			race: "screecher",
			health: 400,
			maxHP: 400,
			movementSpeed: 35,
			damage: 65,
			alive: true, 
			isMoving: true,
			healthBar: hp.getSprite(),
			targ: "null",
			rings: [],
			attack: {
				isAttacking: false,
				primaryAttacking: false,
				meeleeAttacking: false,
			},
			mesh: mesh
		}

		screecher.arrows = [];

		screecher.healthBar.position.set(screecher.mesh.position.x, screecher.mesh.position.y + 15, screecher.mesh.position.z)
		screecher.healthBar.scale.set(50, 1, 50);

		var path = paths.getRandomPath();
	 	screecher.path = path.path;
	 	screecher.path.points = screecher.path.getPoints(path.points);

		this.screechers.push(screecher);
		enemies.push(screecher)
		collidableMeshList.push(screecher);
	};
	
	this.draw = function() {
		this.screechers.forEach(function (screecher) {
			if (screecher.alive) {
				scene.add(screecher.mesh)
				scene.add(screecher.healthBar);

				if (screecher.rings) {
					screecher.rings.forEach(function(ring) {
						if (ring.alive) {
							scene.add(ring)
						} else 
							scene.remove(ring)	
					});
				}
			} else {
				scene.remove(screecher.mesh)
				scene.remove(screecher.healthBar);
			}
		});
	}

	this.attack = function(screecher) {
		var radius = 1,
		segments = 32, 
		material = new THREE.MeshBasicMaterial({ color: 0xF00505}),
		geometry = new THREE.CircleGeometry( radius, segments);

		geometry.vertices.shift();
		var circle = new THREE.Line(geometry, material) 
		circle.position.x = screecher.mesh.position.x;
		circle.position.y = screecher.mesh.position.y + 10;
		circle.position.z = screecher.mesh.position.z;
		//circle.rotation.y = screecher.mesh.rotation.y;

		circle.scalar = .1;
		circle.alive = true;

		// screecher.ring = new THREE.Line(geometry, material);
		//screecher.ring.castShadow = true;

		var origin = screecher.mesh.position.clone();
		origin.y = 45;
		
		 var pos = house.house.position.clone()

		 // /pos.y -= 15;
		//console.log(origin)

		//console.log(pos)
		//console.log(yawObject.position)
		pos = pos.normalize(pos);
		console.log("attack")
		var rayCam = new THREE.Raycaster(origin, pos);//vector.sub(pitchObject).normalize());
		//console.log("Ray direction: " + rayCam.ray.direction.x + ", "  + rayCam.ray.direction.y + " , " + rayCam.ray.direction.z)
		//rayCam.ray.direction.y *= screecher.mesh.rotation.y;
		screecher.ray = rayCam;
		
		screecher.rings.push(circle);
	};

	this.update = function() {
		this.screechers.forEach(function (screecher) {
			screecher.mesh.position.y = 50;
			screecher.targ = null;
			allTowers.forEach(function (tower) {
				if (getDistance(screecher.mesh.position, tower.position < 175)) {
					screecher.attack = true
					screecher.targ = "dsds";
					screecher.enemyToHit.x = tower.position.x;
					screecher.enemyToHit.y = tower.position.y;
					screecher.enemyToHit.z = tower.position.z;
				} 								
			});
			if (screecher.targ == null)
			if (getDistance(screecher.mesh.position, house.house.position < 175)) {
						screecher.attack = true
						screecher.lookAt(house.house)
						// 			screecher.enemyToHit.x = house.house.position.x;
						// screecher.enemyToHit.y = house.house.position.y;
						// screecher.enemyToHit.z = house.house.position.z;
				 	
			} else  screecher.attack = false;
				

			screecher.rings.forEach(function (ring) {
				ring.position.z += screecher.raycam.ray.direction.z;

				ring.scale.set(ring.scalar, ring.scalar, ring.scalar);
				ring.scalar += .1;
				ring.position.z += 1;
				if (ring.scalar > 15)// || screecher.ray.position.x < 500 && screecher.ray.position.x > -500)
					ring.alive = false;
			})
		});
	}
}; 