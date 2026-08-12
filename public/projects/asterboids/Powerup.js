const FREEZE_DURATION = 60 * 6; //how long freeze lasts
const LASER_DURATION = 60 * 2; //how long laser animation lasts
const LASER_RADIUS = 40; //collider radius for laser
const LASER_LENGTH = 24; //how many radii long is laser

class Powerup {
	constructor() {
		this.pos = new Vec(Math.random() * 1200 + 100, Math.random() * 1200 + 100);
		this.type = Math.floor(Math.random() * 3);
		this.hBoxRad = 35;
		this.life = 0;
	}

	draw = (offset) => {
		const alpha = 0.5 * Math.sin((this.life * Math.PI) / 240) + 0.4;
		if (this.type === 0) {
			//freeze
			mContext.drawImage(icImg, 0, 0, 42, 42, this.pos.x - offset.x - 25, this.pos.y - offset.y - 25, 50, 50);
			mContext.strokeStyle = "rgba(106, 187, 252, " + alpha + ")";
		} else if (this.type === 1) {
			//shield
			mContext.drawImage(shImg, 0, 0, 42, 42, this.pos.x - offset.x - 25, this.pos.y - offset.y - 25, 50, 50);
			mContext.strokeStyle = "rgba(75, 199, 227, " + alpha + ")";
		} else if (this.type === 2) {
			//laser
			mContext.drawImage(laImg, 0, 0, 42, 42, this.pos.x - offset.x - 21, this.pos.y - offset.y - 21, 42, 42);
			mContext.strokeStyle = "rgba(219, 64, 64, " + alpha + ")";
		} else {
			//extra life
			mContext.drawImage(elImg, 0, 0, 42, 42, this.pos.x - offset.x - 21, this.pos.y - offset.y - 21, 42, 42);
			mContext.strokeStyle = "rgba(255, 158, 31, " + alpha + ")";
		}
		mContext.lineWidth = 3;
		mContext.beginPath();
		mContext.arc(this.pos.x - offset.x, this.pos.y - offset.y, 29 + 4 * alpha, 0, 6.3);
		mContext.stroke();
		this.life = (this.life + 1) % 240;
	};

	update = () => {
		const sqrDist = getSquareDistance(this.pos, p.pos);
		const sqrRad = (this.hBoxRad + p.hBoxRad) * (this.hBoxRad + p.hBoxRad);

		if (sqrDist < sqrRad) {
			if (this.type === 0) {
				//freeze
				p.powerups.push({ type: "freeze", duration: FREEZE_DURATION });
			} else if (this.type === 1) {
				//shield
				p.vulnerable = -1;
				p.hBoxRad = 25;
			} else if (this.type === 2) {
				//laser
				p.powerups.push({ type: "laser", duration: LASER_DURATION, state: 0 });
			} else {
				//1-up
				if (p.lives < 3) {
					p.lives++;
				} else {
					text.push({ amt: 400 * d.multiplier, dur: 80, pos: new Vec(this.pos.x, this.pos.y + 7) });
					score += 400 * d.multiplier;
				}
			}
			powerup = undefined;
		}
	};
}
