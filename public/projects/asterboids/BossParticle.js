class BossParticle {
	constructor() {
		this.offset = 80;
		this.angleVariance = (Math.random() - 0.5) / 2;
		this.speed = Math.random() * 5;
		this.life = 15;
		this.size = Math.random() * 5;
		this.positive = Math.random() >= 0.5;
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
		let dtheta;
		if (this.positive) {
			dtheta = b.dir + Math.PI / 4;
		} else {
			dtheta = b.dir - Math.PI / 4;
		}
		pContext.fillStyle =
			"rgba(" + this.color[0] + ", " + this.color[1] + ", " + this.color[2] + ", " + this.life / 4 + ")";
		pContext.beginPath();
		pContext.arc(
			b.pos.x - offset.x - this.offset * Math.cos(b.dir + this.angleVariance) - 100 * Math.cos(dtheta),
			b.pos.y - offset.y - this.offset * Math.sin(b.dir + this.angleVariance) - 100 * Math.sin(dtheta),
			this.size,
			0,
			7
		);
		pContext.fill();
		const delta = (deltaTime * 60) / 1000;
		this.life = Math.max(0, this.life - delta);
		if (this.life === 0) {
			return true;
		}
		this.offset += this.speed * delta;
		return false;
	};
}
