class Boss {
	constructor(health) {
		this.health = health;
		this.maxHealth = health;
		this.pos = new Vec(600, -400);
		this.dir = Math.PI / 2;
		this.vel = new Vec(0, 2);
		this.velDir = 0;
		this.maxSpeed = 2.5;
		this.maxTurnSpeed = 0.0085;
		this.turnAcceleration = 0.0007;
		this.time = 300;
		this.laserDuration = 0;
		this.laserState = 0;
		this.hBoxRad = 138;
		this.exhaust = [];
		this.entered = false;
		this.angry = false;
	}

	update = () => {
		if (this.health > 0) {
			//if alive
			this.move();
			if (this.laserDuration > 0) {
				this.laser();
			}
			if (this.time > 0) {
				if (this.angry) {
					//second half of fight
					if (Math.floor(this.time) % 1200 === 0 && this.laserDuration === 0) {
						this.laserDuration = 200;
						this.laserState = 0;
					} else if (this.time % 600 === 0) {
						this.spawnBoids(10);
					}
				} else {
					//first half of fight
					if (Math.floor(this.time) % 1800 === 0 && this.laserDuration === 0) {
						this.laserDuration = 300;
						this.laserState = 0;
					} else if (this.time % 900 === 0) {
						this.spawnBoids(6);
					}
				}
			}
		}
		detectCollision(this);
		this.time += (deltaTime * 60) / 1000;
	};

	move = () => {
		const delta = (deltaTime * 60) / 1000;

		//determine which direction to turn
		let angle = Math.atan2(this.pos.y - p.pos.y, this.pos.x - p.pos.x);
		if (angle < 0) {
			angle += 2 * Math.PI;
		}
		const relAngle = Math.abs(this.dir - angle);
		if (relAngle < Math.PI) {
			this.velDir -= this.turnAcceleration * delta;
		} else {
			this.velDir += this.turnAcceleration * delta;
		}
		if (Math.abs(this.velDir) > this.maxTurnSpeed) {
			this.velDir = Math.sign(this.velDir) * this.maxTurnSpeed;
		}

		//actually turn
		if (frozen) {
			this.dir += this.velDir * 0.1 * delta;
		} else {
			this.dir += this.velDir * delta;
		}
		if (this.dir > Math.PI) {
			this.dir -= 2 * Math.PI;
		} else if (this.dir < -Math.PI) {
			this.dir += 2 * Math.PI;
		}

		//thrust if facing player
		const speed = getDistance(this.vel, new Vec(0, 0));
		if (relAngle > (3 * Math.PI) / 4 && relAngle < (5 * Math.PI) / 4) {
			this.vel.x += Math.cos(this.dir) * 0.05 * delta;
			this.vel.y += Math.sin(this.dir) * 0.05 * delta;

			this.velDir = this.velDir * Math.pow(0.99, delta);
			if (Math.abs(this.velDir) < 0.001) {
				this.velDir = 0;
			}
			if (speed > this.maxSpeed) {
				this.vel.normalize(this.maxSpeed);
			}

			for (let i = 0; i < 15; i++) {
				this.exhaust.push(new BossParticle());
			}
		} else {
			this.vel.x = this.vel.x * Math.pow(0.995, delta);
			this.vel.y = this.vel.y * Math.pow(0.995, delta);
			if (Math.abs(this.vel.x) < 0.001) {
				this.vel.x = 0;
			}
			if (Math.abs(this.vel.y) < 0.001) {
				this.vel.y = 0;
			}
		}

		//move
		let newPos;
		if (frozen) {
			newPos = new Vec(this.pos.x + this.vel.x * 0.1 * delta, this.pos.y + this.vel.y * 0.1 * delta);
		} else {
			newPos = new Vec(this.pos.x + this.vel.x * delta, this.pos.y + this.vel.y * delta);
		}
		if (!this.entered || (newPos.x + this.hBoxRad < screenBounds.x && newPos.x - this.hBoxRad > 0)) {
			this.pos.x = newPos.x;
		} else {
			this.vel.x *= -0.9;
		}
		if (!this.entered || (newPos.y + this.hBoxRad < screenBounds.y && newPos.y - this.hBoxRad > 0)) {
			this.pos.y = newPos.y;
		} else {
			this.vel.y *= -0.9;
		}
		if (!this.entered && this.pos.y - this.hBoxRad > 0) {
			this.entered = true;
		}
	};

	hurt = (amt) => {
		if (this.health > 0) {
			this.health -= amt;
			if (this.health <= 0) {
				this.health = 0;
				this.death();
			} else if (!this.angry && this.health < this.maxHealth / 2) {
				//switch to angry mode below half health
				this.angry = true;
				this.turnAcceleration = 0.0009;
				this.maxSpeed = 3;
				this.maxTurnSpeed = 0.0095;
			}
		}
	};

