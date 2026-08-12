const explosion = (v, rad) => {
	let ep = [];
	for (let i = 0; i < 20 + rad; i++) {
		ep.push(new ExplosionParticle(v.x, v.y, rad * 2));
	}
	ep.sort(function (a, b) {
		return a.energy - b.energy;
	});
	for (let j = 0; j < ep.length; j++) {
		explosionParticles.push(ep[j]);
	}
	const sound = explosionSounds[Math.floor(Math.random() * explosionSounds.length)];
	let vol = rad / 60;
	if (vol > 1) {
		vol = 1;
	}
	if (animationTick > 0) {
		vol *= 0.05;
	} else if (Math.abs(c.pos.x - v.x) > 420 || Math.abs(c.pos.y - v.y) > 320) {
		vol *= 0.5;
	}
	if (vol > 0) {
		playSound(sound, vol, false);
	}
};

class ExplosionParticle {
	constructor(x, y, radius) {
		this.pos = new Vec(0, 0);
		this.pos.x = x + (radius * Math.random() - radius / 2) / 5;
		this.pos.y = y + (radius * Math.random() - radius / 2) / 5;

		this.energy = Math.random() * 4 + 1;
		this.life = Math.round(120 / this.energy);
		this.angle = Math.random() * 2 * Math.PI;

		this.vel = new Vec(0, 0);
		this.vel.x = (this.energy * Math.cos(this.angle)) / 5;
		this.vel.y = (this.energy * Math.sin(this.angle)) / 5;

		this.size = Math.round((Math.random() * radius) / 6 + 1);
		if (this.energy > 4.75) {
			this.color = [255, 227, 194];
			this.vel.x /= 3;
			this.vel.y /= 3;
		} else if (this.energy > 4) {
			this.color = [242, 188, 102];
		} else if (this.energy > 2.5) {
			this.color = [245, 107, 61];
		} else if (this.energy > 1.3) {
			this.color = [194, 64, 45];
		} else {
			this.color = [135, 129, 126];
		}
	}

	draw = (offset) => {
		pContext.fillStyle =
			"rgba(" + this.color[0] + ", " + this.color[1] + ", " + this.color[2] + ", " + this.life / 40 + ")";
		pContext.beginPath();
		pContext.arc(this.pos.x - offset.x, this.pos.y - offset.y, this.size, 0, 2 * Math.PI);
		pContext.fill();

		const delta = (deltaTime * 60) / 1000;
		this.life -= delta;
		if (this.life <= 0) {
			return true;
		}
		this.pos.x += this.vel.x * delta;
		this.pos.y += this.vel.y * delta;
		return false;
	};
}
