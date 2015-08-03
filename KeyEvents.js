var checkKeyboard = function() {
	keyboard.update();
	var a_active = false;
	var i_active = false;
	var c_active = false;

	if (keyboard.down("down") || keyboard.down("S")) {
		if (screens.showTitleScreen && !screens.showAboutScreen && !screens.showHowToScreen) {
			if (screens.playActive) {
				screens.playActive = false;
				screens.aboutActive = false;
				screens.howActive = true;
			} else if (screens.howActive) {
				screens.playActive = false;
				screens.aboutActive = true;
				screens.howActive = false;
			} else {
				screens.playActive = true;
				screens.aboutActive = false;
				screens.howActive = false;
			}

			screens.showTitle();
		} else if (buying) {
			if (pYellowText) {
					pYellowText = false;
					sYellowText = false;
					uYellowText = true;
					aYellowText = false;
					iYellowText = false;
					cYellowText = false;
					eYellowText = false;
				} else if (sYellowText) {
					sYellowText = false;
					pYellowText = false;
					uYellowText = false;
					aYellowText = true;
					iYellowText = false;
					cYellowText = false;
					eYellowText = false;
				} else if (uYellowText) {
					sYellowText = true;
					pYellowText = false;
					uYellowText = false;
					aYellowText = false;
					iYellowText = false;
					cYellowText = false;
					eYellowText = false;
				} else if (aYellowText) {
					sYellowText = false;
					pYellowText = false;
					uYellowText = false;
					aYellowText = false;
					iYellowText = true;
					cYellowText = false;
					eYellowText = false;
				} else if (iYellowText) {
					sYellowText = false;
					pYellowText = false;
					uYellowText = false;
					aYellowText = false;
					iYellowText = false;
					cYellowText = true;
					eYellowText = false;
				} else if (cYellowText) {
					sYellowText = false;
					pYellowText = false;
					uYellowText = false;
					aYellowText = false;
					iYellowText = false;
					cYellowText = false;
					eYellowText = true;
				} else if (eYellowText) {
					sYellowText = false;
					pYellowText = true;
					uYellowText = false;
					aYellowText = false;
					iYellowText = false;
					cYellowText = false;
					eYellowText = false;
				}
		}
	}

		if (keyboard.down("up") || keyboard.down("W")) {

			if (screens.showTitleScreen && !screens.showAboutScreen && !screens.showHowToScreen) {
				if (screens.playActive) {
					screens.playActive = false;
					screens.aboutActive = true;
					screens.howActive = false;
				} else if (screens.aboutActive) {
					screens.playActive = false;
					screens.aboutActive = false;
					screens.howActive = true;
				} else {
					screens.playActive = true;
					screens.aboutActive = false;
					screens.howActive = false;
				}

				
				screens.showTitle();
			} else if (buying) {
				if (pYellowText) {
					pYellowText = false;
					sYellowText = false;
					uYellowText = false;
					aYellowText = false;
					iYellowText = false;
					cYellowText = false;
					eYellowText = true;
				} else if (sYellowText) {
					sYellowText = false;
					pYellowText = false;
					uYellowText = true;
					aYellowText = false;
					iYellowText = false;
					cYellowText = false;
					eYellowText = false;
				} else if (uYellowText) {
					sYellowText = false;
					pYellowText = true;
					uYellowText = false;
					aYellowText = false;
					iYellowText = false;
					cYellowText = false;
					eYellowText = false;
				} else if (aYellowText) {
					sYellowText = true;
					pYellowText = false;
					uYellowText = false;
					aYellowText = false;
					iYellowText = false;
					cYellowText = false;
					eYellowText = false;
				} else if (iYellowText) {
					sYellowText = false;
					pYellowText = false;
					uYellowText = false;
					aYellowText = true;
					iYellowText = false;
					cYellowText = false;
					eYellowText = false;
				} else if (cYellowText) {
					sYellowText = false;
					pYellowText = false;
					uYellowText = false;
					aYellowText = false;
					iYellowText = true;
					cYellowText = false;
					eYellowText = false;
				} else if (eYellowText) {
					sYellowText = false;
					pYellowText = false;
					uYellowText = false;
					aYellowText = false;
					iYellowText = false;
					cYellowText = true;
					eYellowText = false;
				}
				
			}
		}

		if (keyboard.down("enter")) {
			//if (screens.showTitleScreen) {
				if (screens.playActive) {
					startGameFromTittle(); 
				}
			//}
			if (isgameOver) {
				if (yBlueText) {
					var canvas = document.getElementById("my2Dcanvas")
					
					context = canvas.getContext('2d');
					context.clearRect(0, 0, canvas.width, canvas.height)
					scene.remove(house.healthBar)
					isgameOver = false;
					var HP = new HealthBar();
					house.hp = house.maxHP;
					house.HealthBar = HP.getSprite();
					house.dead = false
					gameStarted = false;
					yawObject.position.set(0, 0, 0)
					yawObject.rotation.y = 0;
					pitchObject.rotation.x = 0
					newGame();
					

					house.healthBar.position.set(10, 65, 0)
					house.healthBar.scale.set(100, 10, 1);
					
					timer = 0;
					player.gold = 500;
					scene.add(house.healthBar)
					wave = 0;
						//collidableBuildingMeshList.push(house.house)

					currentWave = new Wave();
					currentWave.setWave(wave);
					screens.preWavetime = 30
					screens.showTitleScreen = false;
					gameStarted = true;
				} else if (nBlueText) {
					scene.remove(house.healthBar)
					isgameOver = false;
					var HP = new HealthBar();
					house.hp = house.maxHP;
					house.HealthBar = HP.getSprite();
					house.dead = false
					gameStarted = false;
					yawObject.position.set(0, 0, 0)
						yawObject.rotation.y = 0;
					pitchObject.rotation.x = 0
					newGame();
					

					house.healthBar.position.set(10, 65, 0)
					house.healthBar.scale.set(100, 10, 1);
					
					timer = 0;
					player.gold = 500;
					scene.add(house.healthBar)
						wave = 0;
						//collidableBuildingMeshList.push(house.house)

						currentWave = new Wave();
						currentWave.setWave(wave);

					screens.showTitleScreen = true;

				}	
			}
			else if (buying) {
				if (pYellowText) {
					p.active = true;
					s.active = false;
					u.active = false;
					isreloadingShotgun = false;
					isreloadingPistol = false;
					isreloadingUzi = false;
					showOutOfAmmoText = false;
					p.purchase();
				} else if (uYellowText) {
					if (player.checkPlayerGold(250)) {
						player.purchase(250);
						u.editExtraBullets(+200)
						s.active = false;
						p.active = false;
						u.active = true;
						isreloadingShotgun = false;
						isreloadingPistol = false;
						isreloadingUzi = false;
						showOutOfAmmoText = false;
						p.purchase();
					} else {
						
					}
				} else if (sYellowText) {
					if (player.checkPlayerGold(350)) {
						player.purchase(350);
						s.editExtraBullets(+32)
						s.active = true;
						p.active = false;
						u.active = false;
						isreloadingShotgun = false;
						isreloadingPistol = false;
						isreloadingUzi = false;
						showOutOfAmmoText = false;
						p.purchase();
					} else {
						
					}
				} else if (aYellowText) {
					if (player.checkPlayerGold(500)) {
						player.purchase(500);
						player.editArcherTowerCount(+1)
					} else {
						
					}
				} else if (iYellowText) {
					if (player.checkPlayerGold(750)) {
						player.purchase(750);
						player.editFrostTowerCount(+1)
					} else {
			
					}
				} else if (cYellowText) {
					if (player.checkPlayerGold(1000)) {
						player.purchase(1000);
						player.editCannonTowerCount(+1)
					} else {
					
					}
				} else
				
					buying = false;
				}
			else if (screens.aboutActive) {
				showAboutScreen();
			}

			else if (screens.howActive) {
				showHowToPlayScreen();
			}

			else {
				goBackToTittleScreen();
			}
		}
		
	if (keyboard.down("right") || keyboard.down("D")) {
		if (isgameOver) {
			if (yBlueText) {
				yBlueText = false;
				nBlueText = true;
			} else if (nBlueText) {
				yBlueText = true;
				nBlueText = false;
			}	
		}
	}

	if (keyboard.down("left") || keyboard.down("A")) {
		if (isgameOver) {
			if (yBlueText) {
				yBlueText = false;
				nBlueText = true;
			} else if (nBlueText) {
				yBlueText = true;
				nBlueText = false;
			} 	
		}
	}

	if (keyboard.up("R"))
		running =false;
	if (keyboard.down("R"))
		running = true;

	if (keyboard.pressed("F")) {
		camera.position.set(cube.position.x, cube.position.y, cube.position.z);

		camera.VIEW_ANGLE = 45;   
	}


	if (keyboard.down("H")) {
		grenade.spawn(getPlayerPosition());
	}

	if (keyboard.down("1")) {
		if (player.getArcherTowerCount() > 0) {
			player.editArcherTowerCount(-1);
			tower.spawn(getPlayerPosition());
		}
	}

	if (keyboard.down("2")) {
		if (player.getFrostTowerCount() > 0) {
			player.editFrostTowerCount(-1);
			iceTower.spawn(getPlayerPosition());	
		}
	}

	if (keyboard.down("3")) {
		if (player.getCannonTowerCount() > 0) {
			player.editCannonTowerCount(-1);
			cannonTower.spawn(getPlayerPosition());	
		}
	}

	if (keyboard.down("C")) {
		crawler.spawn()
	}

	if (keyboard.down("V")) {
		tank.spawn();
	}

	if (keyboard.down("N")) {
		screecher.spawn();
	}

	if (keyboard.down("B")) {
		if (yawObject.position.x > -25 && yawObject.position.x < 30 &&
			yawObject.position.y > 9 && yawObject.position.y < 50 &&
			yawObject.position.z < 75 && yawObject.position.z > 45)
			if (buying)
				buying = false;
			else buying = true;


	}

	if (keyboard.down("M")) {
	
		menu = true;
	}

	if (keyboard.up("M")) {
	
		menu = false;
	}

	if (keyboard.pressed("G")) {
		camera.position.set(0, 100, 400);
		camera.VIEW_ANGLE = 45;
	}
};

