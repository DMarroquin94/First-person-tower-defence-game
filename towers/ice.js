IceTower = function() {
	this.towers = [];

	this.spawn = function(pos) {
		var cubeGeometry = new THREE.CubeGeometry(25, 200, 25);
		var cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x47E2ED });
		var tower = new THREE.Mesh(cubeGeometry, cubeMaterial);
		 
		tower.position.set(pos.x, pos.y, pos.z)
		tower.attackSpeed = 420 / 8;

		tower.timer = clock.getDelta();

		this.towers.push(tower);
		allTowers.push(tower);
	};

	this.draw = function() {
		this.towers.forEach(function (tower) {
			scene.add(tower);

	
		})
	};

	this.update = function() {
		var dt = clock.getDelta();
		this.towers.forEach(function (tower) {
			if (!tower.isAttacking)
			collidableMeshList.forEach(function (enemy) {
				if (enemy.alive)
				if (!tower.isAttacking)
				if (getDistance(enemy.mesh.position.clone(), tower.position.clone()) < 250) {
					tower.isAttacking = true;
					IceTowerAttack(tower, enemy)		
					tower.rotation.y += .01
				}
			});		
		});
	};
};

var	IceTowerAttack = function(tower, enemy) {
	setTimeout(function ()  {
		particleEffects.IceParticleEffect(tower, enemy);
		tower.enemy = enemy.mesh.position.clone();

		if (getDistance(enemy.mesh.position.clone(), tower.position < 200) && enemy.alive) {
			IceTowerAttack(tower, enemy);
		} else tower.isAttacking = false;

	}, tower.attackSpeed);	
};
