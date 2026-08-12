let boidCenter; //the center point of all boids

class Director {
	constructor(wave) {
		this.wave = wave;
		this.waveTime = 0;
		this.difficulty = 0.5;
		this.danger;
		this.spawned = false;
		this.multiplier = 1 + (this.wave - 1) / 10;
		this.nextWave();
	}

	update = () => {
		this.calculateDanger(); //see how hard things currently are
		this.calculateDifficulty(); //adjust difficulty based on time and how hard things are right now
		this.applyDifficulty(); //use difficulty level to adjust gameplay
		this.waveTime += (deltaTime * 60) / 1000;
		if (!this.spawned && boids.length === 0) {
			//all boids are dead, go to next wave
			this.nextWave();
		}
	};

	calculateDanger = () => {
		boidCenter = boids.reduce(
			(total, b) => {
				return new Vec(total.x + b.pos.x, total.y + b.pos.y);
			},
			new Vec(0, 0)
		);
		boidCenter.x /= boids.length;
		boidCenter.y /= boids.length;

		let dangerDistance = 100000;
		if (boids.length > 0) {
			//calculate distance from player to center of boids
			dangerDistance = Math.floor(getDistance(boidCenter, p.pos));
		}

		//calculate danger from distance, speed, targeting weight, num of asteroids, num of boids
		this.danger = Math.floor(
			1000 / dangerDistance + 10 * SPEED + 30 * TARGETING_WEIGHT + 10 * asteroids.length + 5 * boids.length
		);
		if (p.vulnerable !== -1) {
			//increase danger if not shielded
			this.danger += 50;
		}
		if (this.danger > 1000) {
			//cap danger
			this.danger = 1000;
		}
	};

	calculateDifficulty = () => {
		const waveDifficulty = (0.3 * this.wave) / 20; //base difficulty on wave
		const dangerDifficulty = 0.4 * 1 - this.danger / 1000; //increase as danger decreases
		const sineDifficulty = 0.4 * Math.abs(Math.sin(this.waveTime / 300)); //fluctuate with time
		const timeDifficulty = this.waveTime / 1000000; //increase over time
		this.difficulty = waveDifficulty + dangerDifficulty + timeDifficulty + sineDifficulty;
		if (this.difficulty > 1) {
			//cap difficulty
			this.difficulty = 1;
		}
	};

	applyDifficulty = () => {
		//affect how much boids target player
		if (this.waveTime < 360) {
			TARGETING_WEIGHT = -0.05;
		} else {
			TARGETING_WEIGHT = -0.1 + 0.5 * this.difficulty + 0.1 * (Math.random() - 0.5);
		}
		SPEED = 3 + this.difficulty * 4 + 0.2 * (Math.random() - 0.5);

		//spawn asteroids
		const asteroidChance =
			this.difficulty / 300 +
			0.05 * Math.abs(Math.sin(this.waveTime / 1200)) -
			0.016 * asteroids.length -
			0.03 / this.wave;
		if (Math.random() < asteroidChance) {
			asteroids.push(new Asteroid(true, 0, 0, 0, 0, 0));
		}

		//spawn powerups
		if (!powerup && Math.random() < 0.00065) {
			powerup = new Powerup();
		}
	};

	nextWave = () => {
		//advance wave and spawn boids
		this.wave++;
		this.waveTime = 0;
		this.spawned = true;
		this.multiplier = 1 + (this.wave - 1) / 10;
		setTimeout(() => {
			if (this.wave % 10 === 0) {
				//boss wave
				boids.push(new Boss(150 + 5 * this.wave));
			} else {
				//regular wave
				const boidCount = 15 + 3 * this.wave;
				const spawnLocations = [new Vec(150, 150), new Vec(150, 1250), new Vec(1250, 1250), new Vec(1250, 150)];
				spawnLocations.forEach((s) => {
					if (getSquareDistance(s, p.pos) < 40000) {
						spawnLocations.splice(spawnLocations.indexOf(s), 1);
					}
				});
				for (let i = 0; i < boidCount; i++) {
					const index = Math.floor(Math.random() * spawnLocations.length);
					setTimeout(() => {
						boids.push(
							new Boid(
								spawnLocations[index].x - 125 + 250 * Math.random(),
								spawnLocations[index].y - 125 + 250 * Math.random(),
								Math.random() * 7
							)
						);
					}, i * 100);
				}
			}
			setTimeout(() => {
				this.spawned = false;
			}, 1000);
		}, 3000);
	};
}
