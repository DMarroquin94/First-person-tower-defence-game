var renderer, scene, camera, controls, stats;
var render;
var clock = new THREE.Clock();
var keyboard = new KeyboardState();

var cube;
var wave = 0;
var raycaster;
var context;
var clock = new THREE.Clock();
var timer = 0;
var menu = false;
var running = false;
var collidableMeshList = [];
var collidableBuildingMeshList = [];
var collidablePickUps = [];


var pYellowText = true;
var sYellowText = false;
var uYellowText = false;
var aYellowText = false;
var iYellowText = false;
var cYellowText = false;
var eYellowText = false;

var scope = true;
var tower = new ArcherTower();
var iceTower = new IceTower();
var cannonTower = new CannonTower();
var paths = new Path();
var HP = new HealthBar();
var screens = new Screen();
var allTowers = [];

var enemies = [];
var stats;
var arrow;


var currentWave;
var player = new Player();


var gameStarted = false;
var showTitleScreen = true;

var angle;
var engines = [];

var p = new Pistol();
var s = new Shotgun();
var u = new Uzi();

var grenade = new Grenade();
var particleEffects = new ParticleEffects();
//var enemies = new Enemies();

var	crawler = new Crawler();
var	tank = new Tank();
var	screecher = new Screecher();


var attributes, uniforms; 

var house;

var havePointerLock = 'pointerLockElement' in document ||
	'mozPointerLockElement' in document ||
	'webkitPointerLockElement' in document;


function setup() {
	createScene();
	draw();
}

function createScene() {
	//set the scene size
	var WIDTH = window.innerWidth - 4, HEIGHT = window.innerHeight - 4; 

	clock.start;
	//set some camera attributes
	var VIEW_ANGLE = 45, ASPECT = WIDTH / HEIGHT, NEAR = 0.1, FAR = 10000;

	//create a WebGL renderer, camera and zcene
	renderer = new THREE.WebGLRenderer();
	renderer.antialias = true;
	camera = new THREE.PerspectiveCamera(VIEW_ANGLE,
		ASPECT,
		NEAR,
		FAR);

	scene = new THREE.Scene();
	scene.add(camera);

	camera.position.set(0, 15, 0);
	
	renderer.setSize(WIDTH, HEIGHT);
	var canvas2D = document.createElement('canvas');
	canvas2D.id = "my2Dcanvas";
	canvas2D.width = WIDTH;
	canvas2D.height = HEIGHT;
	//canvas2D.style.backgroundColor = 0xf0f0ff;

	paths.draw();

	document.body.appendChild(canvas2D);
	var myElement = document.querySelector("#my2Dcanvas");


	
if (havePointerLock) {
	var element = document.body;
	
	var pointerlockchange = function(e) {
		if (document.pointerlockchange === element ||
			document.mozpointerlockchange === element ||
			document.webkitpointerlockchange == element) {

			controls.enabled = true;	
		} else {
			controls.enabled = false;

		}
	}

	var pointerlockerror = function(e) {

	}

	// Hook pointer lock state change events
	document.addEventListener( 'pointerlockchange', pointerlockchange, false );
	document.addEventListener( 'mozpointerlockchange', pointerlockchange, false );
	document.addEventListener( 'webkitpointerlockchange', pointerlockchange, false );
	document.addEventListener( 'pointerlockerror', pointerlockerror, false );
	document.addEventListener( 'mozpointerlockerror', pointerlockerror, false );
	document.addEventListener( 'webkitpointerlockerror', pointerlockerror, false );

	document.addEventListener('mousedown', mousePressed, false);
	
	document.addEventListener('mouseup', mouseUp, false)

	

} else {
	console.log("Your browser doesnt seem to support Pointer Lock API")
}

renderer.shadowMapEnabled = false;

renderer.domElement.setAttribute("id", "myCanvas")

document.body.appendChild(renderer.domElement);
	// controls = new THREE.OrbitControls (
	// 	camera, 
	// 	renderer.domElement
	// );


var blueLight = new THREE.SpotLight(0x0004FA);
blueLight.position.set(-500, 150, -500);
blueLight.shadowCameraVisible = false;
blueLight.shadowDarkness = 0.55;
blueLight.intensity = 2;
blueLight.castShadow = false;
scene.add(blueLight);


var purpleLight = new THREE.SpotLight(0x9700F5);
purpleLight.position.set(0, 150, -500);
purpleLight.shadowCameraVisible = false;
purpleLight.shadowDarkness = 0.55;
purpleLight.intensity = 2;
purpleLight.castShadow = false;
scene.add(purpleLight);

var redLight = new THREE.SpotLight(0xFA0019);
redLight.position.set(500, 150, -500);
redLight.shadowCameraVisible = false;
redLight.shadowDarkness = 0.55;
redLight.intensity = 2;
redLight.castShadow = false;
scene.add(redLight);

stats = new Stats();
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '10px';
stats.domElement.style.top = '10px';

stats.setMode(0);

document.body.appendChild(stats.domElement)

controls = new THREE.PointerLockControls(camera);
scene.add(controls.getObject());

raycaster = new THREE.Raycaster(new THREE.Vector3(),
								new THREE.Vector3(0, -1, 0), 0, 10);
THREE.ImageUtils.crossOrigin = '';

var floorTexture = THREE.ImageUtils.loadTexture("images/grass.jpg")

var floorMaterial = new THREE.MeshLambertMaterial({map: floorTexture, side: THREE.DoubleSide});
var floorGeometry = new THREE.PlaneGeometry(1500, 1500, 100, 100);
var floor = new THREE.Mesh(floorGeometry, floorMaterial);

floor.receiveShadow = false;

floor.position.y = -0.5;
floor.rotation.x = Math.PI / 2;
scene.add(floor);

//var axes = new THREE.AxisHelper(100);
//scene.add(axis);

var geometry = new THREE.SphereGeometry(3000, 60, 40);
var uniforms = {
  texture: { type: 't', value: THREE.ImageUtils.loadTexture('images/skydomes/skybox1.jpg') }
};

var material = new THREE.ShaderMaterial( {
  uniforms:       uniforms,
  vertexShader:   document.getElementById('sky-vertex').textContent,
  fragmentShader: document.getElementById('sky-fragment').textContent
});

skyBox = new THREE.Mesh(geometry, material);
skyBox.scale.set(-1, 1, 1);
skyBox.eulerOrder = 'XZY';
skyBox.renderDepth = 1000.0;
scene.add(skyBox);

//sprite.material.map.needsUpdate = true;

	attributes = {
		alpha: { type: 'f', value: []}
	}

	uniforms = {
		color: { type: 'c', value: new THREE.Color(0xB8EEF2)}
	}

loader = new THREE.JSONLoader();

loader.load('house.js', function(geometry) {
	house = new HeadQuarters(geometry)

	scene.add(house.house)
	scene.add(house.healthBar)
	wave = 0;
	//collidableBuildingMeshList.push(house.house)

	currentWave = new Wave();
	currentWave.setWave(wave);
});

loader.load('arrow.js', function(geometry) {
	arrow = geometry;

});

screens.showTitle();

window.addEventListener('resize', onWindowResize, false);

}
	
