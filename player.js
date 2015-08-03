Player = function() {
	this.hp = 100;
	this.gold = 1000;
	this.archerTowerCount = 1;
	this.frostTowerCount = 1;
	this.cannonTowerCount = 1;

	this.checkPlayerGold = function(minus) { 
		if (this.gold - minus > -1) {
			return true
		} 	else return false;
	}


	this.purchase = function(amount) {
		this.gold = this.gold - amount;
	}


	this.rewardGold = function(enemy) {
		if (enemy.race === "crawler") {
			addGold(15);
		} if (enemy.race === "tank") {
			addGold(35);
		} else if (enemy.race === "screecher") {
			addGold(25);
		}
	}

	this.takedamage = function(damage) {
		this.hp = this.hp - damage;
	}

	this.getGold = function() {
		return this.gold;
	}

	this.getArcherTowerCount = function() {
		return this.archerTowerCount;
	}

	this.getFrostTowerCount = function() {
		return this.frostTowerCount;
	}

	this.getCannonTowerCount = function() {
		return this.cannonTowerCount;
	}

	this.editArcherTowerCount = function(addORsub) {
		this.archerTowerCount += addORsub;
	}

	this.editFrostTowerCount = function(addORsub) {
		this.frostTowerCount += addORsub;
	}

	this.editCannonTowerCount = function(addORsub) {
		this.cannonTowerCount += addORsub;
	}
}