class Bullet {
	constructor(x, y, velX, velY) {
		this.pos = new Vec(x, y);
		this.vel = new Vec(velX, velY);
		this.life = 80;
		this.hBoxRad = 3;
	}

	move = () => {
		const delta = (deltaTime * 60) / 1000;
		this.pos.x += this.vel.x * delta;
		this.pos.y += this.vel.y * delta;
		this.life = Math.max(0, this.life - delta);
	};
}
