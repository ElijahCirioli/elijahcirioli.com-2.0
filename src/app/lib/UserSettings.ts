const darkModeSetting = "ec-use-dark-mode";
const reducedAnimationsSetting = "ec-use-reduced-animations";

export interface UserSettings {
	useDarkMode: boolean;
	useReducedAnimations: boolean;
}

export function defaultUserSettings(): UserSettings {
	return {
		useDarkMode: false,
		useReducedAnimations: window && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
	};
}

export function loadUserSettings(): UserSettings {
	const useDarkMode = typeof window !== "undefined" && localStorage.getItem(darkModeSetting) === "true";
	const useReducedAnimations =
		typeof window !== "undefined" && localStorage.getItem(reducedAnimationsSetting) === "true";
	return {
		useDarkMode,
		useReducedAnimations,
	};
}

export function setDarkMode(enabled: boolean) {
	const theme = enabled ? "dark-mode-" : "";
	const colors = [
		"light-green",
		"green",
		"dark-green",
		"darker-green",
		"light-gray",
		"gray",
		"dark-gray",
		"white",
		"black",
		"shadow",
		"highlight",
		"link",
		"visited-link",
	];
	for (const color of colors) {
		document.documentElement.style.setProperty(`--theme-${color}-color`, `var(--${theme}${color}-color)`);
	}
	if (enabled) {
		document.documentElement.classList.add("globalDarkMode");
	} else {
		document.documentElement.classList.remove("globalDarkMode");
	}

	if (typeof window !== "undefined") {
		localStorage.setItem(darkModeSetting, enabled ? "true" : "false");
	}
}

export function setReducedAnimations(enabled: boolean) {
	if (enabled) {
		document.body.classList.add("reducedAnimations");
	} else {
		document.body.classList.remove("reducedAnimations");
	}
	if (typeof window !== "undefined") {
		localStorage.setItem(reducedAnimationsSetting, enabled ? "true" : "false");
	}
}
