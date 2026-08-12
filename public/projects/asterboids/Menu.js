let menuTick = 0;
let menuState = 1;
let animationTick = 0;
let animationState = 0;
let menuScorePage = 0;
let animationParticles, animationShips, animationBullet;
let nameVals, name, localScores, localIndex;

const menu = () => {
	deltaTime = Date.now() - lastTime;
	lastTime = Date.now();

	if (animationTick < 120) {
		mContext.clearRect(0, 0, mCanvas.width, mCanvas.height);
		pContext.clearRect(0, 0, mCanvas.width, mCanvas.height);
		hContext.clearRect(0, 0, mCanvas.width, mCanvas.height);
		bContext.clearRect(0, 0, mCanvas.width, mCanvas.height);
		drawMenu();
	} else {
		animateStart();
	}
	if (!playing) {
		requestAnimationFrame(menu);
	}
};

const drawMenu = () => {
	if (menuState <= 4) {
		//title screen
		mContext.drawImage(ssImg, menuTick, 0, 550, 350, 200, 70, 550, 350);
		if (menuTick > 1450) {
			mContext.drawImage(ssImg, 0, 0, 550, 350, 2200 - menuTick, 70, 550, 350);
		}

		if (animationTick > 0 && animationTick < 116) {
			animateStart();
		}

		mContext.drawImage(meImg, 0, 0);
		mContext.drawImage(tiImg, 245, 110);

		mContext.fillStyle = "white";
		mContext.textAlign = "left";
		mContext.font = "bold 28px 'Exo 2'";
		mContext.fillText("PLAY", 530, 240);
		mContext.fillText("LEADERBOID", 530, 275);
		mContext.fillText("HELP", 530, 310);
		mContext.fillText("SETTINGS", 530, 345);
		menuTick = (menuTick + 0.5) % 2000;

		if (menuState > 0 && animationTick === 0) {
			mContext.font = "bold 22px 'Exo 2'";
			mContext.fillStyle = "#5e944b";
			mContext.fillText("➤", 500, 202 + 35 * menuState);
		}

		if (animationTick >= 116) {
			animateStart();
		}
	} else if (menuState <= 6) {
		//help
		mContext.drawImage(heImg, 0, 0);
		mContext.fillStyle = "white";
		mContext.textAlign = "left";
		mContext.font = "bold 28px 'Exo 2'";
		mContext.fillText("BACK", 65, 40);
		if (menuState === 6) {
			mContext.font = "22px 'Exo 2'";
			mContext.fillStyle = "#5e944b";
			mContext.fillText("➤", 35, 37);
		}
	} else if (menuState <= 11) {
		//options
		mContext.drawImage(smImg, 0, 0);
		mContext.fillStyle = "white";
		mContext.textAlign = "left";
		mContext.font = "bold 28px 'Exo 2'";
		mContext.fillText("BACK", 65, 40);

		mContext.textAlign = "center";
		mContext.font = "bolder 56px 'Exo 2'";
		mContext.fillStyle = "#5e944b";
		mContext.fillText("SETTINGS", 400, 100);
		mContext.fillStyle = "white";

		mContext.textAlign = "left";
		mContext.font = "bold 32px 'Exo 2'";
		mContext.fillText("VOLUME", 200, 190);
		mContext.fillText("MINIMAP", 200, 290);
		mContext.fillText("INFINITE LIVES", 200, 390);

		mContext.fillStyle = "rgb(220, 220, 220)";
		mContext.textAlign = "right";
		mContext.font = "lighter 32px 'Exo 2'";
		let volStr = "";
		for (let i = 0; i < 10; i++) {
			if (i < volume) {
				volStr += "◼";
			} else {
				volStr += "◻";
			}
		}
		mContext.font = "lighter 24px 'Exo 2'";
		mContext.fillText(volStr, 600, 186);
		mContext.font = "lighter 32px 'Exo 2'";
		switch (minimap) {
			case 0:
				mContext.fillText("OFF", 600, 290);
				break;
			case 1:
				mContext.fillText("DYNAMIC", 600, 290);
				break;
			case 2:
				mContext.fillText("SHOW", 600, 290);
				break;
		}
		if (infiniteLives) {
			mContext.fillText("ON", 600, 390);
		} else {
			mContext.fillText("OFF", 600, 390);
		}

		mContext.textAlign = "left";
		if (menuState === 8) {
			mContext.font = "22px 'Exo 2'";
			mContext.fillStyle = "#5e944b";
			mContext.fillText("➤", 35, 37);
		} else if (menuState >= 9) {
			mContext.font = "bold 22px 'Exo 2'";
			mContext.fillStyle = "#5e944b";
			mContext.fillText("➤", 165, 186 + 100 * (menuState - 9));
		}
	} else if (menuState <= 13) {
		//leaderboid
		mContext.drawImage(smImg, 0, 0);
		mContext.fillStyle = "white";
		mContext.textAlign = "left";
		mContext.font = "bold 28px 'Exo 2'";
		mContext.fillText("BACK", 65, 40);

		mContext.fillStyle = "#5e944b";
		if (menuState === 13) {
			mContext.font = "22px 'Exo 2'";
			mContext.fillText("➤", 35, 37);
		}

		mContext.textAlign = "center";
		mContext.font = "bolder 56px 'Exo 2'";
		mContext.fillText("LEADERBOID", 400, 95);

		mContext.fillStyle = "white";
		mContext.font = "bolder 30px 'Exo 2'";
		mContext.fillText("RANK", 200, 145);
		mContext.fillText("SCORE", 400, 145);
		mContext.fillText("NAME", 600, 145);

		if (highscores.length > 0) {
			mContext.font = "24px Orbitron";
			const maxIndex = 10 * (menuScorePage + 1);
			for (let i = 10 * menuScorePage; i < maxIndex; i++) {
				if (i < highscores.length) {
					if (i % 2 === 0) {
						mContext.fillStyle = "white";
					} else {
						mContext.fillStyle = "#bfbfbf";
					}
					mContext.fillText(i + 1, 200, 188 + 38 * (i - 10 * menuScorePage));
					mContext.fillText(highscores[i].score, 400, 188 + 38 * (i - 10 * menuScorePage));
					mContext.fillText(highscores[i].name, 600, 188 + 38 * (i - 10 * menuScorePage));
				}
			}

			mContext.fillStyle = "white";
			mContext.font = "bolder 30px 'Exo 2'";
			if (menuScorePage > 0) {
				mContext.fillText("⮝", 300, 575);
			}
			if (highscores.length > maxIndex) {
				mContext.fillText("⮟", 500, 575);
			}
		} else {
			mContext.fillStyle = "white";
			mContext.font = "38px Orbitron";
			menuTick = (menuTick + 1) % 200;
			let loadingStr = " ";
			for (let i = 0; i < 100; i += 20) {
				if (menuTick < 100) {
					if (i < menuTick) {
						loadingStr += "● ";
					} else {
						loadingStr += "○ ";
					}
				} else {
					if (i > menuTick - 100) {
						loadingStr += "● ";
					} else {
						loadingStr += "○ ";
					}
				}
			}
			mContext.fillText(loadingStr, 400, 240);
		}
	} else if (menuState <= 16) {
		hContext.globalAlpha = 1;
		if (menuTick < 10) {
			menuTick++;
			const ratio = menuTick / 10;
			hContext.fillStyle = `rgba(0, 0, 0, ${ratio * 0.5})`;
			hContext.fillRect(0, 0, hCanvas.width, hCanvas.height);
			hContext.globalAlpha = 0.8;
			hContext.drawImage(pbImg, 390 - 85 * ratio, 290 - 70 * ratio, 170 * ratio, 140 * ratio);
		} else {
			hContext.fillStyle = "rgba(0, 0, 0, 0.5)";
			hContext.fillRect(0, 0, hCanvas.width, hCanvas.height);
			hContext.globalAlpha = 0.8;
			hContext.drawImage(pbImg, 305, 220);
			hContext.fillStyle = "black";
			hContext.font = "bolder 25px 'Exo 2'";
			hContext.textAlign = "left";
			hContext.fillText("RESUME", 363, 272);
			hContext.fillText("QUIT", 363, 307);
			hContext.globalAlpha = 1;
			hContext.font = "bold 22px 'Exo 2'";
			if (menuState === 15) {
				hContext.fillStyle = "#262626";
				hContext.fillText("➤", 335, 272);
				hContext.fillStyle = "#5e944b";
				hContext.fillText("➤", 337, 270);
			} else if (menuState === 16) {
				hContext.fillStyle = "#262626";
				hContext.fillText("➤", 335, 307);
				hContext.fillStyle = "#5e944b";
				hContext.fillText("➤", 337, 305);
			}
		}
	} else if (menuState === 17) {
		hContext.globalAlpha = 1;
		if (menuTick < 10) {
			menuTick++;
			const ratio = menuTick / 10;
			hContext.fillStyle = `rgba(0, 0, 0, ${ratio * 0.5})`;
			hContext.fillRect(0, 0, hCanvas.width, hCanvas.height);
			hContext.globalAlpha = 0.8;
			hContext.drawImage(dsbImg, 400 - 115 * ratio, 300 - 170 * ratio, 230 * ratio, 340 * ratio);
		} else {
			hContext.fillStyle = "rgba(0, 0, 0, 0.5)";
			hContext.fillRect(0, 0, hCanvas.width, hCanvas.height);
			hContext.globalAlpha = 0.8;
			hContext.drawImage(dsbImg, 285, 130);
			hContext.fillStyle = "black";
			hContext.font = "bolder 30px 'Exo 2'";
			hContext.textAlign = "center";
			hContext.fillText("GAME OVER", 405, 175);
			hContext.textAlign = "left";
			hContext.font = "bolder 20px Orbitron";
			hContext.fillText("SCORE", 307, 220);
			hContext.fillText("WAVE", 307, 270);
			hContext.fillText("BOIDS", 307, 320);
			hContext.fillText("ASTEROIDS", 307, 370);
			hContext.textAlign = "right";
			hContext.font = "20px Orbitron";
			hContext.fillText(Math.floor(score), 504, 220);
			hContext.fillText(d.wave, 504, 270);
			hContext.fillText(boidsKilled, 504, 320);
			hContext.fillText(asteroidsKilled, 504, 370);
			hContext.font = "18px 'Exo 2'";
			hContext.textAlign = "center";
			hContext.fillText("PRESS ANY BUTTON", 400, 430);
			hContext.fillText("TO CONTINUE", 400, 446);
			hContext.globalAlpha = 1;
		}
	} else if (menuState <= 24) {
		//name enter screen
		mContext.drawImage(smImg, 0, 0);
		mContext.fillStyle = "white";
		mContext.textAlign = "left";
		mContext.font = "bold 28px 'Exo 2'";
		mContext.fillText("QUIT", 65, 40);
		mContext.textAlign = "center";
		mContext.font = "bolder 42px 'Exo 2'";
		mContext.fillText("ENTER NAME", 400, 90);
		mContext.font = "bolder 110px Orbitron";
		mContext.fillText(charSet[nameVals[0]], 220, 280);
		mContext.fillText(charSet[nameVals[1]], 340, 280);
		mContext.fillText(charSet[nameVals[2]], 460, 280);
		mContext.fillText(charSet[nameVals[3]], 580, 280);
		name = charSet[nameVals[0]] + charSet[nameVals[1]] + charSet[nameVals[2]] + charSet[nameVals[3]];
		if (menuState >= 20 && menuState <= 23) {
			const nameIndex = menuState - 20;
			mContext.font = "bolder 50px Orbitron";
			mContext.fillText("⮝", 220 + nameIndex * 120, 178);
			mContext.fillText("⮟", 220 + nameIndex * 120, 336);
		}
		if (localScores.length > 1) {
			mContext.font = "bolder 30px Orbitron";
			mContext.fillText(localIndex + 1, 260, 450);
			mContext.fillText(score, 365, 450);
			mContext.fillText(name, 540, 450);
			mContext.font = "lighter 24px Orbitron";
			mContext.fillStyle = "#bfbfbf";
			if (localIndex > 0) {
				mContext.fillText(localIndex, 260, 410);
				mContext.fillText(localScores[localIndex - 1].score, 365, 410);
				mContext.fillText(localScores[localIndex - 1].name, 540, 410);
			}
			if (localIndex < localScores.length - 1) {
				mContext.fillText(localIndex + 2, 260, 486);
				mContext.fillText(localScores[localIndex + 1].score, 365, 486);
				mContext.fillText(localScores[localIndex + 1].name, 540, 486);
			}
		}
		mContext.fillStyle = "white";
		mContext.font = "bolder 38px 'Exo 2'";
		mContext.fillText("SAVE SCORE", 400, 560);
		mContext.fillStyle = "#5e944b";
		mContext.textAlign = "left";
		if (menuState === 19) {
			mContext.font = "22px 'Exo 2'";
			mContext.fillText("➤", 35, 37);
		} else if (menuState === 24) {
			mContext.font = "26px 'Exo 2'";
			mContext.fillText("➤", 260, 555);
		}
	}
};

