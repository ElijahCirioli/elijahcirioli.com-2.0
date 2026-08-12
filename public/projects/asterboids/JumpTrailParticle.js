class JumpTrailParticle {
	constructor(pos, vel) {
		this.t = 0;
		this.hue = Math.floor(Math.random() * 70);
		const yVar = Math.random() * 30 - 15;
		const xVar = Math.random() * 30 - 15;
		this.start = new Vec(pos.x + xVar, pos.y + yVar);
		this.end = new Vec(pos.x + xVar - vel.x * 4, pos.y + yVar - vel.y * 4);
	}

	draw = (offset) => {
		const delta = (deltaTime * 60) / 1000;
		this.t += delta;
		pContext.strokeStyle = `rgba(${200 - this.hue}, ${255 - this.hue / 6}, 255, ${0.8 - this.t / 187})`;
		pContext.beginPath();
		pContext.moveTo(this.start.x - offset.x, this.start.y - offset.y);
		pContext.lineTo(this.end.x - offset.x, this.end.y - offset.y);
		pContext.stroke();
		return this.t > 150;
	};
}
