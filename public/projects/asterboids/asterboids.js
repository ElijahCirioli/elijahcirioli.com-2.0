const bCanvas = document.getElementById("backgroundCanvas"); //backgrounds
const bContext = bCanvas.getContext("2d", { alpha: false });

const mCanvas = document.getElementById("mainCanvas"); //main: ships, asteroids, menu
const mContext = mCanvas.getContext("2d");

const pCanvas = document.getElementById("particleCanvas"); //particles: explosions, bullets, exhaust, jump
const pContext = pCanvas.getContext("2d");

const hCanvas = document.getElementById("hudCanvas"); //hud: lives, freeze, map, score
const hContext = hCanvas.getContext("2d");

const fontExo2 = new FontFace("Exo 2", "url(/dependencies/fonts/Exo_2/Exo2-VariableFont_wght.ttf)");
const fontOrbitron = new FontFace("Orbitron", "url(/dependencies/fonts/Orbitron/Orbitron-VariableFont_wght.ttf)");
fontExo2.load().catch((e) => console.error("failed to load font", e));
fontOrbitron.load().catch((e) => console.error("failed to load font", e));
document.fonts.add(fontExo2);
document.fonts.add(fontOrbitron);

const screenBounds = new Vec(1400, 1400); //the width and height of the playfield
let shaking; //screen shake
let frozen; //time slowing down
let playing = false;
let lastTime;
let detlaTime;

let p; //the player
let c; //the camera
let d; //the director
let powerup;

//arrays
let explosionParticles = [];
let trailParticles = [];
let asteroids = [];
let boids = [];
let text = [];

//settings
let minimap = 1;
let volume = 7;
let infiniteLives = false;

//score variables
let score;
let highscores = [];
let asteroidsKilled;
let boidsKilled;

//boids motherships positioned off screen to generate shield
const boidMotherships = [
	{
		pos: new Vec(-300, 300),
		dir: 2.1,
		lines: [new Vec(-48, 480), new Vec(-48, 270), new Vec(-48, 380), new Vec(-48, 650)],
	},
	{ pos: new Vec(1730, 900), dir: -1.35, lines: [new Vec(1448, 970), new Vec(1448, 680), new Vec(1448, 850)] },
	{ pos: new Vec(1050, -280), dir: 3.3, lines: [new Vec(990, -48), new Vec(1200, -48), new Vec(900, -48)] },
];

const setup = () => {
	const center = new Vec(screenBounds.x / 2, screenBounds.y / 2);
	p = new Player(center.x, center.y, -Math.PI / 2);
	c = new Camera(center.x, center.y);
	d = new Director(0);
	p.spawn();

	explosionParticles = [];
	trailParticles = [];
	asteroids = [];
	boids = [];
	text = [];

	score = 0;
	boidsKilled = 0;
	asteroidsKilled = 0;
	powerup = undefined;

	shaking = 0;
	frozen = false;
	playing = true;
	lastTime = Date.now();

	setupAsteroidImages();
	requestAnimationFrame(update);
};

const update = () => {
	deltaTime = Date.now() - lastTime;
	lastTime = Date.now();
	if (playing) {
		p.update(); //move player
		boids.forEach((b) => {
			b.update(); //move all boids
		});
		asteroids.forEach((a) => {
			a.move(); //move all asteroids
		});
		if (powerup) {
			powerup.update(); //test if powerup has been collected
		}
		d.update(); //update director and difficulty
	}
	c.update(); //draw scene
	drawHud(); //draw hud
	if (menuState >= 14 && menuState <= 17) {
		drawMenu(); //self-explanatory
	}
	if (playing || (menuState >= 14 && menuState <= 17)) {
		requestAnimationFrame(update);
	}
};

const getDistance = (v1, v2) => {
	return Math.sqrt(getSquareDistance(v1, v2));
};

const getSquareDistance = (v1, v2) => {
	return (v1.x - v2.x) * (v1.x - v2.x) + (v1.y - v2.y) * (v1.y - v2.y);
};

