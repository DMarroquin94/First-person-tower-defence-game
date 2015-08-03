var buying = false;
var showReloadingText = false;
var showOutOfAmmoText = false;
var isgameOver = false;

var updateHUD = function() {
	var canvas = document.getElementById("my2Dcanvas")

	context = canvas.getContext('2d');
	context.clearRect(0, 0, canvas.width, canvas.height)
	context.fillStyle = "white";
	context.font = "bold 50px Arial";

	//ontext.fillText("Health:", 20, 975);

	//context.fillText(player.hp, 192, 975);

	var moneySign = new Image();
	moneySign.src = 'images/moneySign.png';
	var x = -80//window.innerWidth * .001;
	var y = 860//window.innerHeight / 1.22 
	context.drawImage(moneySign, x, y, moneySign.width, moneySign.height)

	context.fillStyle = "#3C858F";
	context.font = "bold 50px Arial";
	total = player.getGold(); 
	context.fillText(total, 120, 965);

	//context.fillText("Wave", window.innerWidth * .45 , window.innerHeight * .99);
	//context.fillText("   '"+ wave + "'" , window.innerWidth * .5, window.innerHeight * .99);
	context.fillStyle = "#D49A3D";
	context.fillText("Wave    '", window.innerWidth * .45 , 50);
	context.fillStyle = "#3C858F";
	context.fillText(wave, window.innerWidth * .5 + 62, 50);
	context.fillStyle = "#D49A3D";
	context.fillText("'" , window.innerWidth * .5 + 50, 50);
		
	context.fillStyle = "#3C858F";	
    context.fillText(timer, 1810, 50);

    context.fillStyle = "#D49A3D";
	context.font = "bold 50px Arial";
	context.fillText("[3]", 25, 825);

	total = player.getCannonTowerCount(); 
	if (total == 0)
		context.fillStyle = "#6E8B8F";
	else
		context.fillStyle = "#3C858F";
	context.font = "bold 40px Arial";
	context.fillText(total, 105, 825);


	context.fillStyle = "#D49A3D";
	context.font = "bold 50px Arial";
	context.fillText("[2]", 25, 750);

	total = player.getFrostTowerCount();
	if (total == 0)
		context.fillStyle = "#6E8B8F";
	else
		context.fillStyle = "#3C858F";
	context.font = "bold 40px Arial";	 
	context.fillText(total, 105, 750);


	context.fillStyle = "#D49A3D";
	context.font = "bold 50px Arial";
	context.fillText("[1]", 25, 675);

	total = player.getArcherTowerCount(); 
	if (total == 0)
		context.fillStyle = "#6E8B8F";
	else
		context.fillStyle = "#3C858F";
	context.font = "bold 40px Arial";
	context.fillText(total, 105, 675);



	if (showReloadingText) {
		context.fillStyle = "Red";
		context.font = "bold 30px Arial";
		context.fillText("Reloading!!", 890, 570);
	}

	if (showOutOfAmmoText) {
		context.fillStyle = "Red";
		context.font = "bold 30px Arial";
		context.fillText("Out of ammo!!", 880, 570);
	}


    if (!buying && house.buying()) {
    	//context.fillRect(700, 300, 550, 350);
		context.stroke();
		context.fillStyle = "red";
		context.font = "bold 40px Arial";
		var bkey = new Image();
		//bkey.width = 200;

		bkey.src = 'images/b_key.png';
		var x = window.innerWidth / 1.88 - bkey.width;
		context.fillText("Press        to buy", window.innerWidth / 2.35, 650);
		var y = window.innerHeight / 1.50 - bkey.height;

		context.drawImage(bkey, x, y, bkey.width, bkey.height)
    } else if (menu) {
		context.fillRect(700, 300, 550, 350);
		context.stroke();
		context.fillStyle = "black";
		context.font = "bold 40px Arial";
		context.fillText("Menu", 920, 375);
		context.font = "bold 15px Arial";
		context.fillText("How to play", 930, 450);
		context.fillText("Restart", 945, 500);
		context.font = "bold 30px Arial";
		context.fillText("BACK", 930, 570);	

	} else if (buying) {

		context.fillStyle = "#586263";
		context.fillRect(700, 300, 550, 350);
		context.stroke();
		context.fillStyle = "#3C858F";
		context.font = "bold 45px Arial";
		context.fillText("Head Quarters", 835 	, 375);
		context.font = "bold 15px Arial";

		if (pYellowText) {
			context.fillStyle = "#D49A3D"
		}
		else context.fillStyle = "white";

		context.fillText("Purchase pistol", 850, 420);
		context.fillStyle = "#6E8B8F";
		context.fillText("FREE", 1090, 420);
		
		if (sYellowText) {
			context.fillStyle = "#D49A3D"
		} else {
			context.fillStyle = "white"
		}

		context.fillText("Purchase shotgun and ammo", 850, 480);
		if (player.getGold() > 349)
			context.fillStyle = "cyan";
		else 
			context.fillStyle = "RED";
		context.fillText("350G", 1090, 480);


		if (uYellowText) {
			context.fillStyle = "#D49A3D"
		} else {
			context.fillStyle = "white"
		}
		context.fillText("Purchase uzi and ammo", 850, 450);
		if (player.getGold() > 249)
			context.fillStyle = "cyan";
		else 
			context.fillStyle = "RED";
		context.fillText("250G", 1090, 450);

		if (aYellowText) {
			context.fillStyle = "#D49A3D"
		} else {
			context.fillStyle = "white"
		}
		context.fillText("Purchase archer tower", 850, 510);
		if (player.getGold() > 499)
			context.fillStyle = "cyan";
		else 
			context.fillStyle = "RED";
		context.fillText("500G", 1090, 510);

		if (iYellowText) {
			context.fillStyle = "#D49A3D"
		} else {
			context.fillStyle = "white"
		}
		context.fillText("Purchase ice tower", 850, 540);
		if (player.getGold() > 749)
			context.fillStyle = "cyan";
		else 
			context.fillStyle = "RED";
		context.fillText("750G", 1090, 540);

		if (cYellowText) {
			context.fillStyle = "#D49A3D"
		} else {
			context.fillStyle = "white"
		}
		context.fillText("Purchase cannon tower", 850, 570);
		if (player.getGold() > 999)
			context.fillStyle = "cyan";
		else 
			context.fillStyle = "RED";
		context.fillText("1000G", 1090, 570);


		if (eYellowText) {
			context.fillStyle = "#D49A3D"
		} else {
			context.fillStyle = "white"
		}
		context.fillText("Exit", 975, 620);

	} else {
		drawCrosshairs(context);
	}
	drawInventory(context);
	
};

