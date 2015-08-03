Wave = function() {
	this.totalEnemies;
	this.crawlers;
	this.tanks;
	this.screechers;

	this.setWave = function(waveNumber) {
		wave = waveNumber;

		this.totalEnemies = 10 * wave;
		console.log("enemies " + this.totalEnemies)
		var ran = getRandomNumber(5, 8);
		var ran2 = getRandomNumber(1, ran) + 1;
		var ran3 = getRandomNumber(1, ran2) + 1;		

		var percent = ran / 10;
		var percent2 = ran2 / 10;
		var percent3 = ran3 / 10;

		//console.log(percent)
		this.crawlers = this.totalEnemies * percent ;
		this.tanks = this.totalEnemies *  percent2;
		//this.screechers = this.totalEnemies  - this.crawlers - this.tanks;

	}
}