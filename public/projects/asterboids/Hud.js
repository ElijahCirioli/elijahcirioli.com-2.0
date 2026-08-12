const drawHud = () => {
	hContext.clearRect(0, 0, hCanvas.width, hCanvas.height);
	hContext.save();

	//draw frozen border
	if (frozen) {
		const freezes = p.powerups
			.filter((pu) => pu.type === "freeze")
			.sort((a, b) => {
				return b.duration - a.duration;
			});
		if (freezes.length > 0) {
			const percentage = freezes[0].duration / FREEZE_DURATION;
			hContext.globalAlpha = 0.65 * percentage;
			hContext.drawImage(fr1Img, 0, 0);
			hContext.globalAlpha = 0.9 * percentage;
			hContext.drawImage(fr2Img, 0, 0);
		}
	}

	//draw grey backgrounds
	hContext.globalAlpha = 0.5;
	hContext.drawImage(liImg, 0, hCanvas.height - 38);
	hContext.drawImage(biImg, hCanvas.width - 98, hCanvas.height - 38);
	hContext.drawImage(siImg, hCanvas.width - 147, 0);

	//draw life ships
	hContext.globalAlpha = 0.8;
	const y = hCanvas.height - 20.55;
	for (let i = 0; i < p.lives; i++) {
		const x = 21.55 + 32 * i;
		hContext.save();
		hContext.translate(x, y);
		hContext.rotate(-Math.PI / 2);
		hContext.drawImage(sImg, 0, 0, 32, 32, -12, -12, 24, 24);
		hContext.restore();
	}
	hContext.restore();

	//draw boid count
	hContext.globalAlpha = 0.7;
	hContext.save();
	hContext.translate(hCanvas.width - 64, hCanvas.height - 18);
	hContext.rotate(-Math.PI / 2);
	hContext.drawImage(boImg, 0, 0, 28, 28, -12, -12, 24, 24);
	hContext.restore();
	hContext.globalAlpha = 0.9;
	hContext.fillStyle = "black";
	hContext.textAlign = "left";
	hContext.font = "bold 22px Orbitron";
	hContext.fillText(boids.length, hCanvas.width - 44, hCanvas.height - 11);

	//draw score
	hContext.textAlign = "right";
	let scoreString = Math.floor(score) + "";
	while (scoreString.length < 7) {
		scoreString = "0" + scoreString;
	}
	hContext.font = "bold 20px Orbitron";
	hContext.fillText(scoreString, hCanvas.width - 5, 20);

	if (minimap > 0) {
		//draw minimap
		const speed = getDistance(new Vec(0, 0), p.vel);
		if (speed > 3.3 || minimap === 2) {
			hContext.lineWidth = 1;
			let ratio = 1;
			if (minimap === 1) {
				ratio = speed / p.maxSpeed;
			}
			hContext.globalAlpha = ratio * 0.35;
			hContext.strokeStyle = "#8cf2f5";
			hContext.strokeRect(15, 15, 100, 100);

			hContext.fillStyle = "#ff8c00";
			hContext.globalAlpha = ratio * 0.4;
			hContext.beginPath();
			hContext.arc(15 + (p.pos.x * 100) / screenBounds.x, 15 + (p.pos.y * 100) / screenBounds.y, 2, 0, 7);
			hContext.fill();

			hContext.fillStyle = "#6ac251";
			hContext.beginPath();
			hContext.arc(15 + (boidCenter.x * 100) / screenBounds.x, 15 + (boidCenter.y * 100) / screenBounds.y, 2, 0, 7);
			hContext.fill();
		}
	}

	//draw wave indicator
	if (d.waveTime < 180) {
		hContext.globalAlpha = 1;
		hContext.font = "bolder 90px 'Exo 2'";
		hContext.textAlign = "center";
		let opacity = (180 - d.waveTime) / 60;
		if (opacity > 1) {
			opacity = 1;
		}
		hContext.lineWidth = 4;
		let str = `WAVE ${d.wave}`;
		if (d.wave % 10 === 0) {
			str = "BOSS WAVE";
		}
		hContext.strokeStyle = `rgba(255, 140, 0, ${opacity / 2})`;
		hContext.strokeText(str, 400, 200);
		hContext.fillStyle = `rgba(255, 255, 255, ${opacity})`;
		hContext.fillText(str, 400, 200);
	}

	//draw health bar for boss
	hContext.globalAlpha = 0.5;
	if (d.wave % 10 === 0) {
		hContext.drawImage(hbImg, 0, 0, 460, 40, 170, 0, 460, 40);
		if (boids.length > 0) {
			const boss = boids[0];
			if (boss instanceof Boss && boss.health > 0) {
				const ratio = Math.floor((423 * boss.health) / boss.maxHealth);
				hContext.globalAlpha = 0.7;
				hContext.drawImage(hbImg, 19, 40, ratio, 40, 189, 0, ratio, 40);
			}
		}
	}
};
