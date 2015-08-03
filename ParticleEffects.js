var effects = [];
ParticleEffects = function() {
	this.draw = function() {
		var count = 0

		effects.forEach(function (effect) {
			if (effect.alive) {
				scene.add(effect)
			 } else {
				scene.remove(effect)
						 }
		})

		for (var i = count; i < effects.length; i++) {
			if (!effects[i].alive) {
				effects.splice(i, 1);
				i == -1;
			}
		}
	}	

	this.update = function(dt) {
				
		effects.forEach(function (effect) {
			effect.lifetime = effect.lifetime + 5;
			var vertices = effect.geometry.vertices;
		
				 if (effect.lifetime > effect.end) {
				 	effect.alive = false;
				 }
			
			vertices.forEach(function (v) {
				//v.setY(v.y + .0005 * (v.velocityY * dt ))//* .002) ;
				//v.x = v.x  + .0005 * (v.velocityX * dt)// * .002;
				if (effect.name === "smoke")
					v.set(v.x + v.velocityX * .005, v.y + v.velocityY * .005, v.z  + v.velocityZ * .005)
				else if (effect.name === "snowFlake")
					v.set(v.x - v.velocityX * v.speed, v.y - v.velocityY * v.speed, v.z  - v.velocityZ * v.speed) 
				else{// if (effect.name === "blood") {
					v.set(v.x + v.velocityX * v.speed, v.y + v.velocityY * v.speed, v.z  + v.velocityZ * v.speed) 
				
					if (v.Yforce) {
						v.velocityY = v.velocityY - 2; 
					}
				}
				//else v.set(v.x + (1 * v.velocityX * .1), v.y + (1 * v.velocityY * .1), v.z + (1 * v.velocityZ * .1))
			});

			effect.geometry.verticesNeedUpdate = true;
		});
	}

	this.smoke = function(x, y, z) {
		effect = {
		positionStyle: Type.CUBE,
		positionBase: new THREE.Vector3(x, y, z),
		positionSpread: new THREE.Vector3(.1, 2, .1),

		velocityStyle: Type.CUBE,
		velocityBase: new THREE.Vector3(0, 90, 0),
		velocitySpread: new THREE.Vector3(5, 5, 5),
		accelerationBase: new THREE.Vector3(0, -420, 0),

		particleTexture: THREE.ImageUtils.loadTexture("images/smokeparticle.png"),

		angleBase: 0,
		angleSpread: 720,
		angleVelocityBase: 0,
		angleAccelerationSpread: 720,

		sizeTween: new Tween([0, 1], [0, 40]),
		opacityTween: new Tween([0, 1], [.7, .2]),
		colorTween: new Tween( [0.4, 1], [ new THREE.Vector3(0,0,0.2), new THREE.Vector3(0, 0, 0.5) ] ),

		particlesPerSecond: 10000,
		particleDeathAge: .2,
		emitterDeathAge: .1
		};

		effects.push(effect);
	};

	this.explode = function(x, y, z) {
		effect = {
			positionStyle  : Type.SPHERE,
			positionBase   : new THREE.Vector3( x, y, z),
			positionRadius : 10,
			
			velocityStyle  : Type.SPHERE,
			speedBase      : 90,
			speedSpread    : 10,
			
			accelerationBase : new THREE.Vector3( 0, -80, 0 ),
			
			particleTexture : THREE.ImageUtils.loadTexture( 'images/smokeparticle.png' ),
			
			sizeTween    : new Tween( [0.5, 0.7, 1.3], [5, 40, 1] ),
			opacityTween : new Tween( [0.2, 0.7, 2.5], [0.75, 1, 0] ),
			colorTween   : new Tween( [0.4, 0.8, 1.0], [ new THREE.Vector3(0,1,1), new THREE.Vector3(0,1,0.6), new THREE.Vector3(0.8, 1, 0.6) ] ),
			blendStyle   : THREE.AdditiveBlending,  
			
			particlesPerSecond : 3000,
			particleDeathAge   : 2.5,		
			emitterDeathAge    : 0.2
		};
		effects.push(effect);
	};
	
	

	this.bloodEffect = function(arrow) {
		var geometry = new THREE.Geometry();
			//var particleTexture = THREE.ImageUtils.loadTexture( 'images/snowFlake.png' )
				
			var particleTexture = THREE.ImageUtils.loadTexture('images/blood.png')

			var material = new THREE.PointCloudMaterial( {
				size: 10,
				transparent: true,
				opacity: 1,
				map: particleTexture,
				//blending: THREE.AdditiveBlending,
				sizeAttenuation: true,
				color: 0xFF0000
			})

			var count = 10;
			for (var i = 0; i < count; i++) {
				var particle = new THREE.Vector3(
					getRandomNumber(-1, 1),
					getRandomNumber(-1, 1),
					getRandomNumber(-1, 1)
				);

				var pos =  {
					x: arrow.position.x,
					y: arrow.position.y - 2,
					z: arrow.position.z
				}
						
				particle.velocityX = getRandomNumber(-100, 100);
				particle.velocityY = getRandomNumber(5, 50);
				particle.velocityZ = getRandomNumber(-100, 100);
				
				//particle.rotation.y = getRandomNumber(-180, 180);
				
				particle.speed = getRandomNumber(.05, .1)
				particle.dead = false;

		
			var color = new THREE.Color(0xF00C0C);

			//color.setHSL(color.getHSL().h, color.getHSL().s, Math.random() * color.getHSL().l);
			geometry.colors.push(color);
			particle.rotationY = getRandomNumber(-180, 180)  * (Math.PI / 180);
			geometry.vertices.push(particle);
			}

			effect = new THREE.PointCloud(geometry, material);
			var pos = getObjectPosition(arrow);
			effect.alive = true;
			effect.lifetime = 0
			effect.position.x = pos.x;
			effect.position.y = pos.y;
			effect.position.z = pos.z;
		
			effect.name = "blood";
			effect.sortParticles = true;
			effect.end = 50;

			effects.push(effect);
		
	};
	
	this.bulletImpact = function(bullet) {
		var geometry = new THREE.Geometry;
		var color;
		if (bullet.gun == "p") {
			color = new THREE.Color(0x00FFC8);
		} else if (bullet.gun == "s") {
			color = new THREE.Color(0xFABF3E);
		} else {
			color = new THREE.Color(0xF7233B);;
		}
		
		
		var material = new THREE.PointCloudMaterial( {
			size: getRandomNumber(4, 7),
			transparent: false,
			opacity: 1,
			vertexColors: true,
			sizeAttenuation: true,
			color: color
		})
		
		var count = getRandomNumber(10, 16);

		for (var i = 0; i < count; i++) {
			var particle = new THREE.Vector3(
				getRandomNumber(1, 3),
				getRandomNumber(1, 3),
				getRandomNumber(1, 3)
			);

			particle.velocityY = getRandomNumber(5, 30);
			particle.velocityX = getRandomNumber(-100, 100);
			particle.velocityZ = getRandomNumber(-100, 100);
			
			particle.speed = getRandomNumber(.08, .1)
			particle.alive = true;
			
			var color;
			if (bullet.gun == "p") {
				color = new THREE.Color(0x00FFC8);
			} else if (bullet.gun == "s") {
				color = new THREE.Color(0xFABF3E);
			} else {
				color = new THREE.Color(0xF7233B);;
			}


			color.setHSL(color.getHSL().h, color.getHSL().s, Math.random() * color.getHSL().l);
			geometry.colors.push(color);
			particle.rotationY = getRandomNumber(-180, 180)  * (Math.PI / 180);
			geometry.vertices.push(particle);
			

		}
			
		effect = new THREE.PointCloud(geometry, material);
		var pos = getObjectPosition(bullet);
		effect.position.x = pos.x;
		effect.position.y = pos.y;
		effect.position.z = pos.z;
		effect.name = "bullet";
		effect.alive = true;
		effect.lifetime = 0
		effect.end = 60;
		
		effects.push(effect)
	}

	this.goldEarned = function(enemy) {
		var geometry = new THREE.Geometry();
		var particleTexture = new THREE.ImageUtils.loadTexture("images/gold.png");
		var material = new THREE.PointCloudMaterial( {
			size: getRandomNumber(30, 40),
			transparent: true,
			opacity: 1,
			map: particleTexture,
			sizeAttenuation: true
		});

		var count;

		if (enemy.race === "crawler") {
			count = 3;
		} else if (enemy.race === "tank")
		count = 7;
		else count = 5;

		for (var i = 0; i < count; i++) {
			var particle = new THREE.Vector3(
				getRandomNumber(1, 2),
				getRandomNumber(1, 2),
				getRandomNumber(1, 2)
			);

			
			particle.velocityX = getRandomNumber(-20, 20);
			particle.velocityY = getRandomNumber(40, 90);
			particle.velocityZ = getRandomNumber(-20, 20);

			particle.Yforce = 20;
			particle.speed = getRandomNumber(.03, .09)

			geometry.vertices.push(particle);
		}
		var pos = enemy.mesh.position;
		console.log(pos)
		effect = new THREE.PointCloud(geometry, material);
		effect.position.x = pos.x;
		effect.position.y = pos.y;
		effect.position.z = pos.z;

		effect.alive = true;
		effect.lifetime = 0;
		effect.end = 220;
		effect.name = "gold";
		effect.sortParticles = true;

		effects.push(effect);
	}	

	this.CannonParticleEffect = function(cannon) {
		var geometry = new THREE.Geometry();
		//var particleTexture = THREE.ImageUtils.loadTexture( 'images/snowFlake.png' )
		var material = new THREE.PointCloudMaterial( {
			size: 6,
			transparent: false,
			opacity: 1,
			vertexColors: true,
			sizeAttenuation: true,
			color: 0xCC00FF
		})

		var range = getRandomNumber(200, 260);
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
					
			particle.velocityX = getRandomNumber(-250, 250);
			particle.velocityY = getRandomNumber(100, 400);
			particle.velocityZ = getRandomNumber(-250, 250);
			
			//particle.rotation.y = getRandomNumber(-180, 180);
			particle.speed = getRandomNumber(.003, .007)
			particle.dead = false;

			particle.Yforce = particle.velocityY;

		
			var color = new THREE.Color(0xCC00FF);

			color.setHSL(color.getHSL().h, color.getHSL().s, Math.random() * color.getHSL().l);
			geometry.colors.push(color);
			particle.rotationY = getRandomNumber(-180, 180)  * (Math.PI / 180);
			geometry.vertices.push(particle);
		}

		effect = new THREE.PointCloud(geometry, material);
		var pos = getObjectPosition(cannon);

		effect.alive = true;
		effect.lifetime = 0;
		effect.end = 4200 / 2.7;
		effect.position.x = pos.x;
		effect.position.y = pos.y + 10;
		effect.position.z = pos.z;
	
		effect.name = "cannon";
		effect.sortParticles = true;

		effects.push(effect);
	}

	this.GameOverParticleEffect = function() {
		var geometry = new THREE.Geometry();
		//var particleTexture = THREE.ImageUtils.loadTexture( 'images/snowFlake.png' )
		
		

		var material = new THREE.PointCloudMaterial( {
			size: 6,
			transparent: false,
			opacity: 1,
			vertexColors: true,
			sizeAttenuation: true,
			color: 0xCC00FF
		})

		var range = getRandomNumber(20, 26);
		for (var i = 0; i < range; i++) {
			var particle = new THREE.Vector3(
				getRandomNumber(-1, 1),
				getRandomNumber(-1, 1),
				getRandomNumber(-1, 1)
			);

			particle.velocityX = getRandomNumber(-250, 250);
			particle.velocityY = getRandomNumber(100, 400);
			particle.velocityZ = getRandomNumber(-250, 250);
			
			//particle.rotation.y = getRandomNumber(-180, 180);
			particle.speed = getRandomNumber(.03, .07)
			particle.dead = false;

			particle.Yforce = particle.velocityY;

		
			var color = new THREE.Color(0xCC00FF);

			color.setHSL(color.getHSL().h * Math.random(), color.getHSL().s, color.getHSL().l);
			geometry.colors.push(color);
			particle.rotationY = getRandomNumber(-180, 180)  * (Math.PI / 180);
			geometry.vertices.push(particle);
		}

		effect = new THREE.PointCloud(geometry, material);

		effect.alive = true;
		effect.lifetime = 0;
		effect.end = 4200 / 2.7;
		effect.position.x = house.house.position.x;
		effect.position.y = house.house.position.y + 10;
		effect.position.z = house.house.position.z;
		console.log(house.house.position)
		effect.name = "houseExplosion";
		effect.sortParticles = true;

		effects.push(effect);
	}


	this.IceParticleEffect = function(tower, enemy) {
		var geometry = new THREE.Geometry();
		var particleTexture = THREE.ImageUtils.loadTexture( 'images/snowFlake.png' )
		var material = new THREE.PointCloudMaterial( {
			size: getRandomNumber(4, 10),
			transparent: true,
			opacity: 1,
			map: particleTexture,
			//blending: THREE.AdditiveBlending,
			sizeAttenuation: true,
			color: 0xB8EEF2
		})

		var range = 10;
		for (var i = 0; i < range; i++) {
			var particle = new THREE.Vector3(
				getRandomNumber(-1, 1),
				getRandomNumber(-1, 1),
				getRandomNumber(-1, 1)
			);

			var pos = enemy.mesh.position;
			var distance = {
				x: tower.position.x - pos.x,
				y: tower.position.y + 101 - pos.y,
				z: tower.position.z - pos.z
			} 

			particle.velocityX = getRandomNumber(distance.x - 15, distance.x + 15);
			particle.velocityY = getRandomNumber(distance.y - 15, distance.y + 15);
			particle.velocityZ = getRandomNumber(distance.z - 15, distance.z + 15);
			
			particle.speed = getRandomNumber(.06, .09)
			geometry.vertices.push(particle);
		}

		effect = new THREE.PointCloud(geometry, material);
		var pos = getObjectPosition(tower);

		effect.position.x = pos.x;
		effect.position.y = pos.y + 101;
		effect.position.z = pos.z;  
		
		effect.alive = true;
		effect.lifetime = 0;
		effect.end = 4200 / 4;
		effect.name = "snowFlake";
		effect.sortParticles = true;

		effects.push(effect);
	}

	this.createParticles = function(pos, size, transparent, opacity, vertexColors, sizeAttenuation, color) {
		var geom = new THREE.Geometry();

		var material = new THREE.PointCloudMaterial( {
			size: size,
			transparent: transparent,
			opacity: opacity,
			vertexColors: vertexColors,
			sizeAttenuation: sizeAttenuation,
			color: color
		});

		var count = 10000;
		for (var i = 0; i < count; i++) {
			var particle = new THREE.Vector3(
				getRandomNumber(4, 8),
				getRandomNumber(4, 8),
				getRandomNumber(4, 8)
			);

			particle.velocityY = getRandomNumber(-205, 205);
			particle.velocityX = getRandomNumber(-205, 205);
			particle.velocityZ = getRandomNumber(-205, 205);
			particle.lifetime = 10;
			particle.alive = true;
			geom.vertices.push(particle);
			var color = new THREE.Color(0x00ff00);

			color.setHSL(color.getHSL().h, color.getHSL().s, Math.random() * color.getHSL().l);
			geom.colors.push(color);
		}

		effect = new THREE.PointCloud(geom, material);
		effect.position.x = pos.x;
		effect.position.y = pos.y;
		effect.position.z = pos.z;
		effect.name = "frag";
		effect.timer;
		effects.push(effect)
	};

	this.clear = function() {
		effects.forEach(function (effect) {
			scene.remove(effect);	
		});

		effects = [];
			
		}
	
};



