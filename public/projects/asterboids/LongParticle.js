class LongParticle {
	constructor() {
		this.t = 0;
		this.hue = Math.floor(Math.random() * 50);
		this.sign = Math.round(Math.random()) * 2 - 1; //+1 or -1
		this.yVar = Math.random() * 4 - 2;
		this.xScale = Math.random() * 12;
	}

	draw = (offset) => {
		const delta = (deltaTime * 60) / 1000;
		this.t += 1.4 * delta;
		pContext.strokeStyle = `rgba(${173 - this.hue}, ${255 - this.hue / 6}, 255, ${1 - this.t / 24})`;
		pContext.beginPath();
		pContext.moveTo(this.sign * this.xScale, 3 + this.yVar + 8 * this.t);
		pContext.lineTo(this.sign * this.xScale, 3 + this.yVar + 4 * this.t);
		pContext.stroke();
		return this.t > 24;
	};
}
