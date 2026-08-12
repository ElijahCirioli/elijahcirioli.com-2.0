let rightGun = true;

class Player {
	constructor(x, y, direction) {
		this.pos = new Vec(x, y);
		this.vel = new Vec(0, 0);
		this.dir = direction;
		this.velDir = 0;
		this.thrust = 0;

		this.maxThrust = 0.25;
		this.maxSpeed = 8;
		this.maxTurnSpeed = 0.08;
		this.hBoxRad = 9;
		this.lives = 3;
		this.vulnerable = 0;

		this.jumpCharge = 0;
		this.maxJumpCharge = 400;
		this.jumpSpeed = 60;
		this.jumping = false;

		this.controllable = true;
		this.powerups = [];
		this.exhaust = [];
		this.jumpParticles = [];
		this.bullets = [];
	}

	update = () => {
		const delta = (deltaTime * 60) / 1000;

		if (this.controllable) {
			if (this.jumping) {
				this.jump();
			} else {
				this.updateControls();
				this.move();

				if (detectCollision(this)) {
					if (this.vulnerable === 0) {
						this.death();
					} else if (this.vulnerable === -1) {
						this.hBoxRad = 9;
						this.vulnerable = 120;
						clearInterval(shootThread);
					}
				}
			}
		}

		if (this.vulnerable > 0) {
			this.vulnerable = Math.max(0, this.vulnerable - delta);
		}

		for (let i = 0; i < this.bullets.length; i++) {
			const b = this.bullets[i];
			b.move();
			if (b.life <= 0 || detectCollision(b)) {
				this.bullets.splice(i, 1);
				i--;
			}
		}

		const freezes = this.powerups.filter((pu) => pu.type === "freeze");
		if (freezes.length > 0) {
			frozen = true;
			freezes.forEach((pu) => {
				pu.duration -= delta;
				if (pu.duration < 0) {
					this.powerups.splice(this.powerups.indexOf(pu), 1);
				}
			});
		} else {
			frozen = false;
		}

		if (shooting && this.powerups.filter((pu) => pu.type === "laser").length > 0) {
			this.laser();
		}
	};

	updateControls = () => {
		const delta = (deltaTime * 60) / 1000;

		if (this.controllable) {
			//thrust forward
			if (thrusting && !charging) {
				this.thrust += 0.02 * delta;
				if (this.thrust > this.maxThrust) {
					this.thrust = this.maxThrust;
				}
				for (let i = 0; i < 8; i++) {
					p.exhaust.push(new ExhaustParticle());
				}
			} else {
				//decelerate ship
				this.thrust = 0;
				this.vel.x = this.vel.x * Math.pow(0.995, delta);
				this.vel.y = this.vel.y * Math.pow(0.995, delta);
				if (Math.abs(this.vel.x) < 0.001) {
					this.vel.x = 0;
				}
				if (Math.abs(this.vel.y) < 0.001) {
					this.vel.y = 0;
				}
				if (charging) {
					//charge hyperjump
					if (this.jumpCharge < this.maxJumpCharge) {
						this.jumpCharge += delta;
					} else {
						this.jumpCharge = this.maxJumpCharge;
					}
					const spacing = 38 - (26 * this.jumpCharge) / this.maxJumpCharge;
					if (Math.floor(this.jumpCharge % spacing) < 12 || this.jumpCharge === this.maxJumpCharge) {
						for (let i = 0; i < 10; i++) {
							this.jumpParticles.push(new JumpParticle());
						}
					}
					if (Math.random() < 0.4 - spacing / 100) {
						this.jumpParticles.push(new LongParticle());
					}
				}
			}
			//turn left
			if (turningLeft) {
				this.velDir -= 0.005 * delta;
				if (this.velDir < -this.maxTurnSpeed) {
					this.velDir = -this.maxTurnSpeed;
				}
			}
			//turn right
			if (turningRight) {
				this.velDir += 0.005 * delta;
				if (this.velDir > this.maxTurnSpeed) {
					this.velDir = this.maxTurnSpeed;
				}
			}
			//decelerate turns
			if (!turningLeft && !turningRight) {
				this.velDir *= 0.65;
				if (Math.abs(this.velDir) < 0.001) {
					this.velDir = 0;
				}
			}
		}
	};

	move = () => {
		const delta = (deltaTime * 60) / 1000;

		this.vel.x += this.thrust * Math.cos(this.dir) * delta;
		this.vel.y += this.thrust * Math.sin(this.dir) * delta;
		const speed = getDistance(new Vec(0, 0), this.vel);
		if (speed > this.maxSpeed) {
			this.vel.normalize(this.maxSpeed);
		}

		const newPos = new Vec(this.pos.x + this.vel.x * delta, this.pos.y + this.vel.y * delta);
		if (newPos.x + this.hBoxRad < screenBounds.x && newPos.x - this.hBoxRad > 0) {
			this.pos.x = newPos.x;
		} else {
			this.vel.x *= -0.8;
		}
		if (newPos.y + this.hBoxRad < screenBounds.y && newPos.y - this.hBoxRad > 0) {
			this.pos.y = newPos.y;
		} else {
			this.vel.y *= -0.8;
		}

		this.dir += this.velDir * delta;
	};