const animateStart = () => {
	const delta = (deltaTime * 60) / 1000;
	animationTick += delta;
	if (animationTick < 116) {
		animationParticles.forEach((a) => {
			a.t++;
			a.x -= (a.t * a.speed * animationTick) / 100;
			mContext.strokeStyle = `rgba(${200 - a.hue}, ${255 - a.hue / 6}, 255, ${0.8 - a.t / 187})`;
			mContext.beginPath();
			mContext.moveTo(a.x, a.y);
			mContext.lineTo(a.x + a.t * a.length * 3.5, a.y);
			mContext.stroke();
			if (a.x < -150) {
				animationParticles.splice(animationParticles.indexOf(a), 1);
			}
		});
		for (let i = 0; i < Math.floor(animationTick / 6); i++) {
			animationParticles.push({
				x: 800,
				y: 50 + Math.random() * 500,
				t: 0,
				speed: 0.5 + Math.random() * 0.5,
				length: 0.5 + Math.random() * 0.5,
				hue: Math.floor(Math.random() * 70),
			});
		}
	} else if (animationTick < 120) {
		if (animationTick >= 117 && animationState === 0) {
			animationState = 1;
			playSound(jumpSound, 0.85, false);
		}
		mContext.fillStyle = `rgba(255, 255, 255, ${(animationTick - 116) / 3})`;
		mContext.fillRect(0, 0, mCanvas.width, mCanvas.height);
	} else if (animationTick < 120) {
		mContext.fillStyle = "white";
		mContext.fillRect(0, 0, mCanvas.width, mCanvas.height);
	} else if (animationTick >= 120 && animationState === 1) {
		animationState = 2;
		animationShips.push({
			pos: new Vec(-300, 300),
			vel: new Vec(7.5, 0),
			dir: Math.PI / 2,
			image: mosImg,
			offset: new Vec(-150, -275),
		});
	} else if (animationTick <= 370) {
		mContext.fillStyle = "black";
		mContext.fillRect(0, 0, mCanvas.width, mCanvas.height);
		mContext.drawImage(bl1Img, -150, -240);
		mContext.drawImage(bl2Img, -150, -240);
		mContext.drawImage(bl3Img, -150, -240);
		mContext.drawImage(bl4Img, -150, -240);
		drawShip(0);
		animationShips[0].vel.x -= 0.015 * delta;
	} else if (animationTick >= 371 && animationState === 2) {
		animationState = 3;
		animationShips[0].pos = new Vec(100, 430);
		animationShips.push({
			pos: new Vec(1200, -100),
			vel: new Vec(-2.7, 2.7),
			dir: (5 * Math.PI) / 4,
			image: mobImg,
			offset: new Vec(-150, -175),
		});
		animationShips.push({
			pos: new Vec(1300, 800),
			vel: new Vec(-3.8, -1.2),
			dir: (10 * Math.PI) / 6,
			image: mobImg,
			offset: new Vec(-150, -175),
		});
		p = new Player(470, 430, 0);
		animationBullet = new Bullet(470, 430, 0, 0);
		animationBullet.hBoxRad = 90;
		p.bullets.push(animationBullet);
		SPEED = 5;
		TARGETING_WEIGHT = 0.3;
		d = { wave: 1 };
	} else if (animationTick <= 1060) {
		mContext.fillStyle = "black";
		mContext.fillRect(0, 0, mCanvas.width, mCanvas.height);
		pContext.clearRect(0, 0, pCanvas.width, pCanvas.height);
		pContext.save();
		mContext.save();
		mContext.scale(0.7, 0.7);
		pContext.scale(0.7, 0.7);
		mContext.drawImage(bl1Img, -100, -80);
		mContext.drawImage(bl2Img, -100, -80);
		mContext.drawImage(bl3Img, -100, -80);
		mContext.drawImage(bl4Img, -100, -80);

		drawShip(0);
		animationShips.forEach((s) => {
			if (animationShips.indexOf(s) < 3) {
				s.vel.x = s.vel.x * Math.pow(0.99, delta);
				s.vel.y = s.vel.y * Math.pow(0.99, delta);
				if (Math.abs(s.vel.x) < 0.01) {
					s.vel.x = 0;
				}
				if (Math.abs(s.vel.y) < 0.01) {
					s.vel.y = 0;
				}
			}
		});

		if (animationTick > 620) {
			if (animationTick < 740 && Math.floor(animationTick) % 5 === 0 && animationState === 3) {
				animationState = 4;
				const spawnPositions = [
					new Vec(920 + Math.random() * 20, 160 + Math.random() * 20),
					new Vec(920 + Math.random() * 20, 670 + Math.random() * 20),
				];
				boids.push(new Boid(spawnPositions[0].x, spawnPositions[0].y, 0));
				boids.push(new Boid(spawnPositions[1].x, spawnPositions[1].y, 0));
			} else if (animationTick < 740) {
				animationState = 3;
			}

			boids.forEach((b) => {
				b.update();
				b.draw(new Vec(0, 0));
			});

			detectCollision(animationBullet);

			if (
				animationTick > 800 &&
				animationTick < 900 &&
				Math.floor(animationTick) % 13 === 0 &&
				animationState === 3
			) {
				animationState = 4;
				const pos = new Vec(
					animationBullet.pos.x + Math.random() * 300 - 150,
					animationBullet.pos.y + Math.random() * 80 - 40
				);
				explosion(pos, 130);
			} else if (animationTick < 900) {
				animationState = 3;
			}
			if (Math.floor(animationTick) >= 900 && animationState <= 4) {
				animationState = 5;
				animationShips[0].image = sImg;
				animationShips[0].offset = new Vec(-16, -16);
				animationShips[0].vel = new Vec(0, -7);
				animationShips[0].dir = -Math.PI / 2;
				const pos = animationShips[0].pos;

				const img1 = new Image();
				img1.src = "./art/asteroidImages/0/0.png";
				const img2 = new Image();
				img2.src = "./art/asteroidImages/1/1.png";
				const img3 = new Image();
				img3.src = "./art/asteroidImages/2/2.png";
				const img4 = new Image();
				img4.src = "./art/asteroidImages/3/3.png";
				animationShips.push({
					pos: new Vec(pos.x - 150, pos.y - 15),
					vel: new Vec(-0.5, -0.8),
					dir: 1.45,
					image: img1,
					offset: new Vec(-65, -65),
				});
				animationShips.push({
					pos: new Vec(pos.x + 60, pos.y - 20),
					vel: new Vec(0.6, -0.8),
					dir: 1.8,
					image: img2,
					offset: new Vec(-65, -65),
				});
				animationShips.push({
					pos: new Vec(pos.x - 230, pos.y + 5),
					vel: new Vec(-0.3, 0.9),
					dir: 1.2,
					image: img3,
					offset: new Vec(-65, -65),
				});
				animationShips.push({
					pos: new Vec(pos.x + 80, pos.y + 15),
					vel: new Vec(0.3, 0.6),
					dir: 1.9,
					image: img4,
					offset: new Vec(-65, -65),
				});
				animationShips.push({
					pos: new Vec(pos.x - 20, pos.y + 5),
					vel: new Vec(-0.5, 0),
					dir: 1.4,
					image: img2,
					offset: new Vec(-65, -65),
				});
				animationShips.push({
					pos: new Vec(pos.x + 5, pos.y + 15),
					vel: new Vec(0.3, 0.6),
					dir: 1.5,
					image: img1,
					offset: new Vec(-65, -65),
				});
				animationShips.push({
					pos: new Vec(pos.x - 50, pos.y + 25),
					vel: new Vec(-0.4, 0.2),
					dir: 1.6,
					image: img3,
					offset: new Vec(-65, -65),
				});
				animationShips.push({
					pos: new Vec(pos.x + 105, pos.y + 35),
					vel: new Vec(0.7, 0.1),
					dir: 1,
					image: img2,
					offset: new Vec(-65, -65),
				});
			}
		}

		for (let i = 1; i < animationShips.length; i++) {
			drawShip(i);
		}

		for (let i = 0; i < explosionParticles.length; i++) {
			if (explosionParticles[i].draw(new Vec(0, 0))) {
				explosionParticles.splice(i, 1);
				i--;
			}
		}

		if (animationTick > 990) {
			pContext.fillStyle = `rgba(0, 0, 0, ${(animationTick - 990) / 15})`;
			pContext.fillRect(0, 0, pCanvas.width / 0.7, pCanvas.height / 0.7);
		}
		mContext.restore();
		pContext.restore();
	} else {
		animationTick = 0;
		animationState = 0;
		setup();
	}
	if (animationTick > 120) {
		mContext.fillStyle = "white";
		mContext.textAlign = "left";
		mContext.font = "bold 16px Orbitron";
		mContext.fillText("PRESS ANY BUTTON TO SKIP", 15, 590);
	}
};

