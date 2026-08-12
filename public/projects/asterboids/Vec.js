class Vec {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	equals = v => {
		return this.x === v.x && this.y === v.y;
	};

	normalize = len => {
		const magnitude = getDistance(new Vec(0, 0), this);
		if (magnitude > 0) {
			this.x = (this.x * len) / magnitude;
			this.y = (this.y * len) / magnitude;
		}
	};
}