const detectCollision = (obj) => {
	for (const a of asteroids) {
		const sqrDist = getSquareDistance(obj.pos, a.pos);
		const sqrRad = (a.size * a.radScale + obj.hBoxRad) * (a.size * a.radScale + obj.hBoxRad);

		if (sqrDist < sqrRad) {
			if (obj instanceof Bullet || obj instanceof Boss) {
				//bullet or boss hit asteroid
				if (a.size === 3) {
					shaking = 20;
				} else {
					shaking = 15;
				}
				a.mitosis();
				explosion(a.pos, a.size * a.radScale);
				if (obj instanceof Boss) {
					obj.hurt(4);
				}
				text.push({ amt: 30 * a.size * d.multiplier, dur: 80, pos: new Vec(a.pos.x, a.pos.y + 7) });
				score += 30 * d.multiplier * a.size;
			}
			return true;
		}
	}
	for (const b of boids) {
		if (b !== obj) {
			const sqrDist = getSquareDistance(obj.pos, b.pos);
			const sqrRad = (b.hBoxRad + obj.hBoxRad) * (b.hBoxRad + obj.hBoxRad);
			if (sqrDist < sqrRad) {
				shaking = 10;
				if (obj instanceof Bullet) {
					//hit boid with bullet
					if (b instanceof Boid) {
						//hit boid
						if (b.type === 0) {
							b.death();
							text.push({ amt: 20 * d.multiplier, dur: 80, pos: new Vec(b.pos.x, b.pos.y + 7) });
							score += 20 * d.multiplier;
						} else if (b.type === 1) {
							b.split();
						} else if (b.type === 2) {
							b.explode();
							text.push({ amt: 40 * d.multiplier, dur: 80, pos: new Vec(b.pos.x, b.pos.y + 7) });
							score += 40 * d.multiplier;
						}
					} else {
						//hit boss
						if (p.bullets.includes(obj)) {
							b.hurt(1);
							explosion(obj.pos, 7);
						} else {
							b.hurt(0.13);
							if (Math.random() < 0.1) {
								explosion(obj.pos, 30);
							}
						}
					}
				}
				if (obj instanceof Boss) {
					//boid collide into boss
					obj.hurt(5);
					b.death();
					text.push({ amt: 10 * d.multiplier, dur: 80, pos: new Vec(b.pos.x, b.pos.y + 7) });
					score += 10 * d.multiplier;
				}
				if (obj === p && p.vulnerable < 1) {
					//player collide into boids
					if (b instanceof Boid) {
						b.death();
					} else {
						b.hurt(5);
					}
				}
				return true;
			}
		}
	}
	if (obj instanceof Bullet && !p.bullets.includes(obj)) {
		//boss laser
		const sqrDist = getSquareDistance(obj.pos, p.pos);
		const sqrRad = (p.hBoxRad + obj.hBoxRad) * (p.hBoxRad + obj.hBoxRad);
		if (sqrDist < sqrRad && p.vulnerable === 0 && p.controllable) {
			p.death();
			return true;
		}
	}
	return false;
};

//key variables
let thrusting = false;
let turningLeft = false;
let turningRight = false;
let charging = false;
let shooting = false;
let shootThread;

