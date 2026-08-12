const SHAKE_RADIUS = 3; //how violent camera-shake is

class Camera {
	constructor(x, y) {
		this.pos = new Vec(x, y);
		this.edgeBuffer = 240;
		this.bufferSpeed = 0;
		this.scl = 1;
	}

	update = () => {
		if (playing) {
			this.move(); //move to track player
			this.setScale(); //zoom in and out
		}
		this.render(); //actually draw
	};

	move = () => {
		const ctr = new Vec(mCanvas.width / (2 * this.scl), mCanvas.height / (2 * this.scl));
		const buff = this.edgeBuffer / this.scl;
		const diff = new Vec(p.pos.x - this.pos.x, p.pos.y - this.pos.y);

		//if the player has moved too far from the camera
		if (diff.x > ctr.x - buff) {
			this.pos.x = p.pos.x - ctr.x + buff;
		} else if (diff.x < buff - ctr.x) {
			this.pos.x = p.pos.x + ctr.x - buff;
		}
		if (diff.y > ctr.y - buff) {
			this.pos.y = p.pos.y - ctr.y + buff;
		} else if (diff.y < buff - ctr.y) {
			this.pos.y = p.pos.y + ctr.y - buff;
		}

		if (!thrusting) {
			//slowly move player back to center of screen
			if (getSquareDistance(new Vec(0, 0), diff) > 50) {
				diff.normalize(0.6);
				this.pos.x += diff.x;
				this.pos.y += diff.y;
			}
		}
	};

	setScale = () => {
		const bufferSize = 40; //controls how smooth scale changes are
		const minScale = 0.7;
		const maxScale = 1.05;
		const diffScale = maxScale - minScale;

		const speed = getDistance(new Vec(0, 0), p.vel);
		this.bufferSpeed = (this.bufferSpeed * bufferSize + speed) / (bufferSize + 1);
		this.scl = (maxScale - (diffScale * this.bufferSpeed) / p.maxSpeed).toFixed(3);
		if (this.scl > maxScale) {
			this.scl = maxScale;
		} else if (this.scl < minScale) {
			this.scl = minScale;
		}
	};

