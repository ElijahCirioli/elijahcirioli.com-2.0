/*************************************************
 * This is not a very secure database but also
 * it only holds information about chess games.
 * I know you could easily grief it but I urge
 * you not to. I don't want to force my users
 * to create accounts and stuff. Thanks :)
 *************************************************/

const database = firebase.database();

//listen to see the past winners
const updateWinHistory = () => {
	endListener();
	//should we go to the new game when it starts
	const jump = gameNumber === undefined || gameNumber === maxGameNumber;

	database.ref("/win-history/").on("value", (snapshot) => {
		if (snapshot.exists()) {
			winHistory = snapshot.val();
			//get the number for our current game
			maxGameNumber = winHistory.length;
		} else {
			//we have no games stored in the history
			maxGameNumber = 0;
		}
		if (jump) gameNumber = maxGameNumber;
		startListener();
	});
};

//listen for changes within our specific game
const startListener = () => {
	endListener();
	//should we jump to the next available turn
	const jump = turnNumber === undefined || turnNumber === maxTurnNumber;
	let resign = false;

	if (gameNumber === undefined) return; //we don't know what we're actually looking for

	listener = database.ref(`/games/${gameNumber}/`).on("value", (snapshot) => {
		if (snapshot.exists()) {
			const game = snapshot.val();

			//show alert icon
			if (game.length - 1 > maxTurnNumber && gameNumber === maxGameNumber) {
				$("#new-icon").css("color", "#fac446");
				$("#new-icon").show();
				setTimeout(() => {
					$("#new-icon").css("color", "#ebebeb");
				}, 1000);
			}
			//update variables
			maxTurnNumber = game.length - 1;
			if (jump) turnNumber = maxTurnNumber;

			const frame = game[turnNumber];
			pieces = frame.pieces;
			turn = frame.turn;
			lastMove = frame.lastMove;
			viewDate = frame.date ? frame.date : getDateString();
			resign = frame.resign;
		} else {
			//default everything
			turnNumber = 0;
			maxTurnNumber = 0;
			viewDate = getDateString();
			defaultSetup();
			postData(false);
		}
		populateBoard();
		//check if the other person resigned
		if (resign) {
			const winnerColor = turn === "white" ? "black" : "white";
			displayWinner(winnerColor, true);
		}
	});
};

//stop listening
const endListener = () => {
	if (listener) {
		database.ref(`/games/${gameNumber}/`).off("value", listener);
		listener = undefined;
	}
};

//post a frame to the databse
const postData = (resign) => {
	if (turnNumber === undefined) turnNumber = 0;
	const date = getDateString();
	database.ref(`/games/${gameNumber}/${turnNumber + 1}/`).set({
		pieces: pieces,
		turn: turn,
		lastMove: lastMove,
		date: date,
		resign: resign,
	});
};

//post a win to the history
const postWin = (winner) => {
	let updates = {};
	updates[`${gameNumber}/`] = winner;
	database.ref("win-history").update(updates);
};

//create a json list of pieces
const createPieceList = () => {
	pieces = [];
	for (let y = 0; y < 8; y++) {
		for (let x = 0; x < 8; x++) {
			const p = board[y][x];
			if (p instanceof Piece) {
				pieces.push({ x: p.x, y: p.y, color: p.color, type: p.type, hasMoved: p.hasMoved });
			}
		}
	}
};

//return the date in Month/Day/Year
const getDateString = () => {
	const d = new Date();
	const str = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
	return str;
};

$((ready) => {
	updateWinHistory();
});
