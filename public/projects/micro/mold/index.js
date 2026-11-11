const canvas = document.getElementById("mold-canvas");
const context = canvas.getContext("2d");

let agents;
// parameters
let numAgents, spawnRadius, sensorAngle, sensorOffset, speed, agentColor, angleVariance;

class Agent {
	constructor(x, y, dir) {
		this.x = x;
		this.y = y;
		this.dir = dir;
		this.depositTrail();
	}

	move() {
		const newX = this.x + Math.cos(this.dir) * speed;
		const newY = this.y + Math.sin(this.dir) * speed;

		if (inBounds(newX, newY)) {
			this.x = newX;
			this.y = newY;
		} else {
			this.dir = Math.random() * Math.PI * 2;
		}
		this.depositTrail();
	}

	adjustAngle() {
		const left = this.sampleAngle(-sensorAngle);
		const right = this.sampleAngle(sensorAngle);
		const front = this.sampleAngle(0);

		if (front > right && front > left) {
			return;
		}
		if (front < right && front < left) {
			this.dir += Math.random() * 2 * angleVariance - angleVariance;
		} else if (left < right) {
			this.dir += Math.random() * angleVariance;
		} else if (right < left) {
			this.dir -= Math.random() * angleVariance;
		}
	}

	sampleAngle(offsetAngle) {
		const angle = this.dir + offsetAngle;
		const x = Math.round(this.x + Math.cos(angle) * sensorOffset);
		const y = Math.round(this.y + Math.sin(angle) * sensorOffset);

		if (inBounds(x, y)) {
			return context.getImageData(x, y, 1, 1).data[0];
		} else {
			return 0;
		}
	}

	depositTrail() {
		context.fillStyle = agentColor;
		context.fillRect(this.x, this.y, 3, 3);
	}
}

function randomizeParameters() {
	numAgents = Math.ceil(Math.random() * 1000) + 300;
	spawnRadius = Math.random() * 200 + 40;
	speed = Math.random() + 0.2;
	agentColor = `rgba(${Math.floor(Math.random() * 156) + 100}, ${Math.floor(Math.random() * 156) + 100}, ${
		Math.floor(Math.random() * 156) + 100
	}, ${Math.random()})`;
	sensorAngle = (Math.random() * Math.PI) / 2;
	angleVariance = (Math.random() * Math.PI) / 4;
	sensorOffset = Math.random() * 10;
}

function createSimulation() {
	// randomize simulation parameters
	randomizeParameters();

	// draw background
	context.fillStyle = "black";
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.fillRect(0, 0, canvas.width, canvas.height);

	// create agents
	agents = [];
	const centerX = canvas.width / 2;
	const centerY = canvas.height / 2;
	for (let i = 0; i < numAgents; i++) {
		const angle = Math.random() * Math.PI * 2;
		const radius = Math.random() * spawnRadius;
		const x = radius * Math.cos(angle) + centerX;
		const y = radius * Math.sin(angle) + centerY;
		const dir = Math.random() * Math.PI * 2;

		agents.push(new Agent(x, y, dir));
	}
}

function tick() {
	for (const a of agents) {
		a.move();
	}

	diffuse();

	for (const a of agents) {
		a.adjustAngle();
	}

	requestAnimationFrame(tick);
}

function diffuse() {
	// fast blur taken from https://github.com/flozz/StackBlur
	StackBlur.canvasRGB(canvas, 0, 0, canvas.width, canvas.height, 1);
}

function inBounds(x, y) {
	return x >= 0 && y >= 0 && x < canvas.width && y < canvas.height;
}

canvas.onclick = (e) => {
	createSimulation();
};

window.onload = () => {
	createSimulation();
	requestAnimationFrame(tick);
};
