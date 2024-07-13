window.onload = () => {
	document.getElementById("name-header").style.opacity = "1";
	// Test for mobile
	if (/Android|webOS|iPhone|iPad|Mac|Macintosh|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
		document.getElementById("name-header").style.top = "32px";
	} else {
		document.getElementById("name-header").style.top = "50px";
	}
	const carousel = document.getElementById("carousel-wrap");
	carousel.scrollLeft = carousel.scrollWidth - carousel.clientWidth;
};