var startGameFromTittle = function() {
	var canvas = document.getElementById("my2Dcanvas")
		
	context = canvas.getContext('2d');
	context.clearRect(0, 0, canvas.width, canvas.height)
	screens.preWavetime = 30
	screens.showTitleScreen = false;
	gameStarted = true;

	//canvas2D.addEventListener('click', function(event) {
		var element = document.body;
		element.requestPointerLock = element.requestPointerLock ||
									element.mozPointerLockElement ||
									element.webkitRequestPointerLock;

		// mrdoob example for firefoxif (/Firefox.i.test(navigator.userAgent)) 
		element.requestPointerLock();
	//}, false);	

	//yawObject.translateX = 0;
	//yawObject.translateY = 0;
	//yawObject.translateZ = 0;
//	yawObject.velocity.x = 0;
	//yawObject.velocity.y = 0;
	//yawObject.velocity.z = 0;			
}

var showAboutScreen = function() {
	screens.showAbout();
	screens.showAboutScreen = true;
	screens.aboutActive = false;
}

var showHowToPlayScreen = function() {
	screens.showHow();
	screens.showHowToScreen = true;
	screens.howActive = false;
}

var goBackToTittleScreen = function() {
	screens.playActive = true;
	screens.showHowToScreen = false;
	screens.showAboutScreen = false;
	screens.showTitle();
}

var notenoughGold = function() {
	context.font = "bold 25px Arial";	
	context.fillStyle = "RED";
	context.fillText("Not enough Gold", 510, 590)
}