const darkModeSetting = "ec-use-dark-mode";
const reducedAnimationsSetting = "ec-use-reduced-animations";

export interface UserSettings {
	useDarkMode: boolean;
	useReducedAnimation: boolean;
}

export function defaultUserSettings(): UserSettings {
	return {
		useDarkMode: false,
		useReducedAnimation: false,
	};
}

export function loadUserSettings(): UserSettings {
	console.log("loading settings");
	const useDarkMode = window.localStorage.getItem(darkModeSetting) === "true";
	const useReducedAnimation = false;
	return {
		useDarkMode,
		useReducedAnimation,
	};
}

export function setDarkMode(enabled: boolean) {
	// window.localStorage.setItem(darkModeSetting, enabled ? "true" : "false");
}

export function setReducedAnimations(enabled: boolean) {}