	shoot = () => {
		if (!this.jumping) {
			const laser = this.powerups.filter((pu) => pu.type === "laser");
			if (laser.length === 0) {
				//make sure the player doesnt have a laser
				let dtheta;
				//switch gun sides each shot
				if (rightGun) {
					dtheta = p.dir + Math.PI / 6;
				} else {
					dtheta = p.dir - Math.PI / 6;
				}
				rightGun = !rightGun;
				this.bullets.push(
					new Bullet(
						this.pos.x + 12 * Math.cos(dtheta),
						this.pos.y + 12 * Math.sin(dtheta),
						15 * Math.cos(this.dir),
						15 * Math.sin(this.dir)
					)
				);
				playSound(shootSound, 0.1, false);
			}

			if (p.vulnerable > 0) {
				//cancel invulnerability
				p.vulnerable = 0;
			}
		}
	};

	jump = () => {
		const delta = (deltaTime * 60) / 1000;

		shaking = 10;
		if (this.jumpCharge > 0) {
			this.jumping = true;

			const jumpVel = new Vec(
				(Math.cos(this.dir) * this.jumpSpeed) / 10,
				(Math.sin(this.dir) * this.jumpSpeed) / 10
			);
			//loop over smaller distances to peform collision detection
			for (let i = 0; i < this.jumpSpeed / 10; i++) {
				const newPos = new Vec(this.pos.x + jumpVel.x * delta, this.pos.y + jumpVel.y);
				if (newPos.x + this.hBoxRad < screenBounds.x && newPos.x - this.hBoxRad > 0) {
					this.pos.x = newPos.x;
				} else {
					jumpVel.x *= -1;
					this.dir = Math.atan2(jumpVel.y, jumpVel.x);
				}
				if (newPos.y + this.hBoxRad < screenBounds.y && newPos.y - this.hBoxRad > 0) {
					this.pos.y = newPos.y;
				} else {
					jumpVel.y *= -1;
					this.dir = Math.atan2(jumpVel.y, jumpVel.x);
				}

				for (let i = 0; i < 4; i++) {
					trailParticles.push(new JumpTrailParticle(this.pos, jumpVel));
				}

				this.vel = jumpVel;

				if (detectCollision(this)) {
					if (this.vulnerable === 0) {
						this.death();
					} else if (this.vulnerable === -1) {
						this.hBoxRad = 9;
						this.vulnerable = 120;
					}
					return;
				}
			}

			this.jumpCharge -= 7;
		} else {
			this.vel = new Vec(Math.cos(this.dir) * this.maxSpeed, Math.sin(this.dir) * this.maxSpeed);
			this.jumping = false;
		}
	};

	laser = () => {
		const lowestLaser = this.powerups
			.filter((pu) => pu.type === "laser")
			.sort((a, b) => {
				return a.duration - b.duration;
			})[0];
		if (lowestLaser) {
			//if the player has a laser still
			if (lowestLaser.duration > 0) {
				if (Math.floor(lowestLaser.duration) === 60 && lowestLaser.state === 0) {
					lowestLaser.state = 1;
					laserSource = playSound(laserSound, 0.7, true);
				} else if (lowestLaser.duration < 60) {
					//actually fire laser
					this.maxTurnSpeed = 0.008;
					const dir = new Vec(Math.cos(this.dir) * LASER_RADIUS, Math.sin(this.dir) * LASER_RADIUS);
					const offset = new Vec(Math.cos(this.dir) * 12, Math.sin(this.dir) * 12);
					for (let i = 1; i < LASER_LENGTH + 1; i++) {
						const pos = new Vec(this.pos.x + offset.x + dir.x * i, this.pos.y + offset.y + dir.y * i);
						const bullet = new Bullet(pos.x, pos.y, 0, 0);
						bullet.hBoxRad = LASER_RADIUS;
						detectCollision(bullet);
					}
					shaking = 30;
				}
				lowestLaser.duration -= (deltaTime * 60) / 1000;
			} else {
				//return to normal after laser is done
				this.maxTurnSpeed = 0.08;
				this.powerups.splice(this.powerups.indexOf(lowestLaser), 1);
				shooting = false;
				if (laserSource) {
					laserSource.stop(0);
				}
			}
		}

		if (p.vulnerable > 0) {
			//cancel invulnerability
			p.vulnerable = 0;
		}
	};

	death = () => {
		this.controllable = false;
		this.vel.x = 0;
		this.vel.y = 0;
		this.velDir = 0;
		this.thrust = 0;
		this.jumpCharge = 0;
		this.jumping = false;
		this.maxTurnSpeed = 0.08;
		if (laserSource) {
			laserSource.stop(0);
		}
		if (thrustSource) {
			thrustSource.stop(0);
		}
		frozen = false;
		this.powerups = [];
		clearInterval(shootThread);
		explosion(this.pos, 45);
		shaking = 20;
		if (!infiniteLives) {
			this.lives--;
		}
		if (this.lives >= 0) {
			setTimeout(() => {
				//respawn
				p.spawn();
			}, 3000);
		} else {
			setTimeout(() => {
				//game over
				playing = false;
				menuState = 17;
				menuTick = 0;
				if (bossLaserSource) {
					bossLaserSource.stop(0);
				}
			}, 3000);
		}
	};

	spawn = () => {
		trailParticles = [];

		this.controllable = true;
		this.pos.x = screenBounds.x / 2;
		this.pos.y = screenBounds.y / 2;
		this.dir = -Math.PI / 2;
		this.vulnerable = 180;
		this.hBoxRad = 9;
		this.powerups = [];
		c.pos.x = this.pos.x;
		c.pos.y = this.pos.y;
		c.scl = 1.05;
	};
}
