Path = function() {
	this.PATHS =  {
		RED: {
			material: new THREE.LineBasicMaterial({
				color: 0xF20707
			}),
			WALLS: {
				spline1: new THREE.SplineCurve3([
					new THREE.Vector3(-500, 2, -750),
					new THREE.Vector3(-500, 2, -230),
					new THREE.Vector3(200, 2, -230),
					new THREE.Vector3(280, 2, -450),
					new THREE.Vector3(350, 2, -400),
					new THREE.Vector3(350, 2, -150),
					new THREE.Vector3(100, 2, -90),
					new THREE.Vector3(40, 2, -40),
					new THREE.Vector3(0, 2, -20)
				]),
				spline2: new THREE.SplineCurve3([
					new THREE.Vector3(-300, 2, -750),
					new THREE.Vector3(-330, 2, -410),
					new THREE.Vector3(-130, 2, -330),
					new THREE.Vector3(100, 2, -360),
					new THREE.Vector3(170, 2, -540),
					new THREE.Vector3(330, 2, -580),
					new THREE.Vector3(440, 2, -500),
					new THREE.Vector3(500, 2, -120),
					new THREE.Vector3(170, 2, -0),
					new THREE.Vector3(100, 2, 60)
				])
			}		
		},
		BLUE: {
			material: new THREE.LineBasicMaterial({
				color: 0x0707F2
			}),
			WALLS: {
				spline1: new THREE.SplineCurve3([
					new THREE.Vector3(650, 2, 750),
					new THREE.Vector3(550, 2, 250),
					new THREE.Vector3(300, 2, 220),
					new THREE.Vector3(250, 2, 520),
					new THREE.Vector3(200, 2, 550),
					new THREE.Vector3(180, 2, 320),
					new THREE.Vector3(0, 2, 320),
					new THREE.Vector3(-80, 2, 250),
					new THREE.Vector3(80, 2, 200),
					new THREE.Vector3(100, 2, 60)
				]),
				spline2: new THREE.SplineCurve3([
					new THREE.Vector3(470, 2, 750),
					new THREE.Vector3(450, 2, 450),
					new THREE.Vector3(370, 2, 400),
					new THREE.Vector3(370, 2, 650),
					new THREE.Vector3(210, 2, 710),
					new THREE.Vector3(100, 2, 650),
					new THREE.Vector3(80, 2, 500),
					new THREE.Vector3(0, 2, 470),
					new THREE.Vector3(-170, 2, 380),
					new THREE.Vector3(-170, 2, 200),
					new THREE.Vector3(-40, 2, 120)
				])
			}		
		},
		GREEN: {
			material: new THREE.LineBasicMaterial({
				color: 0x07F226
			}),
			WALLS: {
				spline1: new THREE.SplineCurve3([
					new THREE.Vector3(-750, 2, 150),
					new THREE.Vector3(-550, 2, 175),
					new THREE.Vector3(-540, 2, 420),
					new THREE.Vector3(-460, 2, 480),
					new THREE.Vector3(-460, 2, 0),
					new THREE.Vector3(-360, 2, -100),
					new THREE.Vector3(0, 2, 0)
				]),
				spline2: new THREE.SplineCurve3([
					new THREE.Vector3(-750, 2, 320),
					new THREE.Vector3(-700, 2, 320),
					new THREE.Vector3(-700, 2, 620),
					new THREE.Vector3(-500, 2, 680),
					new THREE.Vector3(-360, 2, 540),
					new THREE.Vector3(-310, 2, 100),
					new THREE.Vector3(-40, 2, 120)
				])	
			}
			
		}
	};

	this.draw = function() {
		var numPoints = 50;
	
		for (var path in this.PATHS) {	
			var material = this.PATHS[path].material;
					
			for (var spline in this.PATHS[path].WALLS) {
				var geometry = new THREE.Geometry();
				var splinePoints =  this.PATHS[path].WALLS[spline].getPoints(numPoints);

				for (var i = 0; i < splinePoints.length; i++) {
					geometry.vertices.push(splinePoints[i]);
				}

				var wall = new THREE.Line(geometry, material);
				scene.add(wall);
			}
		}
	}

	this.getRandomPath = function() {
		var numPoints, path;
	 	var ranPath = getRandomNumber(0, 3);
 		
 		if (ranPath == 0) {
	 		numPoints = 500;
	 		path = new THREE.SplineCurve3([
				new THREE.Vector3(getRandomNumber(-490, -310), 2, -750),
				new THREE.Vector3(getRandomNumber(-490, -340), 2, getRandomNumber(-400, -220)),
				new THREE.Vector3(getRandomNumber(-120, 190), 2, getRandomNumber(-320, -220)),
				new THREE.Vector3(getRandomNumber(200, 260), 2, getRandomNumber(-350, -440)),
				new THREE.Vector3(getRandomNumber(160, 240), 2, getRandomNumber(-530, -390)),
				new THREE.Vector3(getRandomNumber(320, 370), 2, getRandomNumber(-570, -500)),
				new THREE.Vector3(getRandomNumber(430, 500), 2, getRandomNumber(-200, -120)),
				new THREE.Vector3(getRandomNumber(160, 30), 2, getRandomNumber(0, -30)),
				new THREE.Vector3(0, 2, 0)
		]);
	 	} else if (ranPath == 1) {
	 		numPoints = 450;
	 		path = new THREE.SplineCurve3([
				new THREE.Vector3(getRandomNumber(460, 640), 2, 750),
				new THREE.Vector3(getRandomNumber(440, 540), 2, getRandomNumber(440, 240)),
				new THREE.Vector3(getRandomNumber(360, 340), 2, getRandomNumber(390, 210)),
				new THREE.Vector3(getRandomNumber(360, 240), 2, getRandomNumber(640, 510)),
				new THREE.Vector3(getRandomNumber(200, 190), 2, getRandomNumber(700, 540)),
				new THREE.Vector3(getRandomNumber(60, 150), 2, getRandomNumber(380, 460)),
				new THREE.Vector3(getRandomNumber(-180, -120), 2, getRandomNumber(260, 310)),
				new THREE.Vector3(getRandomNumber(-20, 15), 2, getRandomNumber( 120, 180)),
				new THREE.Vector3(0, 2, 0)
			]);
	 	} else if (ranPath == 2) {
	 		numPoints = 400;
	 		path = new THREE.SplineCurve3([
				new THREE.Vector3(-750, 2, getRandomNumber(160, 290)),
				new THREE.Vector3(getRandomNumber(-630, -600), 2, getRandomNumber(200, 310)),
				new THREE.Vector3(getRandomNumber(-630, -550), 2, getRandomNumber(540, 620)),
				new THREE.Vector3(getRandomNumber(-450, -390), 2, getRandomNumber(490, 580)),
				new THREE.Vector3(getRandomNumber(-440, -320), 2, getRandomNumber(10, 90)),
				new THREE.Vector3(0, 2, 0)
			]);
	 	}

	 	var Path = {
	 		points: numPoints,
	 		path: path
	 	};

	 	return Path;
	}
}