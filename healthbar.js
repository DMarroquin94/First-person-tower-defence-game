HealthBar = function() {
	this.texture = THREE.ImageUtils.loadTexture('images/healthbar.png');
	
	

	this.getSprite =  function() {
		var material = new THREE.SpriteMaterial({
		map: this.texture,
		useScreenCoordinates: false
		});

		var sprite = new THREE.Sprite(material); 
		return sprite.clone();
	}

}