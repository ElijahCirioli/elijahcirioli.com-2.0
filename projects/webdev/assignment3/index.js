/*
 * Add your JavaScript to this file to complete the assignment.  Don't forget
 * to add your name and @oregonstate email address below.
 *
 * Name: Elijah Cirioli
 * Email: ciriolie@oregonstate.edu
 */
const twits = []; //all of the twits, not just those being displayed

//define Twit class
class Twit {
	constructor(text, author) {
		this.text = text;
		this.author = author;
	}
}

//import existing twits from the DOM
const loadExistingTwits = () => {
	const arr = document.getElementsByClassName("twit");
	for (const node of arr) {
		const text = node.querySelector(".twit-text").textContent.trim(); //get body text and remove new line
		const author = node.querySelector(".twit-author a").textContent.trim(); //get author text
		if (text && author) twits.push(new Twit(text, author)); //push to array
	}
};

//post a single twit to the DOM
const createSingleTwit = (twit) => {
	//total container
	const container = document.createElement("article");
	container.classList.add("twit");

	//bullhorn icon
	const twitIcon = document.createElement("div");
	twitIcon.classList.add("twit-icon");
	twitIcon.innerHTML = "<i class='fas fa-bullhorn'></i>";
	container.appendChild(twitIcon);

	//content container
	const twitContent = document.createElement("div");
	twitContent.classList.add("twit-content");
	container.appendChild(twitContent);

	//the text content
	const twitText = document.createElement("p");
	twitText.classList.add("twit-text");
	twitText.textContent = twit.text;
	twitContent.appendChild(twitText);

	//the author content
	const twitAuthor = document.createElement("p");
	twitAuthor.classList.add("twit-author");
	twitContent.appendChild(twitAuthor);

	const authorLink = document.createElement("a");
	authorLink.href = "#";
	authorLink.textContent = twit.author;
	twitAuthor.appendChild(authorLink);

	//add it to the DOM
	document.querySelector(".twit-container").append(container);
	closeModal();
};

//post every twit to the DOM
const createAllTwits = () => {
	for (const twit of twits) {
		createSingleTwit(twit);
	}
};

//make sure a twit is able to be posted
const validateTwit = () => {
	const text = document.getElementById("twit-text-input").value.trim();
	const author = document.getElementById("twit-attribution-input").value.trim();

	//make sure fields aren't empty
	if (text.length === 0 || author.length === 0) {
		alert("Fields cannot be left blank.");
		return;
	}

	//post it
	const twit = new Twit(text, author);
	twits.push(twit);
	createSingleTwit(twit);
};

//open the new twit screen
const openModal = () => {
	document.getElementById("modal-backdrop").classList.remove("hidden");
	document.getElementById("create-twit-modal").classList.remove("hidden");
};

//close the new twit screen
const closeModal = () => {
	//empty data
	document.getElementById("twit-text-input").value = "";
	document.getElementById("twit-attribution-input").value = "";
	//hide modal
	document.getElementById("modal-backdrop").classList.add("hidden");
	document.getElementById("create-twit-modal").classList.add("hidden");
};

//remove all twits from the DOM
const removeTwits = () => {
	const container = document.querySelector(".twit-container");
	while (container.firstChild) {
		container.removeChild(container.firstChild);
	}
};

//update which twits are displayed based on seatch term
const updateSearch = () => {
	//get the actual query
	const query = document.getElementById("navbar-search-input").value.trim().toLowerCase();

	removeTwits(); //remove all twits from DOM
	//if the search box is empty
	if (query.length === 0) {
		createAllTwits(); //display everything
		return;
	}
	//display all matching twits
	for (const twit of twits) {
		if (twit.text.toLowerCase().includes(query) || twit.author.toLowerCase().includes(query)) {
			createSingleTwit(twit);
		}
	}
};

//setup event listeners for all buttons
const setupButtonActions = () => {
	document.getElementById("create-twit-button").addEventListener("click", openModal);
	document.querySelector(".modal-cancel-button").addEventListener("click", closeModal);
	document.querySelector(".modal-close-button").addEventListener("click", closeModal);
	document.querySelector(".modal-accept-button").addEventListener("click", validateTwit);
	document.getElementById("navbar-search-input").addEventListener("input", updateSearch);
};

document.body.onload = () => {
	loadExistingTwits(); //import twits from index.html
	setupButtonActions(); //what it says on the tin
};
