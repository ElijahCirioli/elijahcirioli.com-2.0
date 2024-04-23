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
	const useDarkMode = typeof window !== "undefined" && localStorage.getItem(darkModeSetting) === "true";
	const useReducedAnimation = false;
	return {
		useDarkMode,
		useReducedAnimation,
	};
}

export function setDarkMode(enabled: boolean) {
	const theme = enabled ? "dark-mode-" : "";
	const colors = ["light-green", "green", "dark-green", "light-gray", "gray", "dark-gray", "white", "black", "shadow", "highlight"];
	for (const color of colors) {
		document.documentElement.style.setProperty(`--theme-${color}-color`, `var(--${theme}${color}-color)`);
	}
	if (typeof window !== "undefined") {
		localStorage.setItem(darkModeSetting, enabled ? "true" : "false");
	}
}

export function setReducedAnimations(enabled: boolean) {}