function draw() {
	requestAnimationFrame(draw);
	
	if (isgameOver) {
		gameOver();
		particleEffects.draw();
	}
	else if (gameStarted) {
		
		particleEffects.draw();

		if (p.active) 
			p.drawBullets();
		
		if (s.active) 
			s.drawBullets();
		else if (u.active)
			u.draw();

		//enemies.draw();
		crawler.draw();
		tank.draw();
		screecher.draw();
			
		controls.isOnObject(false);

		grenade.draw();
		
		tower.draw();
		iceTower.draw();
		cannonTower.draw();
		controls.update();
	} else {
		screens.showTitleScreen = true;
	}

	renderer.render(scene, camera);
	update();

	//console.log("cam pos: x" + yawObject.position.x + ", y"  + yawObject.position.x + " z " + yawObject.position.z)
}


function getMaterial(path) {
	var image = new Image();
	var material = new THREE.MeshBasicMaterial( {
		map: new THREE.Texture(image) 
	});

	with ( {material : material}) {
		image.onload = function() {
			this.loaded = true;
			material.map.image = this;
		};
	}

	image.src = path;
	return material;
}


function update() {
	stats.begin();
	
	checkKeyboard();
	if (isgameOver) {
		particleEffects.GameOverParticleEffect();
		particleEffects.update();
	}
	else if (gameStarted) {
		updateHUD();
		//updateEnemies();
		if (p.active) 
			p.updateBullets();
		else if (s.active) 
			s.updateBullets();
		else if (u.active)
			u.update();

		checkBuildingCollisions();

		tower.update();
		iceTower.update();
		cannonTower.update();

		crawler.crawlers.forEach(function (crawl) {
			if (!crawl.attack.isAttacking)
				crawler.craw(crawl)
			else {
				crawler.attack(crawl);
			}
		}); 

		tank.tanks.forEach(function (tanker) {
			if (tanker.isMoving){
				tank.move(tanker)
			}
			else { 
				if (tanker.attack.primaryAttacking) {
					tank.primaryAttack(tanker);
				} else if (tanker.attack.meeleeAttacking) {
					tank.secondaryAttack(tanker)
				}
			}
		});

		screecher.screechers.forEach(function (screech) {
			if (screech.isMoving)
				screecher.move(screech)
			else { 
				if 
					(screech.attack.isAttacking) {
					console.log("tits gf")
					screecher.attack(screech);
				} 
			}
		});

		crawler.update();
		tank.update();
		screecher.update();

		bulletPool.forEach(function(bullet) {
			var originPoint = bullet.position.clone();

			for (var vertexIndex = 0; vertexIndex < bullet.geometry.vertices.length; vertexIndex++) {
				var localVertex = bullet.geometry.vertices[vertexIndex].clone();
				var globalVertex = localVertex.applyMatrix4(bullet.matrix);
				var directionVector = globalVertex.sub(bullet.position);

				var ray = new THREE.Raycaster(originPoint, directionVector.clone().normalize());
			
				collidableMeshList.forEach(function(object) {
					if (object.alive && bullet.alive && !object.squished) {
						var collisionResults = ray.intersectObject(object.mesh);
						
						if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length()) {
							object.health = object.health - bullet.power;
							particleEffects.bulletImpact(bullet);
							
							bullet.alive = false;

							var difference = object.health - object.maxHP;
							var diff = difference / object.maxHP;
						
							object.healthBar.material.map.offset.x = diff * -1;
							object.healthBar.material.map.needsUpdate = true;

							if (diff < -1) {
								object.alive = false;
								player.rewardGold(object)
								particleEffects.goldEarned(object)
							}
							
						}
					}
				});

				collidableBuildingMeshList.forEach(function(obj) {
					var collisionResults = ray.intersectObject(obj);
					if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length()) {
						scene.remove(bullet)//.alive = false;
					}
				});
			}
		});

		grenade.update();

		grenade.grenades.forEach(function (frag) {
			if (frag.explode && frag.alive) {
				grenade.explode(frag);
			}
		})

		effects.forEach(function (effect) {
			if (effect.name === "snowFlake") {
				if (effect.alive)
				collidableMeshList.forEach(function (object) { 
				if (object.alive && object.slow == null) {
			
					var vertices = effect.geometry.vertices;
					vertices.forEach(function (v) {
						var pos = {
							x: v.x + effect.position.x,
							y: v.y + effect.position.y,
							z: v.z + effect.position.z
						}
						var originPoint = pos;
						var endPoint = object.mesh.position.clone();
						
						if (getDistance(originPoint, endPoint) < 5) {
							//object.isBeingFrozen = (getDistance(originPoint, endPoint) < 5)
							//console.log(object.isBeingFrozen)
							object.slow = true;
							object.movementSpeed = object.movementSpeed * .4;
						}
					});
				}
			});
			}
		})
			
		tower.towers.forEach(function (tower) {
			tower.arrows.forEach(function (arrow) {
				var originPoint = arrow.position.clone();
				
				if (!arrow.hit)
				collidableMeshList.forEach(function (object) {
					if (object.alive) {
						//var collisionResults = ray.intersectObject(object.mesh);
						if (getDistance(originPoint, object.mesh.position.clone()) < 20 && !arrow.hit){
						//if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length()) {
							//object.hurt = true;
							arrow.hit = true;
							object.health = object.health - 100;
							
							var difference = object.health - object.maxHP;
							var diff = difference / object.maxHP;
						
							object.healthBar.material.map.offset.x = diff * -1;
							object.healthBar.material.map.needsUpdate = true;

							particleEffects.bloodEffect(arrow);

							if (diff < -1) {
								object.alive = false;
								player.rewardGold(object);
								particleEffects.goldEarned(object)
	 						}
	 						if (object.name === "crawler")
								object.arrows.push(arrow)
							var pos = {
								x: arrow.position.x - object.mesh.position.x,
								y: arrow.position.y - object.mesh.position.y,
								z: arrow.position.z - object.mesh.position.z,
							}

							arrow.enemyPos = pos;
						}
					}
				});			
			});
		});

		checkWave();

		dt = clock.getDelta();
		particleEffects.update(dt)
		
		} else {
			screens.update();
		}

		if (uziShoot) {
			u.pewpew()
		}

	if (isreloadingPistol) 
		reloadPistol();	
	else if (isreloadingShotgun) 
		reloadShotgun();	
	else if (isreloadingUzi) 
		reloadUzi();

	stats.end();
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);
}

