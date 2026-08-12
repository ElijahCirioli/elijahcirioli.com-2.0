const NEIGHBORHOOD_RADIUS = 100;
const SQUARE_RADIUS = NEIGHBORHOOD_RADIUS * NEIGHBORHOOD_RADIUS;
const SEPARATION_WEIGHT = 1.05;
const ALIGNMENT_WEIGHT = 0.9;
const COHESION_WEIGHT = 1;
const AVOIDANCE_WEIGHT = 1.03;
const SUPER_SEPARATION_WEIGHT = 4;
const SUPER_SQUARE_RADIUS = 250;
let TARGETING_WEIGHT = 0.2;
const INERTIA = 0.8;
const VARIATION = 0.1;
const VIEW_ANGLE = (5 * Math.PI) / 3;
let SPEED = 5;

class Boid {
	constructor(x, y, direction) {
		this.pos = new Vec(x, y);
		this.dir = direction;
		this.neighborhood = [];
		this.speedVariation = (Math.random() - 0.5) * VARIATION;
		this.hBoxRad = 7;
		this.vel = new Vec(Math.cos(this.dir), Math.sin(this.dir));
		this.vel.normalize(SPEED + this.speedVariation);

		this.sepWeight = (Math.random() - 0.5) * VARIATION;
		this.aliWeight = (Math.random() - 0.5) * VARIATION;
		this.cohWeight = (Math.random() - 0.5) * VARIATION;
		this.avoWeight = (Math.random() - 0.5) * VARIATION;
		this.supWeight = (Math.random() - 0.5) * VARIATION;
		this.tarWeight = (Math.random() - 0.5) * VARIATION;
		this.numExhaust = 3 + Math.floor(Math.random() * 2);
		this.exhaust = [];

		this.type = 0;
		const type = Math.random();
		if (type < 0.07) {
			this.type = 1;
		} else if (type < 0.14) {
			this.type = 2;
		}
	}

	update = () => {
		this.getNeighborhood();
		this.move();
		if (
			detectCollision(this) ||
			this.pos.x > screenBounds.x ||
			this.pos.x < 0 ||
			this.pos.y > screenBounds.y ||
			this.pos.y < 0
		) {
			this.death();
			text.push({ amt: 10 * d.multiplier, dur: 80, pos: new Vec(this.pos.x, this.pos.y + 7) });
			score += 10 * d.multiplier;
		}
	};

	getNeighborhood = () => {
		//gather all boids nearby into neighborhood
		this.neighborhood = [];
		boids.forEach((b) => {
			if (this !== b) {
				if (getSquareDistance(this.pos, b.pos) < SQUARE_RADIUS) {
					let angle = Math.atan2(this.pos.y - b.pos.y, this.pos.x - b.pos.x);
					if (angle < 0) {
						angle += Math.PI * 2;
					}
					const relativeAngle = Math.abs(this.dir - angle);
					if (relativeAngle > Math.PI - VIEW_ANGLE / 2) {
						//make sure boid isn't directly behind
						this.neighborhood.push(b);
					}
				}
			}
		});
	};

	separation = () => {
		//steer away from nearby boids
		const totalVec = new Vec(0, 0);
		this.neighborhood.forEach((b) => {
			const squareDist = getSquareDistance(this.pos, b.pos);
			if (squareDist !== 0) {
				totalVec.x += ((this.pos.x - b.pos.x) * SQUARE_RADIUS) / squareDist;
				totalVec.y += ((this.pos.y - b.pos.y) * SQUARE_RADIUS) / squareDist;
			}
		});
		totalVec.normalize(SEPARATION_WEIGHT + this.sepWeight);
		return totalVec;
	};

	alignment = () => {
		//match direction of nearby boids
		const totalVec = new Vec(0, 0);
		this.neighborhood.forEach((b) => {
			totalVec.x += b.vel.x;
			totalVec.y += b.vel.y;
		});
		totalVec.normalize(ALIGNMENT_WEIGHT + this.aliWeight);
		return totalVec;
	};

	cohesion = () => {
		//fly towards center of nearby cluster
		let vec = new Vec(0, 0);
		const center = new Vec(0, 0);

		if (this.neighborhood.length > 0) {
			this.neighborhood.forEach((b) => {
				center.x += b.pos.x;
				center.y += b.pos.y;
			});
			center.x /= this.neighborhood.length;
			center.y /= this.neighborhood.length;

			vec = new Vec(center.x - this.pos.x, center.y - this.pos.y);
		}
		vec.normalize(COHESION_WEIGHT + this.cohWeight);
		return vec;
	};

