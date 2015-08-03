Uzi = function() {
	this.active = false;
	this.geometry = new THREE.SphereGeometry(0.4, 12, 10);
	this.material = new THREE.MeshBasicMaterial({wireframe: false, color: 0xF7233B});	
	this.mesh = new THREE.Mesh(this.geometry, this.material);
	this.bullets = 50;
	this.reloadTime = 2;
	this.extraBullets = 0;
	this.pewpew = function() {
		if (this.bullets > 0) {
			this.bullets -= 1;
		var pellet = this.mesh.clone();
		pellet.alive = true;
		pellet.position.set(yawObject.position.x + 3, yawObject.position.y + 15, yawObject.position.z);
		pellet.castShadow = true;
		pellet.gun = "uzi"
		vector = new THREE.Vector3(0, 0, -1)
		pellet.dir = {
			x: this.randomValue(-0.05, 0.08),
			y: this.randomValue(-0.03, 0.07),
			z: this.randomValue(-0.03, 0.07)
		}
		var dir = yawObject

		dir.position.y = pitchObject.rotation.y;

		vector.applyQuaternion(dir.quaternion);

		vector.y = pitchObject.rotation.y;
		var rayCam = new THREE.Raycaster(camera.direction,  vector);//vector.sub(pitchObject).normalize());

		pellet.ray = rayCam;
		pellet.yAxis = pitchObject.rotation.x;
		pellet.owner = yawObject;
		pellet.power = 80;

		bulletPool.push(pellet);
		console.log(bulletPool.length)
		}
	};

	this.draw = function() {
		bulletPool.forEach(function (bullet) {
			if (bullet.alive) {
				scene.add(bullet) 
			}
			else {
				scene.remove(bullet);
			}
		});

		count = 0;
		for (var i = count; i < bulletPool.length; i++) {
			if (!bulletPool[i].alive) {
				bulletPool.splice(i, 1);
				i == -1;
			}
		}
	}

	this.update = function() { //todo
		
		bulletPool.forEach(function (pellet) {
			pellet.translateX(+ 10 * (pellet.ray.ray.direction.x + pellet.dir.x));
			pellet.translateY(+ 10 * (pellet.yAxis + pellet.dir.y));
			pellet.translateZ(+ 10 * pellet.ray.ray.direction.z + pellet.dir.z);

			if (pellet.position.x < -750 || pellet.position.x > 750 ||
					pellet.position.z < -750 || pellet.position.z > 750 || 
				pellet.position.y < 0) {
					pellet.alive = false;
				particleEffects.bulletImpact(pellet);
			}
		});
	}
 
	this.randomValue = function (min, max) {
		return  (Math.random() * (max - min) + min);
	}

	this.getBulletCount = function() {
		return this.bullets;
	}

	this.getExtraBullets = function() {
		return this.extraBullets;
	}

	this.editExtraBullets = function(addorSub) {
		this.extraBullets += addorSub;
	}

	this.editBullets = function(addORsub) {
		this.bullets += addORsub;
	}

	this.getReloadTime = function() {
		return this.reloadTime;
	}

	this.purchase = function() {
		this.bullets = 18;	
		this.extraBullets = 50;
	}

}