	render = () => {
		this.scale();

		const width = mCanvas.width / this.scl;
		const height = mCanvas.height / this.scl;
		const ctr = new Vec(width / 2, height / 2);
		const buff = this.edgeBuffer / this.scl;

		const offset = new Vec(this.pos.x - ctr.x, this.pos.y - ctr.y);
		if (shaking > 0) {
			//shake around offset
			offset.x += Math.random() * 2 * SHAKE_RADIUS - SHAKE_RADIUS;
			offset.y += Math.random() * 2 * SHAKE_RADIUS - SHAKE_RADIUS;
			shaking -= (deltaTime * 60) / 100;
		} else {
			shaking = 0;
		}

		const pl = new Vec(0, 0);
		pl.x = (this.pos.x - screenBounds.x / 2) / (300 + buff);
		pl.y = (this.pos.y - screenBounds.y / 2) / (400 + buff);
		//calculate parallax effect

		//clear canvases
		bContext.clearRect(0, 0, width, height);
		mContext.clearRect(0, 0, width, height);
		pContext.clearRect(0, 0, width, height);

		//draw backgrounds
		bContext.fillStyle = "black";
		bContext.fillRect(0, 0, width, height);
		bContext.drawImage(bl1Img, 50 + pl.x * 50, 150 + pl.y * 150, width, height, 0, 0, width, height);
		bContext.drawImage(bl4Img, 150 + pl.x * 75, 250 + pl.y * 175, width, height, 0, 0, width, height);
		bContext.drawImage(bl2Img, 100 + pl.x * 100, 200 + pl.y * 200, width, height, 0, 0, width, height);
		bContext.fillStyle = "rgba(0, 0, 0, 0.25)";
		bContext.fillRect(0, 0, width, height);
		bContext.drawImage(bl3Img, 100 + pl.x * 100, 150 + pl.y * 150, width, height, 0, 0, width, height);

		//draw borders
		bContext.drawImage(bhImg, -50 - offset.x, -50 - offset.y);
		bContext.drawImage(bhImg, -50 - offset.x, screenBounds.y - offset.y);
		bContext.drawImage(bvImg, -50 - offset.x, -offset.y);
		bContext.drawImage(bvImg, screenBounds.x - offset.x, -offset.y);

		//draw boid motherships
		boidMotherships.forEach((b) => {
			if (getSquareDistance(b.pos, this.pos) < 1000000) {
				bContext.strokeStyle = "#2B8BE8";
				b.lines.forEach((l) => {
					bContext.globalAlpha = 0.5 + 0.15 * Math.random();
					bContext.lineWidth = Math.floor(Math.random() * 4) + 11;
					bContext.beginPath();
					bContext.moveTo(b.pos.x - offset.x, b.pos.y - offset.y);
					bContext.lineTo(l.x - offset.x, l.y - offset.y);
					bContext.stroke();
				});
				bContext.globalAlpha = 1;

				bContext.save();
				bContext.translate(b.pos.x - offset.x, b.pos.y - offset.y);
				bContext.rotate(b.dir);
				bContext.drawImage(mobImg, -150, -175);
				bContext.restore();
			}
		});

		//draw powerup
		if (powerup) {
			powerup.draw(offset);
		}

		//draw asteroids
		mContext.shadowOffsetX = -6;
		mContext.shadowOffsetY = 6;
		mContext.shadowColor = "rgba(0, 0, 0, 0.35)";
		asteroids.forEach((a) => {
			if (Math.abs(this.pos.y - a.pos.y) < 400 / this.scl && Math.abs(this.pos.x - a.pos.x) < 500 / this.scl) {
				a.draw(offset);
			}
		});
		mContext.shadowOffsetX = 0;
		mContext.shadowOffsetY = 0;
		mContext.shadowColor = "transparent";

		//draw exhaust
		for (let i = 0; i < p.exhaust.length; i++) {
			if (p.exhaust[i].draw(offset)) {
				p.exhaust.splice(i, 1);
				i--;
			}
		}

		//draw boids
		boids.forEach((b) => {
			if (
				b instanceof Boss ||
				(Math.abs(this.pos.y - b.pos.y) < 350 / this.scl && Math.abs(this.pos.x - b.pos.x) < 450 / this.scl)
			) {
				b.draw(offset);
			}
		});

		//draw bullets
		p.bullets.forEach((b) => {
			pContext.save();
			pContext.translate(b.pos.x - offset.x, b.pos.y - offset.y);
			pContext.rotate(Math.atan2(b.vel.y, b.vel.x));
			pContext.drawImage(bImg, -10, -3);
			pContext.restore();
		});

		//draw player
		if (p.controllable) {
			mContext.save();
			if (p.vulnerable > 0) {
				mContext.globalAlpha = 1 - Math.abs(Math.sin(p.vulnerable / 20)) * 0.5;
			}
			mContext.translate(p.pos.x - offset.x, p.pos.y - offset.y);
			mContext.rotate(p.dir);

			//draw giant laser
			if (p.powerups.filter((pu) => pu.type === "laser").length > 0) {
				this.drawAura();
				if (shooting) {
					const duration = p.powerups
						.filter((pu) => pu.type === "laser")
						.sort((a, b) => {
							return a.duration - b.duration;
						})[0].duration;
					this.drawLaser(duration, 60, LASER_DURATION);
				}
			}
			//actual player
			mContext.drawImage(sImg, -16, -16);

			//if player has shield
			if (p.vulnerable === -1) {
				mContext.globalAlpha = 0.5;
				mContext.drawImage(shImg, 0, 0, 42, 42, -32, -32, 64, 64);
			}

			mContext.restore();
		}

		//draw giant laser
		if (d.wave % 10 === 0) {
			if (boids.length > 0 && boids[0] instanceof Boss && boids[0].laserDuration > 0) {
				const b = boids[0];
				let md = 300;
				if (b.angry) {
					md = 210;
				}
				mContext.save();
				mContext.translate(b.pos.x - offset.x, b.pos.y - offset.y);
				mContext.rotate(b.dir);
				mContext.translate(140, 66);
				this.drawLaser(b.laserDuration, 120, md);
				mContext.translate(0, -132);
				this.drawLaser(b.laserDuration, 120, md);
				mContext.translate(-140, 66);
				mContext.rotate(Math.PI / 2);
				mContext.translate(113, 0);
				this.drawLaser(b.laserDuration, 120, md);
				mContext.translate(-226, 0);
				mContext.scale(-1, 1);
				this.drawLaser(b.laserDuration, 120, md);
				mContext.restore();
			}
		}

		pContext.globalAlpha = 1;
		//draw jump particles
		pContext.save();
		pContext.translate(p.pos.x - offset.x, p.pos.y - offset.y);
		pContext.rotate(p.dir + Math.PI / 2);
		for (let i = 0; i < p.jumpParticles.length; i++) {
			if (p.jumpParticles[i].draw(offset)) {
				p.jumpParticles.splice(i, 1);
				i--;
			}
		}
		pContext.restore();

		//draw jump trail particles
		for (let i = 0; i < trailParticles.length; i++) {
			if (trailParticles[i].draw(offset)) {
				trailParticles.splice(i, 1);
				i--;
			}
		}

		//draw explosion particles
		for (let i = 0; i < explosionParticles.length; i++) {
			if (explosionParticles[i].draw(offset)) {
				explosionParticles.splice(i, 1);
				i--;
			}
		}

		//draw text
		pContext.font = "bold 22px Orbitron";
		pContext.textAlign = "center";
		pContext.lineWidth = 2;
		for (let i = 0; i < text.length; i++) {
			const t = text[i];
			if (t.dur > 10) {
				pContext.fillStyle = "rgba(255, 255, 255, 0.75)";
				pContext.strokeStyle = "rgba(0, 0, 0, 0.75)";
			} else {
				pContext.fillStyle = `rgba(255, 255, 255, ${(7.5 * t.dur) / 100})`;
				pContext.strokeStyle = `rgba(0, 0, 0, ${(7.5 * t.dur) / 100})`;
			}
			pContext.strokeText("+" + Math.floor(t.amt), t.pos.x - offset.x, t.pos.y - offset.y);
			pContext.fillText("+" + Math.floor(t.amt), t.pos.x - offset.x, t.pos.y - offset.y);
			t.dur -= (deltaTime * 60) / 1000;
			if (t.dur <= 0) {
				text.splice(i, 1);
				i--;
			}
		}

		this.restore();
	};