var yBlueText = true;
var nBlueText = false;

var gameOver = function() {

		var canvas = document.getElementById("my2Dcanvas")

		context = canvas.getContext('2d');
		context.clearRect(0, 0, canvas.width, canvas.height)
		context.fillStyle = "black";
		context.fillRect(700, 300, 550, 350);
		context.fillStyle = "#3C858F";
		context.font = "bold 50px Arial";
		context.fillText("Game Over", 850, 400);

		context.fillStyle = "#9E0606";
		context.font = "bold 30px Arial";
		context.fillText("Play again?", 905, 480);

		if (yBlueText)
			context.fillStyle = "#D49A3D";
		else context.fillStyle = "white";
		context.font = "bold 25px Arial";
		context.fillText("YES", 910, 550);

		context.fillStyle = "white";

		if (nBlueText)
			context.fillStyle = "#D49A3D";
		else context.fillStyle = "white";
		context.font = "bold 25px Arial";
		context.fillText("NO", 1010, 550);
}

drawCrosshairs = function(context) {
	var pistolCrosshairs = new Image();
	pistolCrosshairs.src = 'images/pistol-crosshair.png';
	var x = window.innerWidth / 2 - pistolCrosshairs.width / 2;
	var y = window.innerHeight / 2 - pistolCrosshairs.height / 2;
	context.drawImage(pistolCrosshairs, x, y)
}

drawInventory = function(context) {
	context.fillStyle = "#D49A3D"
	context.font = "bold 50px Arial";
	context.fillText("Ammo: ", 1500, 980);
	
	if (p.active) {
		
		context.fillStyle = "#3C858F";
		context.font = "bold 50px Arial";
		context.fillText(p.getBulletCount() + " / ???", 1690, 980);

	} else if (s.active) {
	
		context.fillStyle = "#3C858F";
		context.font = "bold 50px Arial";
		context.fillText(s.getBulletCount() + " / " + s.getExtraBullets(), 1690, 980);
	} else {
		
		context.fillStyle = "#3C858F";
		context.font = "bold 50px Arial";
		context.fillText(u.getBulletCount() + " / " + u.getExtraBullets(), 1690, 980);
	}
}