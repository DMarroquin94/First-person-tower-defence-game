
var bulletPool = [];

Pistol = function() {
	this.active = true;
	this.geometry = new THREE.SphereGeometry(0.8, 16, 16);
	this.material = new THREE.MeshBasicMaterial({wireframe: false, color: 0x00FFC8});
	this.mesh = new THREE.Mesh(this.geometry, this.material);
	this.bullets = 18;
	this.reloadTime = 2.8;


	this.pewpew = function() {

		this.bullets -= 1;
		var bullet = this.mesh.clone();
		//bullet.colors = 0x00FFC8
		bullet.alive = true;
		bullet.position.set(yawObject.position.x, yawObject.position.y + 15, yawObject.position.z);
		bullet.castShadow = false;
		vector = new THREE.Vector3(0, 0, -1);

		var dir = yawObject

		dir.position.y = pitchObject.rotation.y;

		vector.applyQuaternion(dir.quaternion);
		bullet.gun = "p";

		vector.y = pitchObject.rotation.y;
		var rayCam = new THREE.Raycaster(camera.direction,  vector);//vector.sub(pitchObject).normalize());
		//console.log("Ray direction: " + rayCam.ray.direction.x + ", "  + rayCam.ray.direction.y + " , " + rayCam.ray.direction.z)
		bullet.ray = rayCam;
		bullet.yAxis = pitchObject.rotation.x;
		bullet.owner = yawObject;
		//bullet.trail = [];
		bullet.power = 169;

		bulletPool.push(bullet)

		var geometry = new THREE.Geometry();
		var particleTexture = THREE.ImageUtils.loadTexture( 'images/smokeparticle.png' )
		var material = new THREE.PointCloudMaterial( {
			size: 3,
			transparent: true,
			opacity: true,
			map: particleTexture,
			blending: THREE.AdditiveBlending,
			sizeAttenuation: true,
			color: 0x070808
		})

		var range = 40;
		for (var i = 0; i < 10000; i++) {
			var particle = new THREE.Vector3(
				getRandomNumber(-2, 2),
				getRandomNumber(1, 5),
				getRandomNumber(-6, 0)
			);

			particle.velocityY = getRandomNumber(10, 15);
			particle.velocityX = getRandomNumber(-20, 20);
			particle.velocityZ = getRandomNumber(50, 55);

			geometry.vertices.push(particle);
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
				bulletPool.splice(count, 1)
				count--
			}
			count++;
		});
	};

	this.updateBullets =  function() {
		bulletPool.forEach(function (bullet) {
			bullet.translateX(+ 10 * bullet.ray.ray.direction.x);
			bullet.translateY(+ 10 * bullet.yAxis);
			bullet.translateZ(+ 10 * bullet.ray.ray.direction.z);

			if (bullet.position.x < -750 || bullet.position.x > 750 ||
					bullet.position.z < -750 || bullet.position.z > 750 || 
				bullet.position.y < 0 || 
				bullet.position.x < 30 && bullet.position.x > -40 &&
				bullet.position.z < 52 && bullet.position.z > -30 && bullet.position.y < 34) {
				bullet.alive = false;
				particleEffects.bulletImpact(bullet);
			}
		});
	};

	this.getBulletCount = function() {
		return this.bullets;
	}

	this.editBullets = function(addORsub) {
		this.bullets += addORsub;
	}

	this.getReloadTime = function() {
		return this.reloadTime;
	}

	this.purchase = function() {
		this.bullets = 18;	
	}
}