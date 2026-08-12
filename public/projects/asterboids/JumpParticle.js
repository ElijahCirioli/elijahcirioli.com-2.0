class JumpParticle {
	constructor() {
		this.t = 0;
		this.hue = Math.floor(Math.random() * 100);
		this.sign = Math.round(Math.random()) * 2 - 1; //+1 or -1
		this.xVar = Math.random() * 4 - 2;
		this.yVar = Math.random() * 4 - 2;
		this.xScale = Math.random() * 3.6;
	}

	draw = (offset) => {
		const delta = (deltaTime * 60) / 1000;
		this.t += 0.1 * delta;
		pContext.strokeStyle = `rgba(${255 - this.hue}, ${255 - Math.floor(this.hue / 6)}, 255, ${1 - this.t / 8})`;
		pContext.beginPath();
		pContext.moveTo(this.sign * this.t * this.xScale + this.xVar, this.para(this.t) + this.yVar);
		pContext.lineTo(this.sign * (this.t - 0.3) * this.xScale + this.xVar, this.para(this.t - 0.3) + this.yVar);
		pContext.stroke();
		return this.t > 8;
	};

	para = (t) => {
		return t * t - 24;
	};
}