//key presses
document.onkeydown = (e) => {
	e = window.event || e;
	const key = e.keyCode;
	e.preventDefault();

	if (!audioContext) {
		initAudio();
	}

	if (playing) {
		//if in game
		if (key === 37) {
			//left arrow key
			turningLeft = true;
		}
		if (key === 39) {
			//right arrow key
			turningRight = true;
		}
		if (key === 38) {
			//up arrow key
			if (!thrusting && p.controllable) {
				thrustSource = playSound(thrustSound, 0.7, true);
			}
			thrusting = true;
		}
		if (key === 40) {
			//down arrow key
			if (!charging) {
				p.jumpCharge = 0;
				if (thrustSource) {
					thrustSource.stop(0);
				}
			}
			charging = true;
		}
		if (key === 32) {
			//spacebar
			if (!shooting && p.controllable) {
				shooting = true;

				if (p.powerups.filter((pu) => pu.type === "laser").length === 0) {
					p.shoot();
					shootThread = setInterval(function () {
						p.shoot();
					}, 110);
				}
			}
		}
		if (key === 27) {
			//escape key
			playing = false;
			menuState = 15;
			thrusting = false;
			turningLeft = false;
			turningRight = false;
			charging = false;
			shooting = false;
			if (shootThread) {
				clearInterval(shootThread);
			}
			if (laserSource) {
				laserSource.stop(0);
			}
			if (thrustSource) {
				thrustSource.stop(0);
			}
			if (bossLaserSource) {
				bossLaserSource.stop(0);
			}
			menuTick = 0;
		}
	} else {
		if (animationTick > 120) {
			playSound(clickSound, 0.5, false);
			animationTick = 1080;
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
			return;
		}
		//menu
		if (key === 37) {
			//left arrow key
			if (menuState === 9) {
				volume--;
				if (volume < 0) {
					volume = 10;
				}
			} else if (menuState === 10) {
				minimap--;
				if (minimap < 0) {
					minimap = 2;
				}
			} else if (menuState === 11) {
				infiniteLives = !infiniteLives;
			} else if (menuState === 12) {
				menuState = 13;
			} else if (menuState >= 20) {
				menuState--;
			} else if (menuState === 18) {
				menuState = 23;
			}
		}
		if (key === 39) {
			//right arrow key
			if (menuState === 9) {
				volume = (volume + 1) % 11;
			} else if (menuState === 10) {
				minimap = (minimap + 1) % 3;
			} else if (menuState === 11) {
				infiniteLives = !infiniteLives;
			} else if (menuState === 13) {
				menuState = 12;
			} else if (menuState === 18) {
				menuState = 20;
			} else if (menuState <= 23) {
				menuState++;
			}
		}
		if (key === 38) {
			//up arrow key
			if (menuState > 1 && menuState < 5) {
				menuState--;
			}
			if (menuState > 8 && menuState < 12) {
				menuState--;
			}
			if (menuState === 0) {
				menuState = 4;
			} else if (menuState === 5) {
				menuState = 6;
			} else if (menuState === 7) {
				menuState = 11;
			} else if (menuState === 12) {
				if (menuScorePage > 0) {
					menuScorePage--;
				} else {
					menuState = 13;
				}
			} else if (menuState === 16) {
				menuState = 15;
			} else if (menuState >= 20 && menuState <= 23) {
				const nameIndex = menuState - 20;
				nameVals[nameIndex]--;
				if (nameVals[nameIndex] < 0) {
					nameVals[nameIndex] = charSet.length - 1;
				}
			} else if (menuState === 18) {
				menuState = 24;
			} else if (menuState === 24) {
				menuState = 23;
			}
		}
		if (key === 40) {
			//down arrow key
			if (menuState < 4) {
				menuState++;
			}
			if (menuState > 6 && menuState < 11) {
				menuState++;
			}
			if (menuState === 5) {
				menuState = 6;
			} else if (menuState === 12 && (menuScorePage + 1) * 10 < highscores.length) {
				menuScorePage++;
			} else if (menuState === 13) {
				menuState = 12;
			} else if (menuState === 15) {
				menuState = 16;
			} else if (menuState >= 20 && menuState <= 23) {
				const nameIndex = menuState - 20;
				nameVals[nameIndex]++;
				if (nameVals[nameIndex] >= charSet.length) {
					nameVals[nameIndex] = 0;
				}
			} else if (menuState === 18) {
				menuState = 19;
			} else if (menuState === 19) {
				menuState = 20;
			}
		}
		if (key === 32 || key === 13) {
			if (animationTick === 0) {
				playSound(clickSound, 0.5, false);
				//spacebar or enter
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
				} else if (menuState === 13) {
					menuState = 2;
				} else if (menuState === 15) {
					menuState = 0;
					playing = true;
				} else if (menuState === 16) {
					playing = false;
					menuState = 17;
					menuTick = 0;
				} else if (menuState === 19) {
					menuState = 1;
					menuTick = 0;
				} else if (menuState <= 23) {
					menuState++;
				} else if (menuState === 24) {
					postScore(name, score);
					menuState = 1;
					menuTick = 0;
				}
			}
		}
		if (key === 27) {
			//escape key
			if (menuState >= 14 && menuState <= 16) {
				playing = true;
				menuState = 0;
			} else if (menuState >= 18 && menuState <= 24) {
				menuState = 1;
				menuTick = 0;
			}
		}
		if (menuState === 18 || (menuState >= 20 && menuState <= 23)) {
			if (key >= 65 && key <= 90) {
				if (menuState === 18) {
					menuState = 20;
				}
				nameVals[menuState - 20] = key - 65;
				menuState++;
			}
			if (key === 189) {
				if (menuState === 18) {
					menuState = 20;
				}
				nameVals[menuState - 20] = 27;
				menuState++;
			}
			if (key === 190) {
				if (menuState === 18) {
					menuState = 20;
				}
				nameVals[menuState - 20] = 26;
				menuState++;
			}
		}
	}
};

//key releases
document.onkeyup = (e) => {
	e = window.event || e;
	const key = e.keyCode;
	e.preventDefault();

	if (playing) {
		if (key === 37) {
			//left arrow key
			turningLeft = false;
		}
		if (key === 39) {
			//right arrow key
			turningRight = false;
		}
		if (key === 38) {
			//up arrow key
			thrusting = false;
			if (thrustSource) {
				thrustSource.stop(0);
			}
		}
		if (key === 40) {
			//down arrow key
			if (p.jumpCharge > 30) {
				p.jump();
				playSound(jumpSound, 0.85, false);
			}
			charging = false;
		}
		if (key === 32) {
			//spacebar
			if (p.powerups.filter((pu) => pu.type === "laser").length === 0) {
				shooting = false;
			}
			clearInterval(shootThread);
		}
	}
};

//ship images
const sImg = new Image();
sImg.src = "./art/shipImage.png";
const bImg = new Image();
bImg.src = "./art/bulletImage.png";

