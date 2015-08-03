Tank = function() {
	this.tanks = [];
	this.geometry = new THREE.BoxGeometry(40, 80, 40);
	this.material = new THREE.MeshBasicMaterial({color: 0x06999C});
	
	this.move = function(tank) {
		var pos;
		var distination;
		var rayCam;
		var target;
		var you =  false;
	
		var tangent = new THREE.Vector3();
		 var axis = new THREE.Vector3();
		 var up = new THREE.Vector3(0, 0, 0);

		if (tank.counter <= 1) {
			//console.log(tank.mesh.position)
			tank.mesh.position.copy(tank.path.getPointAt(tank.counter));
			tangent = tank.path.getTangentAt(tank.counter);
			axis.crossVectors(up, tangent).normalize();
			//tank.mesh.rotation = tangent;
			var radians = Math.acos(up.dot(tangent));
			tank.mesh.quaternion.setFromAxisAngle(axis, radians);
			tank.counter += tank.movementSpeed;
		
		} else {
			tank.counter = 0;
		}
		
			tank.arrows.forEach(function(arrow) {
			arrow.position.x = tank.mesh.position.x + arrow.enemyPos.x
			arrow.position.z = tank.mesh.position.z + arrow.enemyPos.z;
			arrow.position.y = 45;
		})

		// if (getDistance(tank.mesh.position, yawObject.position) < getDistance(tank.mesh.position, house.position)) {
		// 	you = true;
		// 	tank.focus = yawObject.position.clone(); 
		// 	pos = yawObject.position.clone();
		// 	this.targ = "you"
		//  	distination = pos.normalize(pos);
		//  	rayCam = new THREE.Raycaster(tank.mesh.position,  distination);
		// } else {
		// 	tank.focus = house.position.clone();
		// 	pos = house.position.clone();
		// 	this.targ = "house"
		//  	distination = pos.normalize(pos);
		//  	rayCam = new THREE.Raycaster(tank.mesh.position,  distination);
		// }
		
		
		// tank.mesh.lookAt(tank.focus)
			
		// if (rayCam.ray.direction.z > 0)
		// 	tank.mesh.translateZ(+ (tank.movementSpeed / 100) * rayCam.ray.direction.z * 10 );
		// else tank.mesh.translateZ(+ (tank.movementSpeed / 100)  * rayCam.ray.direction.z * -10 );



		// if (you)
		// if (getDistance(tank.mesh.position, tank.focus) < 300) {
		// 	tank.isMoving = false;
		// 	tank.attack.isAttacking = true;
		// 	tank.attack.primaryAttacking = true;
		// }
		//if (!you)
		tank.healthBar.position.set(tank.mesh.position.x, tank.mesh.position.y + 55, tank.mesh.position.z)
		if (getDistance(tank.mesh.position, house.house.position) < 400) {
			tank.isMoving = false;
			tank.attack.isAttacking = true;
			tank.attack.primaryAttacking = true;
		}
	};
	
	this.spawn = function() {
		var geometry = this.geometry; 
		var material = this.material;
		var cmesh = new THREE.Mesh(geometry, material );

		cmesh.position.x = -1000
		cmesh.position.y = -100;
		cmesh.position.z = 1000
		cmesh.castShadow= true;

		var hp = new HealthBar();

		var tank = {
			race: "tank",
			maxHP: 5000,
			health: 5000,
			movementSpeed: .0001,
			damage: 15,
			alive: true, 
			isMoving: true,
			targ: "null",
			arrows: [],
			healthBar: hp.getSprite(),
			attack: {
				isAttacking: false,
				primaryAttacking: false,
				meeleeAttacking: false,
			},
			mesh: cmesh
		}

		tank.healthBar.position.set(tank.mesh.position.x, tank.mesh.position.y + 55, tank.mesh.position.z)
		tank.healthBar.scale.set(120, 4, 50);

		var path = paths.getRandomPath();

	 	tank.path = path.path;
	 	tank.path.points = tank.path.getPoints(path.points);

		this.tanks.push(tank);
		enemies.push(tank)
		collidableMeshList.push(tank);
	};
	
	this.draw = function() {
		this.tanks.forEach(function (tank) {
			if (tank.alive) {
				scene.add(tank.mesh)
				scene.add(tank.healthBar);
				
				if (tank.rock) {
					if (tank.rock.alive) {
						scene.add(tank.rock)
					} else {
						scene.remove(tank.rock)
						tank.rock.timer += 1
						if (tank.rock.timer > 100)
							tank.rock = null;
					}
				}

			} else {
				tank.arrows.forEach(function (arrow) {
					scene.remove(arrow);
				});
				scene.remove(tank.mesh)
				scene.remove(tank.healthBar)
			}
		});
	}

	this.primaryAttack = function(tank) {

		if(!tank.rock)
		if (getDistance(tank.mesh.position, house.house.position.clone()) < 400) {// < 300 && getDistance(tank.mesh.position, yawObject.position.clone()) > 50) {
			var rockgeometry = new THREE.SphereGeometry(15, 40, 40);
			var rockmaterial = new THREE.MeshBasicMaterial({wireframe: false, color: 0xD0FF2F});
			var rock = new THREE.Mesh(rockgeometry, rockmaterial);
			rock.alive = true;
			
			var origin = {
				x:  tank.mesh.position.x,
				y:  tank.mesh.position.y + 45,
				z:  tank.mesh.position.z 
			}
			
			var pos =  {
				x: house.house.position.x,
				y: house.house.position.y + 20,
				z: house.house.position.z
			}
			var distance = {
				x: origin.x - pos.x,
				y: origin.y - pos.y,
				z: origin.z - pos.z
			}

			rock.distance = distance;
			
			rock.position.set(tank.mesh.position.x, tank.mesh.position.y + 45, tank.mesh.position.z)
			rock.timer = 0;
			tank.rock = rock;
		} else {
			tank.isMoving = true;
			tank.isAttacking = false;
		}
	};

	this.secondaryAttack = function(tank) {
		tank.mesh.rotation.y += .1;
		if (getDistance(tank.mesh.position.clone(), yawObject.position.clone()) > 70) {
			tank.attack.primaryAttacking = true
			tank.attack.meeleeAttacking = false;	
		}
	};

	this.update = function() {
		this.tanks.forEach(function (tank) {
			if (tank.rock) {
					var pos = {
					x: tank.rock.position.x,
					y: tank.rock.position.y,
					z: tank.rock.position.z
				}
				if (getDistance(pos, house.house.position.clone()) > 30) {
					
					tank.rock.position.x -= (tank.rock.distance.x * .05);
					tank.rock.position.y -= (tank.rock.distance.y * .05);
					tank.rock.position.z -= (tank.rock.distance.z * .05);

					// tank.mesh.lookAt(house.position.clone())
					// if (tank.ray.ray.direction.z > 0) 
					// 	tank.rock.translateZ(- 10 * tank.ray.ray.direction.z * -1);
					// else tank.rock.translateZ(- 10 * tank.ray.ray.direction.z * 1);

					// if (tank.rock.position.y < -80)// || tank.rock.position.x < 500 && tank.rock.position.x > -500)
					// 	tank.rock = null;
				} else if (tank.rock.alive) {
					house.takeDamage(420);
					tank.rock.alive = false
					//particleEffects.bloodEffect();		
				}
			}
		});
	}
}; 


