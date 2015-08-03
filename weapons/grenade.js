Grenade = function() {
	this.grenades = [];

	this.spawn = function(pos) {
		var position = {
			x: pos.x,
			y: pos.y,
			z: pos.z
		}

		var geometry = new THREE.SphereGeometry(4, 32, 32);
		var material = new THREE.MeshBasicMaterial({
			color: 0xff0000
		});

		var grenade = new THREE.Mesh(geometry, material);
		grenade.position.x = position.x;
		grenade.position.y = position.y + 5;
		grenade.position.z = position.z;

		grenade.lifeTime = 1;
		grenade.timer = clock.getDelta();

		vector = new THREE.Vector3(0, 0, -1);
		var dir = yawObject

		dir.position.y = pitchObject.rotation.y;
		vector.applyQuaternion(dir.quaternion);
		vector.y = pitchObject.rotation.y;
		
		var rayCam = new THREE.Raycaster(camera.direction,  vector);
		
		grenade.ray = rayCam;
		grenade.yAxis = pitchObject.rotation.x;
		grenade.yVelocity = 420 * grenade.yAxis;

		grenade.alive = true

		this.grenades.push(grenade)
	}	

	this.update = function() {
		//	var dt = clock.getDelta();

		this.grenades.forEach(function (grenade) {
			if (grenade.alive) {
		//	console.log(grenade.timer)
			grenade.translateX(+ 15 * grenade.ray.ray.direction.x);
			grenade.translateY(+ 15 * grenade.yAxis);
			grenade.translateZ(+ 15 * grenade.ray.ray.direction.z);
			grenade.translateY(grenade.yVelocity * grenade.timer);

			grenade.yVelocity = grenade.yVelocity - 25
			grenade.lifeTime -= grenade.timer;
			//console.log(grenade.lifeTime)
			if (grenade.position.y < 3) {
				grenade.position.y = 3;

			} else {

			}

			//grenade.timer += grenade.timer// * dt;

					if (grenade.lifeTime < 0) {
					
						grenade.explode = true;

					}

			// if (grenade.position.y < -50) {
			// 	grenade.alive = false;
			// }
		}
		});
		var grenades = this.grenades;
		for (var index = this.grenades.length - 1; index > 0; index--) {
			if (!this.grenades[index].alive) {
				grenades = this.grenades.splice(index, 1)
			}
		}
		this.grenades = grenades;
	}

	this.draw = function() {
		this.grenades.forEach(function (grenade) {
			
			if (grenade.alive) {
				scene.add(grenade)
			} else {
				scene.remove(grenade);
			}

		});
	}

	this.explode = function(grenade) {
		
		var pos = grenade.position;
		//console.log(pos)
		createParticles(pos, 1, false, .5, false, true, 0x0e32343)

		grenade.alive = false
	}

}
