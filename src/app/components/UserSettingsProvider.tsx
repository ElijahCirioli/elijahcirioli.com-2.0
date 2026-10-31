"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface UserSettings {
	darkMode: boolean;
	reducedAnimations: boolean;
	setDarkMode(enabled: boolean): void;
	setReducedAnimations(enabled: boolean): void;
}

const UserSettingsContext = createContext<UserSettings | null>(null);

const UserSettingsProvider: React.FC<{
	children: React.ReactNode;
}> = ({ children }) => {
	const [darkMode, setDarkModeState] = useState(false);
	const [reducedAnimations, setReducedAnimationsState] = useState(false);

	const darkModeSetting = "ec-use-dark-mode";
	const reducedAnimationsSetting = "ec-use-reduced-animations";

	function setDarkMode(enabled: boolean) {
		if (typeof window !== "undefined") {
			document.documentElement.setAttribute("data-theme", enabled ? "dark" : "light");
			if (enabled) {
				document.documentElement.classList.add("globalDarkMode");
			} else {
				document.documentElement.classList.remove("globalDarkMode");
			}
			localStorage.setItem(darkModeSetting, enabled ? "true" : "false");
		}

		setDarkModeState(enabled);
	}

	function setReducedAnimations(enabled: boolean) {
		if (typeof window !== "undefined") {
			if (enabled) {
				document.body.classList.add("reducedAnimations");
			} else {
				document.body.classList.remove("reducedAnimations");
			}
			localStorage.setItem(reducedAnimationsSetting, enabled ? "true" : "false");
		}

		setReducedAnimationsState(enabled);
	}

	useEffect(() => {
		if (typeof window === "undefined") {
			return;
		}

		// Apply saved settings
		// eslint-disable-next-line react-hooks/set-state-in-effect
		setDarkMode(localStorage.getItem(darkModeSetting) === "true");
		setReducedAnimations(
			localStorage.getItem(reducedAnimationsSetting) === "true" ||
				(localStorage.getItem(reducedAnimationsSetting) === null &&
					window.matchMedia("(prefers-reduced-motion: reduce)").matches)
		);
	}, []);

	return (
		<UserSettingsContext value={{ darkMode, reducedAnimations, setDarkMode, setReducedAnimations }}>
			{children}
		</UserSettingsContext>
	);
};

export function useDarkMode(): { darkMode: boolean; setDarkMode(enabled: boolean): void } {
	const context = useContext(UserSettingsContext);
	if (!context) {
		throw new Error("useDarkMode must be used within UserSettingsContext");
	}
	return context;
}

export function useReducedAnimations(): { reducedAnimations: boolean; setReducedAnimations(enabled: boolean): void } {
	const context = useContext(UserSettingsContext);
	if (!context) {
		throw new Error("useReducedAnimations must be used within UserSettingsContext");
	}
	return context;
}

export default UserSettingsProvider;
