Enemies = function() {
	this.ENEMIES = {
		Crawler: new Crawler(),
		Tank:  new Tank(),
		Screecher: new Screecher(),

	},

	this.enemies = [],

	this.draw = function() {
		for (var enemy in this.enemies) {	
			enemy = this.enemies[enemy];
		}
	} 

	this.update = function() {
		for (var enemy in this.enemies) {	
			console.log(enemy.name)		}

	}

	this.spawnCrawler = function() {
		this.ENEMIES.Crawler.spawn();
	}
}