	laser = () => {
		const delta = (deltaTime * 60) / 1000;

		if (this.laserDuration > 1) {
			if (Math.floor(this.laserDuration) === 120 && this.laserState === 0) {
				this.laserState = 1;
				bossLaserSource = playSound(laserSound, 1, true);
			}
			if (this.laserDuration < 120) {
				//actually shoot laser
				if (this.angry) {
					this.maxTurnSpeed = 0.007;
				} else {
					this.maxTurnSpeed = 0.005;
				}

				//construct four different laser beams
				let dir = new Vec(Math.cos(this.dir) * LASER_RADIUS, Math.sin(this.dir) * LASER_RADIUS);
				let offset = new Vec(Math.cos(this.dir + 0.4271) * 154.8, Math.sin(this.dir + 0.4271) * 154.8);
				this.collideLaser(dir, offset);
				offset = new Vec(Math.cos(this.dir - 0.4271) * 154.8, Math.sin(this.dir - 0.4271) * 154.8);
				this.collideLaser(dir, offset);
				dir = new Vec(
					Math.cos(this.dir + Math.PI / 2) * LASER_RADIUS,
					Math.sin(this.dir + Math.PI / 2) * LASER_RADIUS
				);
				offset = new Vec(Math.cos(this.dir + 1.57) * 139, Math.sin(this.dir + 1.57) * 139);
				this.collideLaser(dir, offset);
				dir = new Vec(
					Math.cos(this.dir - Math.PI / 2) * LASER_RADIUS,
					Math.sin(this.dir - Math.PI / 2) * LASER_RADIUS
				);
				offset = new Vec(Math.cos(this.dir - 1.57) * 139, Math.sin(this.dir - 1.57) * 139);
				this.collideLaser(dir, offset);
				shaking = 50;
			}
			this.laserDuration -= delta;
		} else {
			//return to normal after
			if (bossLaserSource) {
				bossLaserSource.stop(0);
			}
			if (this.angry) {
				this.maxTurnSpeed = 0.0095;
			} else {
				this.maxTurnSpeed = 0.0085;
			}
			this.laserDuration -= delta;
		}
	};

	//test if a laser hits objects
	collideLaser = (dir, offset) => {
		for (let i = 1; i < LASER_LENGTH + 1; i++) {
			const pos = new Vec(this.pos.x + offset.x + dir.x * i, this.pos.y + offset.y + dir.y * i);
			const bullet = new Bullet(pos.x, pos.y, 0, 0);
			bullet.hBoxRad = LASER_RADIUS;
			detectCollision(bullet);
		}
	};

	//spawn boids from sides of boss
	spawnBoids = (count) => {
		if (count > 0 && this.health > 0) {
			boids.push(
				new Boid(
					this.pos.x + Math.cos(this.dir + 1.57) * 165,
					this.pos.y + Math.sin(this.dir + 1.57) * 165,
					Math.random() * 7
				)
			);
			boids.push(
				new Boid(
					this.pos.x + Math.cos(this.dir - 1.57) * 165,
					this.pos.y + Math.sin(this.dir - 1.57) * 165,
					Math.random() * 7
				)
			);
			setTimeout(this.spawnBoids, 100, count - 2);
		}
	};

	//set off a bunch of explosions and stuff
	death = () => {
		if (bossLaserSource) {
			bossLaserSource.stop(0);
		}
		boidsKilled++;
		const exp = () => {
			const pos = new Vec(this.pos.x + Math.random() * 180 - 90, this.pos.y + Math.random() * 180 - 90);
			explosion(pos, 100);
			text.push({ amt: 50 * d.multiplier, dur: 80, pos: new Vec(pos.x, pos.y + 7) });
			score += 50 * d.multiplier;
			shaking = 60;
		};
		exp();
		setTimeout(exp, 100);
		setTimeout(exp, 200);
		setTimeout(exp, 300);
		setTimeout(exp, 400);
		setTimeout(exp, 600);
		setTimeout(exp, 700);
		setTimeout(exp, 800);
		setTimeout(exp, 900);
		setTimeout(exp, 1000);
		setTimeout(exp, 1200);
		setTimeout(exp, 1230);
		setTimeout(exp, 1400);
		setTimeout(exp, 1500);
		setTimeout(exp, 1600);
		setTimeout(exp, 1800);
		setTimeout(exp, 2000);

		setTimeout(() => {
			boids.splice(boids.indexOf(this), 1);
			powerup = new Powerup();
			powerup.pos.x = this.pos.x;
			powerup.pos.y = this.pos.y;
			powerup.type = 4;
		}, 2000);
	};

	draw = (offset) => {
		mContext.save();
		mContext.translate(this.pos.x - offset.x, this.pos.y - offset.y);
		mContext.rotate(this.dir + Math.PI / 2);
		mContext.drawImage(mobImg, -150, -175);
		mContext.restore();

		for (let i = 0; i < this.exhaust.length; i++) {
			if (this.exhaust[i].draw(offset, this)) {
				this.exhaust.splice(i, 1);
				i--;
			}
		}
	};
}
