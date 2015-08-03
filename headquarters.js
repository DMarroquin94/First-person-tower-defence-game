var HP = new HealthBar();
HeadQuarters = function(geometry) {
	this.house = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial);
	this.house.position.set(0, 0, 0);

	this.maxHP = 10000;
	this.hp = 10000;
	this.dead = false;

	this.healthBar = HP.getSprite();
	this.healthBar.position.set(10, 65, 0)
	this.healthBar.scale.set(100, 10, 1);

	this.buying = function() {
		var buying = false;
		if (yawObject.position.x > -25 && yawObject.position.x < 30 &&
			yawObject.position.y > 9 && yawObject.position.y < 50 &&
			yawObject.position.z < 75 && yawObject.position.z > 45)
			buying =  true;
		
		return buying;
	}

	this.takeDamage = function(damage) {
		this.hp = this.hp - damage;

		var difference = this.hp - this.maxHP;
		var diff = difference / this.maxHP;

		this.healthBar.material.map.offset.x = diff * -1;
		this.healthBar.material.map.needsUpdate = true;
		if (diff < -1) {
			this.dead = true;
		}
	}

	this.isDestroyed = function() {
		if (this.dead) {
			return true;
		} else {
			return false;
		}
	}
}