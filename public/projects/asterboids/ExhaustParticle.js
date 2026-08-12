class ExhaustParticle {
	constructor() {
		this.offset = 12;
		this.angleVariance = (Math.random() - 0.5) / 2.5;
		this.speed = Math.random() * 4;
		this.life = 10;
		this.size = Math.random() * 2;
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

	draw = (offset) => {
		let dtheta;
		if (this.positive) {
			dtheta = p.dir + Math.PI / 3.3;
		} else {
			dtheta = p.dir - Math.PI / 3.3;
		}
		pContext.fillStyle =
			"rgba(" + this.color[0] + ", " + this.color[1] + ", " + this.color[2] + ", " + this.life / 4 + ")";
		pContext.beginPath();
		pContext.arc(
			p.pos.x - offset.x - this.offset * Math.cos(p.dir + this.angleVariance) - 8 * Math.cos(dtheta),
			p.pos.y - offset.y - this.offset * Math.sin(p.dir + this.angleVariance) - 8 * Math.sin(dtheta),
			this.size,
			0,
			2 * Math.PI
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
