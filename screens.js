Screen = function() {
	this.playActive = true;
	this.aboutActive = false;
	this.howActive = false;
	this.showTitleScreen = false;
	this.showAboutScreen = false;
	this.showHowToScreen = false;

	this.preWaveTime = 1;
	this.howToPage = 1;
	this.showTitle = function() {
		var canvas = document.getElementById("my2Dcanvas")

		context = canvas.getContext('2d');
		context.clearRect(0, 0, canvas.width, canvas.height)

		context.fillStyle = "black";
		context.fillRect(480, 200, 1000, 600);

		context.fillStyle = "#3C858F";
		context.font = "bold 60px Arial";
		context.fillText("First person tower Defence Game!", 500, 325	);
		
		context.font = "bold 25px Arial";
		
		context.fillStyle = "white";
		
		if (this.howActive) 
			context.fillStyle = "#D49A3D";
		else context.fillStyle = "white;"
		context.fillText("How to play", 930, 500);

		context.fillStyle = "white";

		if (this.aboutActive) 
			context.fillStyle = "#D49A3D";
		else context.fillStyle = "white;"
		context.fillText("About", 960, 580);

		context.fillStyle = "white";
		
		context.font = "bold 55px Arial";
		if (this.playActive)
			context.fillStyle = "#D49A3D";
		else context.fillStyle = "white"

		context.fillText("Play", 940, 720);

		context.font = "bold 16px Arial";
		context.fillStyle = "#6E8B8F";
		context.fillText("version 1.0.1", 500, 790)

		context.font = "bold 20px Arial";	
		context.fillStyle = "#9E0606";
		context.fillText("Capstone by Daniel Marroquin", 840, 790)

		context.fillStyle = "#6E8B8F"
		context.font = "bold 18px Arial";
		context.fillText("Neumont University", 1300, 790)
	}

	this.showAbout = function() {
		var canvas = document.getElementById("my2Dcanvas")

		context = canvas.getContext('2d');
		context.clearRect(0, 0, canvas.width, canvas.height)

		context.fillStyle = "black";
		context.fillRect(480, 200, 1000, 600);

		context.fillStyle = "#9E0606";
		context.font = "bold 25px Arial";
		context.fillText("Back", 520, 250);


		context.fillStyle = "#3C858F";
		context.font = "bold 40px Arial";
		context.fillText("my capstone Project", 800, 300);
		

		context.font = "bold 16px Arial";
		context.fillStyle = "#6E8B8F";
		context.fillText("version 1.0.1", 500, 790)

		context.font = "bold 20px Arial";	
		context.fillStyle = "#9E0606";
		context.fillText("Capstone by Daniel Marroquin", 840, 790)

		context.fillStyle = "#6E8B8F"
		context.font = "bold 18px Arial";
		context.fillText("Neumont University", 1300, 790)
	}

	this.showHow = function() {
		var canvas = document.getElementById("my2Dcanvas")

		context = canvas.getContext('2d');
		context.clearRect(0, 0, canvas.width, canvas.height)

		context.fillStyle = "black";
		context.fillRect(480, 200, 1000, 600);

		context.fillStyle = "#9E0606";
		context.font = "bold 25px Arial";
		context.fillText("Back", 520, 250);

		context.fillStyle = "#3C858F";
		context.font = "bold 65px Arial";
		context.fillText("Controls", 850, 300);
		
		context.fillStyle = "#3C858F";
		context.font = "bold 30px Arial";
		context.fillText("'1'", 550, 400);

		context.fillStyle = "white";
		context.font = "bold 30px Arial";
		context.fillText("for archer turret (120g)", 620, 400);

		context.fillStyle = "#3C858F";
		context.font = "bold 30px Arial";
		context.fillText("'2'", 550, 450);

		context.fillStyle = "white";
		context.font = "bold 30px Arial";
		context.fillText("for ice turret (180g)", 620, 450);

		context.fillStyle = "#3C858F";
		context.font = "bold 30px Arial";
		context.fillText("'3'", 550, 500);

		context.fillStyle = "#3C858F";
		context.font = "bold 30px Arial";
		context.fillText("'WASD'", 550, 550);

		context.fillStyle = "#3C858F";
		context.font = "bold 30px Arial";
		context.fillText("'left click'", 1000, 400);

		context.fillStyle = "white";
		context.font = "bold 30px Arial";
		context.fillText("moving controls", 680, 550);

		context.fillStyle = "#3C858F";
		context.font = "bold 30px Arial";
		context.fillText("'go near the door'", 1000, 500);

		context.fillStyle = "white";
		context.font = "bold 30px Arial";
		context.fillText("to purchase", 1080, 550);


		context.fillStyle = "white";
		context.font = "bold 30px Arial";
		context.fillText("to shoot", 1150, 400);

		context.fillStyle = "white";
		context.font = "bold 30px Arial";
		context.fillText("for cannon turret (200g)", 620, 500);


		context.font = "bold 16px Arial";
		context.fillStyle = "#6E8B8F";
		context.fillText("version 1.0.1", 500, 790)

		context.font = "bold 20px Arial";	
		context.fillStyle = "#9E0606";
		context.fillText("Capstone by Daniel Marroquin", 840, 790)

		context.fillStyle = "#6E8B8F"
		context.font = "bold 18px Arial";
		context.fillText("Neumont University", 1300, 790)
	}

	this.preWave = function() {
		var canvas = document.getElementById("my2Dcanvas")

		context = canvas.getContext('2d');
		context.clearRect(0, 0, canvas.width, canvas.height)

		context.fillText("Wave", 800, 975);
		context.fillText("'"+ wave + "'" , 950, 975);

	
    	//context.fillText(timer, 850, 900);
    	context.font = "bold 16px Arial";

    	context.fillText("Wave 1 begining in " + (this.preWaveTime - timer) + " seconds!", 850, 900)
	}

	this.update = function() {
		
	}
	
}