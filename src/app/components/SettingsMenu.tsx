"use client";

import { useEffect, useState } from "react";
import styles from "./SettingsMenu.module.css";
import { UserSettings, defaultUserSettings, loadUserSettings } from "../lib/UserSettings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faMoon, faSun, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import SettingsMenuItem from "./SettingsMenuItem";

interface SettingsMenuState {
	isOpen: boolean;
	userSettings: UserSettings;
}

const SettingsMenu: React.FC<{}> = () => {
	const initialState = (): SettingsMenuState => {
		return {
			isOpen: false,
			userSettings: defaultUserSettings(),
		};
	};

	const [menuState, setMenuState] = useState<SettingsMenuState>(initialState());

	useEffect(() => {
		setMenuState({
			isOpen: false,
			userSettings: loadUserSettings(),
		});
	}, []);

	const toggleCollapse = () => {
		setMenuState({
			...menuState,
			isOpen: !menuState.isOpen,
		});
	};

	const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
		// ignore blur events when child has focus
		if (e.currentTarget.contains(e.relatedTarget)) {
			return;
		}

		setMenuState({
			...menuState,
			isOpen: false,
		});
	};

	const toggleDarkMode = () => {
		const colors = ["light-green", "green", "dark-green", "light-gray", "gray", "dark-gray", "white", "black", "shadow", "highlight"];
		const theme = menuState.userSettings.useDarkMode ? "light" : "dark";
		for (const color of colors) {
			document.documentElement.style.setProperty(`--${color}-color`, `var(--${theme}-mode-${color}-color)`);
		}
		setMenuState({
			...menuState,
			userSettings: {
				...menuState.userSettings,
				useDarkMode: !menuState.userSettings.useDarkMode,
			},
		});
	};

	const toggleReducedAnimations = () => {
		setMenuState({
			...menuState,
			userSettings: {
				...menuState.userSettings,
				useReducedAnimation: !menuState.userSettings.useReducedAnimation,
			},
		});
	};

	return (
		<div id={styles.menu} onBlur={handleBlur}>
			<button onClick={toggleCollapse} className={menuState.isOpen ? styles.buttonColorsActive : styles.buttonColors}>
				<FontAwesomeIcon icon={faGear} />
			</button>
			<div className={styles.connectingLine} style={{ height: `${menuState.isOpen ? 95 : 0}px`, opacity: menuState.isOpen ? 1 : 0 }}></div>
			<SettingsMenuItem
				index={0}
				text={`Enable ${menuState.userSettings.useDarkMode ? "light" : "dark"} mode`}
				icon={menuState.userSettings.useDarkMode ? faSun : faMoon}
				visible={menuState.isOpen}
				updateSetting={toggleDarkMode}
			/>
			<SettingsMenuItem
				index={1}
				text={`${menuState.userSettings.useReducedAnimation ? "Enable" : "Reduce"} animations`}
				icon={menuState.userSettings.useReducedAnimation ? faEye : faEyeSlash}
				visible={menuState.isOpen}
				updateSetting={toggleReducedAnimations}
			/>
		</div>
	);
};

export default SettingsMenu;