//boid images
const boImg = new Image();
boImg.src = "./art/boidImage.png";
const bobImg = new Image();
bobImg.src = "./art/bombBoidImage.png";
const bosImg = new Image();
bosImg.src = "./art/splitterBoidImage.png";

//powerup images
const icImg = new Image();
icImg.src = "./art/iceImage.png";
const shImg = new Image();
shImg.src = "./art/shieldImage.png";
const laImg = new Image();
laImg.src = "./art/laserImage.png";
const elImg = new Image();
elImg.src = "./art/extraLifeImage.png";

//background images
const bl1Img = new Image();
bl1Img.src = "./art/bgLayer1.png";
const bl2Img = new Image();
bl2Img.src = "./art/bgLayer2.png";
const bl3Img = new Image();
bl3Img.src = "./art/bgLayer3.png";
const bl4Img = new Image();
bl4Img.src = "./art/bgLayer4.png";
const bvImg = new Image();
bvImg.src = "./art/borderVertical.png";
const bhImg = new Image();
bhImg.src = "./art/borderHorizontal.png";

//mothership images
const mosImg = new Image();
mosImg.src = "./art/mothershipImage.png";
const mobImg = new Image();
mobImg.src = "./art/boidMothershipImage.png";

//hud images
const fr1Img = new Image();
fr1Img.src = "./art/freezeLayer1.png";
const fr2Img = new Image();
fr2Img.src = "./art/freezeLayer2.png";
const liImg = new Image();
liImg.src = "./art/lifeIndicator.png";
const biImg = new Image();
biImg.src = "./art/boidIndicator.png";
const siImg = new Image();
siImg.src = "./art/scoreIndicator.png";
const hbImg = new Image();
hbImg.src = "./art/healthBar.png";

//menu images
const meImg = new Image();
meImg.src = "./art/menuImage.png";
const ssImg = new Image();
ssImg.src = "./art/scrollingStars.png";
const tiImg = new Image();
tiImg.src = "./art/titleImage.png";
const heImg = new Image();
heImg.src = "./art/helpImage.png";
const smImg = new Image();
smImg.src = "./art/starMenuImage.png";
const pbImg = new Image();
pbImg.src = "./art/pauseBackground.png";
const dsbImg = new Image();
dsbImg.src = "./art/deathScreenBackground.png";

//sounds
let audioContext, bufferLoader;
let clickSound, shootSound, thrustSound, laserSound, jumpSound, explosionSound1, explosionSound2, explosionSound3;
let thrustSource, laserSource, bossLaserSource;
let explosionSounds = [];

const initAudio = () => {
	try {
		window.AudioContext = window.AudioContext || window.webkitAudioContext;
		audioContext = new AudioContext();

		bufferLoader = new BufferLoader(
			audioContext,
			[
				"./sounds/click.mp3",
				"./sounds/shoot.mp3",
				"./sounds/thrust.mp3",
				"./sounds/laser.mp3",
				"./sounds/jump.mp3",
				"./sounds/explosion_1.mp3",
				"./sounds/explosion_2.mp3",
				"./sounds/explosion_3.mp3",
			],
			(bufferList) => {
				clickSound = bufferList[0];
				shootSound = bufferList[1];
				thrustSound = bufferList[2];
				laserSound = bufferList[3];
				jumpSound = bufferList[4];
				explosionSound1 = bufferList[5];
				explosionSound2 = bufferList[6];
				explosionSound3 = bufferList[7];
				explosionSounds = [explosionSound1, explosionSound2, explosionSound3];
			}
		);

		bufferLoader.load();
	} catch (e) {
		console.log("Audio context is not supported by your browser");
	}
};

const playSound = (buffer, vol, loop) => {
	const source = audioContext.createBufferSource();
	source.buffer = buffer;
	source.loop = loop;
	const gainNode = audioContext.createGain();
	source.connect(gainNode);
	gainNode.connect(audioContext.destination);
	gainNode.gain.value = (vol * volume) / 10;
	source.start(0);
	return source;
};
initAudio();

let asteroidImages = [
	[[], []],
	[[], []],
	[[], []],
	[[], []],
];
const setupAsteroidImages = () => {
	for (let i = 0; i < 4; i++) {
		const img3 = new Image();
		img3.src = "./art/asteroidImages/" + i + "/" + i + ".png";
		asteroidImages[i].push(img3);
		for (let j = 0; j < 2; j++) {
			for (let k = 0; k < 2; k++) {
				const img1 = new Image();
				img1.src = "./art/asteroidImages/" + i + "/" + i + "" + j + "" + k + ".png";
				asteroidImages[i][j][k] = img1;
			}
			const img2 = new Image();
			img2.src = "./art/asteroidImages/" + i + "/" + i + "" + j + ".png";
			asteroidImages[i][j].push(img2);
		}
	}
};

window.onload = menu;