	avoidance = () => {
		//avoid walls and asteroids
		const wallVec = new Vec(0, 0);
		if (this.pos.x - NEIGHBORHOOD_RADIUS < 0 || this.pos.x + NEIGHBORHOOD_RADIUS > screenBounds.x) {
			wallVec.x = -Math.sign(this.pos.x - NEIGHBORHOOD_RADIUS);
		}
		if (this.pos.y - NEIGHBORHOOD_RADIUS < 0 || this.pos.y + NEIGHBORHOOD_RADIUS > screenBounds.y) {
			wallVec.y = -Math.sign(this.pos.y - NEIGHBORHOOD_RADIUS);
		}
		wallVec.normalize(1);

		const astVec = new Vec(0, 0);
		asteroids.forEach((a) => {
			const squareDist = Math.pow(getDistance(this.pos, a.pos) - a.size * a.radScale, 2);
			if (squareDist < SQUARE_RADIUS && squareDist !== 0) {
				astVec.x += ((this.pos.x - a.pos.x) * SQUARE_RADIUS) / squareDist;
				astVec.y += ((this.pos.y - a.pos.y) * SQUARE_RADIUS) / squareDist;
			}
		});
		astVec.normalize(1);

		const totalVec = new Vec(wallVec.x + astVec.x, wallVec.y + astVec.y);
		totalVec.normalize(AVOIDANCE_WEIGHT + this.avoWeight);
		return totalVec;
	};

	superSeparation = () => {
		//really try not to hit super close boids
		const totalVec = new Vec(0, 0);
		this.neighborhood.forEach((b) => {
			const squareDist = getSquareDistance(this.pos, b.pos);
			if (squareDist !== 0 && squareDist < SUPER_SQUARE_RADIUS) {
				totalVec.x += ((this.pos.x - b.pos.x) * SUPER_SQUARE_RADIUS) / squareDist;
				totalVec.y += ((this.pos.y - b.pos.y) * SUPER_SQUARE_RADIUS) / squareDist;
			}
		});
		if (d.wave % 10 === 0) {
			boids.forEach((b) => {
				if (b instanceof Boss && getSquareDistance(this.pos, b.pos) < 40000) {
					totalVec.x += this.pos.x - b.pos.x;
					totalVec.y += this.pos.y - b.pos.y;
				}
			});
		}
		totalVec.normalize(SUPER_SEPARATION_WEIGHT + this.supWeight);
		return totalVec;
	};

	targeting = () => {
		//target player
		const vec = new Vec(p.pos.x - this.pos.x, p.pos.y - this.pos.y);
		vec.normalize(TARGETING_WEIGHT + this.tarWeight);
		return vec;
	};

	move = () => {
		const delta = (deltaTime * 60) / 1000;

		//calculate all rules
		const sepVec = this.separation();
		const aliVec = this.alignment();
		const cohVec = this.cohesion();
		const avoVec = this.avoidance();
		const supVec = this.superSeparation();
		const tarVec = this.targeting();

		this.vel.x += INERTIA * (sepVec.x + aliVec.x + cohVec.x + avoVec.x + supVec.x + tarVec.x) * delta;
		this.vel.y += INERTIA * (sepVec.y + aliVec.y + cohVec.y + avoVec.y + supVec.y + tarVec.y) * delta;

		if (frozen) {
			//move slow
			this.vel.normalize(0.1 * (SPEED + this.speedVariation));
		} else {
			this.vel.normalize(SPEED + this.speedVariation);
		}

		this.pos.x += this.vel.x * delta;
		this.pos.y += this.vel.y * delta;

		this.dir = Math.atan2(this.vel.y, this.vel.x);
		if (this.dir < 0) {
			this.dir += 2 * Math.PI;
		}

		for (let i = 0; i < this.numExhaust; i++) {
			this.exhaust.push(new BoidParticle());
		}
	};

	draw = (offset) => {
		mContext.save();
		mContext.translate(this.pos.x - offset.x, this.pos.y - offset.y);
		mContext.rotate(this.dir);
		if (this.type === 0) {
			mContext.drawImage(boImg, -14, -14);
		} else if (this.type === 1) {
			mContext.drawImage(bosImg, -14, -14);
		} else if (this.type === 2) {
			mContext.drawImage(bobImg, -14, -14);
		}
		mContext.restore();

		for (let i = 0; i < this.exhaust.length; i++) {
			if (this.exhaust[i].draw(offset, this)) {
				this.exhaust.splice(i, 1);
				i--;
			}
		}
	};

	death = () => {
		explosion(this.pos, 20);
		boids.splice(boids.indexOf(this), 1);
		boidsKilled++;
	};

	explode = () => {
		//bomb boid blows up nearby boids
		shaking = 40;
		this.death();
		explosion(this.pos, 80);
		for (const b of boids) {
			if (getSquareDistance(this.pos, b.pos) < 4900) {
				if (b.type === 2) {
					b.explode();
				} else {
					b.death();
				}
				text.push({ amt: 40 * d.multiplier, dur: 80, pos: new Vec(b.pos.x, b.pos.y + 7) });
				score += 40 * d.multiplier;
			}
		}
		for (const a of asteroids) {
			const sqrDist = getSquareDistance(this.pos, a.pos);
			const sqrRad = (a.size * a.radScale + 70) * (a.size * a.radScale + 70);
			if (sqrDist < sqrRad) {
				a.mitosis();
				explosion(a.pos, a.size * a.radScale);
			}
		}
	};

	split = () => {
		//splitter boid turns into three boids
		this.death();
		boids.push(new Boid(this.pos.x + 16, this.pos.y + 16, Math.random() * 7));
		boids.push(new Boid(this.pos.x + 16, this.pos.y - 16, Math.random() * 7));
		boids.push(new Boid(this.pos.x - 16, this.pos.y, Math.random() * 7));
	};
}