const drawShip = (index) => {
	const s = animationShips[index];
	mContext.save();
	mContext.translate(s.pos.x, s.pos.y);
	mContext.rotate(s.dir);
	mContext.drawImage(s.image, s.offset.x, s.offset.y);
	if (index > 0 && index < 3) {
		pContext.save();
		pContext.translate(s.pos.x, s.pos.y);
		pContext.rotate(s.dir);
		pContext.drawImage(s.image, s.offset.x, s.offset.y);
		pContext.clearRect(s.offset.x, s.offset.y, -2 * s.offset.x, -2 * s.offset.y);
		pContext.restore();
	}
	mContext.restore();

	const delta = (deltaTime * 60) / 1000;
	s.pos.x += s.vel.x * delta;
	s.pos.y += s.vel.y * delta;
};

const startGame = () => {
	animationTick = 1;
	animationParticles = [];
	animationShips = [];
};

const getLeaderboard = () => {
	storage
		.collection("asterboids")
		.get()
		.then((snapshot) => {
			highscores = [];
			snapshot.forEach((doc) => {
				const data = doc.data();
				highscores.push({ name: data.name, score: parseInt(data.score) });
			});

			highscores.sort((a, b) => {
				return b.score - a.score;
			});
		});
};
getLeaderboard();

const postScore = (n, s) => {
	storage
		.collection("tetris")
		.add({ name: n, score: `${s}` })
		.then((res) => {
			getLeaderboard();
		});
};

