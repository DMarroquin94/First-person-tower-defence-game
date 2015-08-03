var uziShoot = false
var reload_timer = 0;
var isreloadingPistol = false;
var isreloadingUzi = false;
var isreloadingShotgun = false;

function mousePressed(event) {
	
	

	if (!gameStarted) {
		tittleOption(event)
	}

	else if (isgameOver) {
		console.log("yooo")
	}
	ismouseDown = true;


	


	if (p.active) {
		if (p.getBulletCount() > 0)
			p.pewpew();
		else {
			isreloadingPistol = true;
		} 
			
	}
	else if (s.active) { 
		if (s.getBulletCount() > 0) {
			s.pewpew();
		} else {
			isreloadingShotgun = true;
		}
	}

	else if (u.active) {
		if (u.getBulletCount() > 0) {
			uziShoot = true;
		} else {
			isreloadingUzi = true;
		}
	}
}

function mouseUp(event) {
	uziShoot = false;
   
}


var tittleOption = function(event) {
	var x = event.clientX;
	var y = event.clientY;

	if (x > 930 && x < 1069 &&
		y > 480 && y < 500)
		showHowToPlayScreen();

	if (x > 959 && x < 1031 &&
		y > 560 && y < 579)
		showAboutScreen();

	if (x > 942 && x < 1051 &&
		y > 680 && y < 732)
		startGameFromTittle();

	if (x > 520 && x < 578 &&
		y > 231 && y < 250)
		goBackToTittleScreen()

	//console.log(x + " - " + y);
};

function reloadPistol() {
	reload_timer +=.01 // clock.getDelta() 1000;
	console.log(reload_timer)
	if (reload_timer > p.reloadTime) {
		p.editBullets(+18)
		reload_timer = 0;
		isreloadingPistol = false;
		showReloadingText = false;
	} else {
		showReloadingText = true;
	}
}

function reloadUzi() {
	reload_timer +=.01 // clock.getDelta() 1000;
	
	if (u.getExtraBullets() > 1) {
		if (reload_timer > u.reloadTime) {
			u.editBullets(+50)
			u.editExtraBullets(-50);
			reload_timer = 0;
			isreloadingUzi = false;
			showReloadingText = false;
		} else {
			showReloadingText = true;
		}
	} else {
		showOutOfAmmoText = true;
	}
}

function reloadShotgun() {
	reload_timer +=.01 // clock.getDelta() 1000;
	console.log(reload_timer)
	if (s.getExtraBullets() > 1) {
		if (reload_timer > s.reloadTime) {
			s.editBullets(+8)
			s.editExtraBullets(-8);
			reload_timer = 0;
			isreloadingShotgun = false;
			showReloadingText = false;
		} else {
			showReloadingText = true;
		}
	} else {
		showOutOfAmmoText = true;
	}
}