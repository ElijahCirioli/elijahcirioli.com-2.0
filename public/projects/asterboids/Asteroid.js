const boundPoint = () => {
	//return a point on the edge of the screenBounds
	const disp = Math.random() * (screenBounds.x - 200) + 100; //random from [100, 1300]
	const side = Math.round(Math.random()) * (screenBounds.x + 200) - 100; //random either -100 or 1500
	if (Math.random() > 0.5) {
		return new Vec(side, disp);
	} else {
		return new Vec(disp, side);
	}
};

class Asteroid {
	constructor(random, x, y, ang, size, id) {
		let angle;
		const speed = Math.random() * 1.5 + 0.5;
		this.pos = new Vec(0, 0);

		if (random) {
			//generate path by drawing a line between two points on the outside of the playfield
			const initial = boundPoint();
			let final = boundPoint();
			while (final.x === initial.x || final.y === initial.y) {
				//if both points are on the same side
				final = boundPoint();
			}
			angle = Math.atan2(final.y - initial.y, final.x - initial.x);
			this.pos = initial;
			this.size = Math.round(Math.random()) + 2;
			if (this.size === 3) {
				this.id = [Math.floor(Math.random() * 4)];
			} else {
				this.id = [Math.floor(Math.random() * 4), Math.round(Math.random())];
			}
		} else {
			angle = ang;
			this.pos.x = x;
			this.pos.y = y;
			this.size = size;
			this.id = id.slice();
		}

		this.vel = new Vec(speed * Math.cos(angle), speed * Math.sin(angle));
		this.dir = Math.random() * 2 * Math.PI;
		this.velDir = (Math.random() - 0.5) / 16;
		this.radScale = 20;
	}

	move() {
		const delta = (deltaTime * 60) / 1000;
		let newPos;
		if (frozen) {
			//move slow
			newPos = new Vec(this.pos.x + this.vel.x * 0.1 * delta, this.pos.y + this.vel.y * 0.1 * delta);
		} else {
			newPos = new Vec(this.pos.x + this.vel.x * delta, this.pos.y + this.vel.y * delta);
		}
		//bounce off wals
		if (
			this.pos.x - this.size * this.radScale < 0 ||
			this.pos.x + this.size * this.radScale > screenBounds.x ||
			(newPos.x + this.size * this.radScale < screenBounds.x && newPos.x - this.size * this.radScale > 0)
		) {
			this.pos.x = newPos.x;
		} else {
			this.vel.x *= -1;
		}
		if (
			this.pos.y - this.size * this.radScale < 0 ||
			this.pos.y + this.size * this.radScale > screenBounds.y ||
			(newPos.y + this.size * this.radScale < screenBounds.y && newPos.y - this.size * this.radScale > 0)
		) {
			this.pos.y = newPos.y;
		} else {
			this.vel.y *= -1;
		}

		//rotate
		if (frozen) {
			this.dir += this.velDir * 0.1 * delta;
		} else {
			this.dir += this.velDir * delta;
		}
	}

	draw = (offset) => {
		mContext.save();
		mContext.translate(this.pos.x - offset.x, this.pos.y - offset.y);
		mContext.rotate(this.dir);
		if (this.size === 3) {
			mContext.drawImage(asteroidImages[this.id[0]][2], -65, -65);
		} else if (this.size === 2) {
			mContext.drawImage(asteroidImages[this.id[0]][this.id[1]][2], -45, -45);
		} else {
			mContext.drawImage(asteroidImages[this.id[0]][this.id[1]][this.id[2]], -25, -25);
		}
		mContext.restore();
	};

	mitosis = () => {
		//split and break are already functions
		if (this.size > 1) {
			//split in two
			const angle = Math.atan2(this.vel.y, this.vel.x);
			const dtheta1 = Math.random() * Math.PI * 0.25;
			const dtheta2 = Math.random() * Math.PI * -0.25;
			let newId1 = this.id.slice();
			newId1.push(0);
			let newId2 = this.id.slice();
			newId2.push(1);

			asteroids.push(new Asteroid(false, this.pos.x, this.pos.y, angle + dtheta1, this.size - 1, newId1));
			asteroids.push(new Asteroid(false, this.pos.x, this.pos.y, angle + dtheta2, this.size - 1, newId2));
		}
		asteroidsKilled++;
		asteroids.splice(asteroids.indexOf(this), 1);
	};
}