document.onmousemove = (e) => {
	e = window.event || e;
	e.preventDefault();
	const rect = mCanvas.getBoundingClientRect();
	const pos = new Vec(e.clientX - rect.left, e.clientY - rect.top);

	if (!playing && pos.x > 0 && pos.x < 800 && pos.y > 0 && pos.y < 600) {
		if (menuState <= 4) {
			//title screen
			menuState = 0;
			if (pos.x > 480 && pos.x < 720) {
				if (pos.y > 210 && pos.y < 245) {
					menuState = 1;
				} else if (pos.y > 245 && pos.y < 280) {
					menuState = 2;
				} else if (pos.y > 280 && pos.y < 315) {
					menuState = 3;
				} else if (pos.y > 315 && pos.y < 360) {
					menuState = 4;
				}
			}
		} else if (menuState <= 6) {
			//help
			menuState = 5;
			if (pos.y > 10 && pos.y < 45 && pos.x > 20 && pos.x < 160) {
				menuState = 6;
			}
		} else if (menuState <= 11) {
			//options
			menuState = 7;
			if (pos.y > 10 && pos.y < 45 && pos.x > 20 && pos.x < 160) {
				menuState = 8;
			} else if (pos.x > 140 && pos.x < 660) {
				if (pos.y > 160 && pos.y < 220) {
					menuState = 9;
				} else if (pos.y > 260 && pos.y < 320) {
					menuState = 10;
				} else if (pos.y > 360 && pos.y < 420) {
					menuState = 11;
				}
			}
		} else if (menuState <= 13) {
			//leaderboid
			menuState = 12;
			if (pos.y > 10 && pos.y < 45 && pos.x > 20 && pos.x < 160) {
				menuState = 13;
			}
		} else if (menuState <= 16) {
			//pause menu
			menuState = 14;
			if (pos.x > 330 && pos.x < 480) {
				if (pos.y > 245 && pos.y < 275) {
					menuState = 15;
				} else if (pos.y > 280 && pos.y < 310) {
					menuState = 16;
				}
			}
		} else if (menuState >= 18 && menuState <= 24) {
			//name enter screen
			menuState = 18;
			if (pos.y > 10 && pos.y < 45 && pos.x > 20 && pos.x < 160) {
				menuState = 19;
			} else if (pos.y > 125 && pos.y < 360) {
				if (pos.x > 160 && pos.x < 280) {
					menuState = 20;
				} else if (pos.x > 280 && pos.x < 400) {
					menuState = 21;
				} else if (pos.x > 400 && pos.x < 520) {
					menuState = 22;
				} else if (pos.x > 520 && pos.x < 640) {
					menuState = 23;
				}
			} else if (pos.y > 510 && pos.y < 575 && pos.x > 250 && pos.x < 550) {
				menuState = 24;
			}
		}
	}
};