var checkWave = function() {
	if (house.dead) {
		isgameOver = true;
		gameOver();
	} else {
		isgameOver = false
		if (wave == 0) {
			if (screens.showTitleScreen) 
				screens.preWaveTime = 30
				screens.preWave();
			
			if (screens.preWaveTime - timer < 0) {
				timer = 0;
				wave = wave + 1;
				currentWave = new Wave();
				currentWave.setWave(wave);
				spawnEnemies();
			}
		} else {
			alive = false;
			crawler.crawlers.forEach(function (crawler) {
				//console.log("wow");
				if (crawler.alive)
					alive = true;
			})

			tank.tanks.forEach(function (tank) {
				if (tank.alive) 
					alive = true
			})

			if (!alive && crawler.crawlers.length > 0 && tank.tanks.length > 0) {
				clearGame();
				newWave();
			}
		}
	}
}

var newGame = function() {
	clearGame();

}

var clearGame = function() {

	crawler.crawlers.forEach(function (crawler) {
		scene.remove(crawler.mesh)
		scene.remove(crawler.healthBar)
	})

	crawler.crawlers = [];
	
	tank.tanks.forEach(function (tank) {
		scene.remove(tank.mesh)
		scene.remove(tank.healthBar)
	})

	tank.tanks = [];

	screecher.screechers.forEach(function (screecher) {
		scene.remove(screecher.mesh)
		scene.remove(screecher.healthBar)
	})

	screecher.screechers = [];
	
	bulletPool.forEach(function (bullet) {
		scene.remove(bullet)
	});

	bulletPool = [];
	
	collidableMeshList = [];

	particleEffects.clear();
	tower.clear();
}