	scale = () => {
		bContext.save();
		mContext.save();
		pContext.save();

		bContext.scale(this.scl, this.scl);
		mContext.scale(this.scl, this.scl);
		pContext.scale(this.scl, this.scl);
	};

	restore = () => {
		bContext.restore();
		mContext.restore();
		pContext.restore();
	};

	drawAura = () => {
		mContext.globalAlpha = 0.5 + 0.1 * Math.random();
		mContext.fillStyle = "#d9271e";
		mContext.beginPath();
		mContext.arc(0, 0, 16 + 3 * Math.random(), 0, 7);
		mContext.fill();
		mContext.globalAlpha = 1;
	};

	drawLaser = (duration, halfDur, maxDur) => {
		//draw giant laser
		mContext.globalAlpha = 1;
		if (duration > halfDur) {
			const ratio = (duration - halfDur) / (maxDur - halfDur);
			mContext.globalAlpha = 0.05 - 0.02 * ratio + Math.random() * 0.05;
			mContext.fillStyle = "#c70e04";
			mContext.fillRect(
				30,
				-LASER_RADIUS - 20 - 10 * ratio,
				LASER_RADIUS * LASER_LENGTH,
				2 * LASER_RADIUS + 40 + 20 * ratio
			);
			mContext.beginPath();
			mContext.arc(
				LASER_RADIUS * LASER_LENGTH + 30,
				0,
				LASER_RADIUS + 20 + 10 * ratio,
				-Math.PI / 2,
				Math.PI / 2
			);
			mContext.fill();

			mContext.fillStyle = "#db261d";
			mContext.globalAlpha = 0.15 - 0.05 * ratio + Math.random() * 0.05;
			mContext.beginPath();
			mContext.moveTo(0, 0);
			mContext.lineTo(30, -LASER_RADIUS - 10 - 8 * ratio);
			mContext.lineTo(30, LASER_RADIUS + 10 + 8 * ratio);
			mContext.fill();

			mContext.globalAlpha = 0.1 - 0.05 * ratio + Math.random() * 0.05;
			mContext.fillRect(
				30,
				-LASER_RADIUS - 10 - 8 * ratio,
				LASER_RADIUS * LASER_LENGTH,
				2 * LASER_RADIUS + 20 + 16 * ratio
			);
			mContext.beginPath();
			mContext.arc(LASER_RADIUS * LASER_LENGTH + 30, 0, LASER_RADIUS + 10 + 8 * ratio, -Math.PI / 2, Math.PI / 2);
			mContext.fill();

			mContext.fillStyle = "#d9271e";
			mContext.globalAlpha = 0.25 - 0.15 * ratio + Math.random() * 0.1;
			mContext.fillRect(
				30,
				-LASER_RADIUS - 5 * ratio,
				LASER_RADIUS * LASER_LENGTH,
				2 * LASER_RADIUS + 10 * ratio
			);
			mContext.beginPath();
			mContext.arc(LASER_RADIUS * LASER_LENGTH + 30, 0, LASER_RADIUS + 5 * ratio, -Math.PI / 2, Math.PI / 2);
			mContext.fill();

			mContext.beginPath();
			mContext.moveTo(0, 0);
			mContext.lineTo(30, -LASER_RADIUS - 5 * ratio);
			mContext.lineTo(30, LASER_RADIUS + 5 * ratio);
			mContext.fill();

			mContext.globalAlpha = 1;
		} else {
			const ratio = duration / halfDur;
			mContext.globalAlpha = 0.4 + 0.1 * ratio + Math.random() * 0.1;
			mContext.fillStyle = "#d13d34";
			mContext.beginPath();
			mContext.moveTo(0, 0);
			mContext.lineTo(20, 14 - LASER_RADIUS - 5 * ratio);
			mContext.lineTo(20, LASER_RADIUS - 14 + 5 * ratio);
			mContext.fill();
			mContext.fillRect(
				20,
				14 - LASER_RADIUS - 5 * ratio,
				LASER_RADIUS * LASER_LENGTH,
				2 * LASER_RADIUS - 28 + 10 * ratio
			);
			mContext.beginPath();
			mContext.arc(LASER_RADIUS * LASER_LENGTH + 20, 0, LASER_RADIUS - 14 + 5 * ratio, -Math.PI / 2, Math.PI / 2);
			mContext.fill();

			mContext.globalAlpha = 0.6 + 0.15 * ratio + Math.random() * 0.1;
			mContext.fillStyle = "#eb928d";
			mContext.beginPath();
			mContext.moveTo(0, 0);
			mContext.lineTo(20, 20 - LASER_RADIUS - 5 * ratio);
			mContext.lineTo(20, LASER_RADIUS - 20 + 5 * ratio);
			mContext.fill();
			mContext.fillRect(
				20,
				20 - LASER_RADIUS - 5 * ratio,
				LASER_RADIUS * LASER_LENGTH,
				2 * LASER_RADIUS - 40 + 10 * ratio
			);
			mContext.beginPath();
			mContext.arc(LASER_RADIUS * LASER_LENGTH + 20, 0, LASER_RADIUS - 20 + 5 * ratio, -Math.PI / 2, Math.PI / 2);
			mContext.fill();

			mContext.globalAlpha = 0.075 + 0.2 * ratio + Math.random() * 0.2;
			mContext.fillStyle = "#fccac7";
			mContext.beginPath();
			mContext.moveTo(0, 0);
			mContext.lineTo(20, 24 - LASER_RADIUS - 5 * ratio);
			mContext.lineTo(20, LASER_RADIUS - 24 + 5 * ratio);
			mContext.fill();
			mContext.fillRect(
				20,
				24 - LASER_RADIUS - 5 * ratio,
				LASER_RADIUS * LASER_LENGTH,
				2 * LASER_RADIUS - 48 + 10 * ratio
			);
			mContext.beginPath();
			mContext.arc(LASER_RADIUS * LASER_LENGTH + 20, 0, LASER_RADIUS - 24 + 5 * ratio, -Math.PI / 2, Math.PI / 2);
			mContext.fill();
			mContext.globalAlpha = 1;
		}
	};
}