document.onmousedown = (e) => {
	e = window.event || e;
	e.preventDefault();
	const rect = mCanvas.getBoundingClientRect();
	const pos = new Vec(e.clientX - rect.left, e.clientY - rect.top);

	if (!audioContext) {
		initAudio();
	}

	if (!playing && pos.x > 0 && pos.x < 800 && pos.y > 0 && pos.y < 600 && animationTick === 0) {
		if (menuState === 1) {
			startGame();
		} else if (menuState === 2) {
			getLeaderboard();
			menuScorePage = 0;
			menuState = 13;
		} else if (menuState === 3) {
			menuState = 6;
		} else if (menuState === 6) {
			menuState = 3;
		} else if (menuState === 4) {
			menuState = 9;
		} else if (menuState === 8) {
			menuState = 4;
		} else if (menuState === 9) {
			volume = (volume + 1) % 11;
		} else if (menuState === 10) {
			minimap = (minimap + 1) % 3;
		} else if (menuState === 11) {
			infiniteLives = !infiniteLives;
		} else if (menuState === 12) {
			if (pos.x > 470 && pos.x < 530 && pos.y > 540 && (menuScorePage + 1) * 10 < highscores.length) {
				menuScorePage++;
			} else if (pos.x > 270 && pos.x < 330 && pos.y > 540 && menuScorePage > 0) {
				menuScorePage--;
			}
		} else if (menuState === 13) {
			menuState = 2;
		} else if (menuState === 15) {
			menuState = 0;
			playing = true;
		} else if (menuState === 16) {
			playing = false;
			menuState = 17;
			menuTick = 0;
		} else if (menuState === 17) {
			if (infiniteLives || score === 0) {
				menuState = 1;
			} else {
				menuState = 20;
				name = "";
				nameVals = [0, 0, 0, 0];
				localScores = highscores.slice();
				const localObj = { score: score };
				localScores.push(localObj);
				localScores.sort((a, b) => {
					return b.score - a.score;
				});
				localIndex = localScores.indexOf(localObj);
			}
			menu();
		} else if (menuState === 19) {
			menuState = 1;
			menuTick = 0;
		} else if (menuState >= 20 && menuState <= 23) {
			if (pos.y < 200) {
				const nameIndex = menuState - 20;
				nameVals[nameIndex]--;
				if (nameVals[nameIndex] < 0) {
					nameVals[nameIndex] = charSet.length - 1;
				}
			} else if (pos.y > 240) {
				const nameIndex = menuState - 20;
				nameVals[nameIndex]++;
				if (nameVals[nameIndex] >= charSet.length) {
					nameVals[nameIndex] = 0;
				}
			}
		} else if (menuState === 24) {
			postScore(name, score);
			menuState = 1;
			menuTick = 0;
		}

		playSound(clickSound, 0.5, false);
	}

	if (animationTick > 120) {
		playSound(clickSound, 0.5, false);
		animationTick = 1080;
	}
};

const charSet = [
	"A",
	"B",
	"C",
	"D",
	"E",
	"F",
	"G",
	"H",
	"I",
	"J",
	"K",
	"L",
	"M",
	"N",
	"O",
	"P",
	"Q",
	"R",
	"S",
	"T",
	"U",
	"V",
	"W",
	"X",
	"Y",
	"Z",
	"·",
	"–",
];