var newWave = function() {
	wave = wave + 1;
	currentWave = new Wave();
	currentWave.setWave(wave);
	spawnEnemies();
}

var startGame = function() {
	var count = currentWave.crawlers;
	console.log(count)

var count = currentWave.tanks;
	console.log(count)

	var count = currentWave.screechers;
	console.log(count)

	spawnEnemies();
}

var spawnEnemies = function() {
	spawnCrawlers();
	spawnTanks();
	//spawnScreechers();
}

function spawnTanks() {
    setTimeout(function () {
       	tank.spawn();
       	currentWave.tanks = currentWave.tanks - 1
       //	console.log(crawler.crawlers)
       	if (currentWave.tanks > 0)
        	spawnTanks();
    }, getRandomNumber(2000, 10000));
}

function spawnScreechers() {
    setTimeout(function () {
       	screecher.spawn();
       	currentWave.screechers = currentWave.screechers - 1
       //	console.log(crawler.crawlers)
       	if (currentWave.screechers > 0)
        	spawnScreechers();
    }, getRandomNumber(2000, 5000));
}

function spawnCrawlers() {
    setTimeout(function () {
       	crawler.spawn();
       	currentWave.crawlers = currentWave.crawlers - 1
       //	console.log(crawler.crawlers)
       	if (currentWave.crawlers > 0)
        	spawnCrawlers();
    }, getRandomNumber(1000, 2000));
}

var getDistance = function(v1, v2) {
			var dx = v1.x - v2.x;
			var dy = v1.y - v2.y;
			var dz = v1.z - v2.z;
			
			return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

var checkBuildingCollisions = function() {
		if (yawObject.position.x < 30 && yawObject.position.x > -40 &&
			yawObject.position.z < 52 && yawObject.position.z > -30)
		return true;
	else return false;
};

var isOnBuilding = function() {
	if (yawObject.position.y > 15  && yawObject.position.y < 50 && checkBuildingCollisions())
		return true
	else
		return false;
};
	
var getObjectPosition = function(object) {
	var pos = {
		x: object.position.x,
		y: object.position.y,
		z: object.position.z
	}

	return pos;
} 

var getPlayerPosition = function() {
	var pos = {
		x: yawObject.position.x,
		y: yawObject.position.y,
		z: yawObject.position.z
	}

	return pos;
} 

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function myTimer() {
	var canvas = document.getElementById("my2Dcanvas")
	timer++;
	context = canvas.getContext('2d');
}

var remove = function(array, element) {
	var item = element, a = arguments, L = array.length, ax;
    while (L && array.length) {
        item = a[--L];
        while ((ax = array.indexOf(item)) !== -1) {
            array.splice(ax, 1);
        }
    }
    return array;
}

var removeElement = function(array, index) {
	return array.splice(index, 1)
}

var rgbToHex = function(r, g, b) {
    return "0x" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

var componentToHex = function(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

var addGold = function(amount) {
	player.gold = player.gold + amount;
};

var myVar=setInterval(function(){myTimer()}, 1000);