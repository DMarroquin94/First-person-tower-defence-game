Shotgun = function() {
	this.active = false;
		this.geometry = new THREE.SphereGeometry(0.4, 12, 8);
		this.material = new THREE.MeshBasicMaterial({wireframe: false, color: 0xFABF3E});
		this.mesh = new THREE.Mesh(this.geometry, this.material);
		this.bullets = 8;
		this.reloadTime = 4;
		this.extraBullets = 0;

	this.pewpew = function() {
		this.bullets -= 1;
		
		for (var i = 0; i < 12; i++) {
			var bullet = this.mesh.clone();
			bullet.alive = true;
			bullet.position.set(yawObject.position.x + 3, yawObject.position.y + 15, yawObject.position.z);
			bullet.castShadow = false;
			bullet.gun = "s";
			bullet.color = 0x37ED58;
			vector = new THREE.Vector3(0, 0, -1)
			bullet.dir = {
				x: this.randomValue(-0.05, 0.08),
				y: this.randomValue(-0.05, 0.10),
				z: this.randomValue(-0.05, 0.05)
			}
			var dir = yawObject

			dir.position.y = pitchObject.rotation.y;

			vector.applyQuaternion(dir.quaternion);

			vector.y = pitchObject.rotation.y;
			var rayCam = new THREE.Raycaster(camera.direction,  vector);
			
			console.log(rayCam)
			bullet.ray = rayCam;

			bullet.yAxis = pitchObject.rotation.x;
			bullet.owner = yawObject;	
			bullet.power = 120;
			bulletPool.push(bullet)
		}
	};

	this.drawBullets = function() {
		var count = 0;
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

	this.updateBullets =  function() { 		
		bulletPool.forEach(function (bullet) {
			bullet.translateX(+ 10 * (bullet.ray.ray.direction.x + bullet.dir.x));
			bullet.translateY(+ 10 * (bullet.yAxis + bullet.dir.y));
			bullet.translateZ(+ 10 * bullet.ray.ray.direction.z + bullet.dir.z);

			if (bullet.position.x < -750 || bullet.position.x > 750 ||
				bullet.position.z < -750 || bullet.position.z > 750 || 
				bullet.position.y < 0) { 
				bullet.alive = false;
				particleEffects.bulletImpact(bullet);
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
		this.extraBullets = 32;
	}
}
