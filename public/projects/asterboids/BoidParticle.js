class BoidParticle {
	constructor() {
		this.offset = 9.5;
		this.angleVariance = (Math.random() - 0.5) / 1.6;
		this.speed = Math.random() * 2.5;
		this.life = 6;
		this.size = Math.random() * 2.3;
		let colorProb = Math.random();
		if (colorProb > 0.85) {
			this.color = [235, 207, 174];
		} else if (colorProb > 0.65) {
			this.color = [242, 179, 107];
		} else {
			this.color = [250, 87, 22];
		}
	}

	draw = (offset, b) => {
		pContext.fillStyle =
			"rgba(" + this.color[0] + ", " + this.color[1] + ", " + this.color[2] + ", " + this.life / 4 + ")";
		pContext.beginPath();
		pContext.arc(
			b.pos.x - offset.x - this.offset * Math.cos(b.dir + this.angleVariance),
			b.pos.y - offset.y - this.offset * Math.sin(b.dir + this.angleVariance),
			this.size,
			0,
			7
		);
		pContext.fill();
		const delta = (deltaTime * 60) / 1000;
		this.life -= delta;
		if (this.life <= delta) {
			return true;
		}
		this.offset += this.speed * delta;
		return false;
	};
}
