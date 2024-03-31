"use client";

import { useState } from "react";
import styles from "./SettingsMenu.module.css";
import { UserSettings, loadUserSettings } from "../lib/UserSettings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faMoon, faSun, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

interface SettingsMenuState {
	isOpen: boolean;
	userSettings: UserSettings;
}

const SettingsMenu: React.FC<{}> = () => {
	const initialState = (): SettingsMenuState => {
		return {
			isOpen: false,
			userSettings: loadUserSettings(),
		};
	};

	const [menuState, setMenuState] = useState<SettingsMenuState>(initialState());

	const toggleCollapse = () => {
		setMenuState({
			isOpen: !menuState.isOpen,
			userSettings: menuState.userSettings,
		});
	};

	const toggleDarkMode = () => {};

	const toggleReducedAnimations = () => {};

	return (
		<div id={styles.settingsMenu}>
			<button onClick={toggleCollapse} className={styles.settingsButton}>
				<FontAwesomeIcon icon={faGear} />
			</button>
			<div id={styles.collapsible} className={menuState.isOpen ? "" : styles.collapsibleHidden}>
				<div className={styles.settingsItem}>
					<p>Use {menuState.userSettings.useDarkMode ? "light" : "dark"} mode</p>
					<button onClick={toggleDarkMode} className={styles.settingsButton}>
						<FontAwesomeIcon icon={menuState.userSettings.useDarkMode ? faSun : faMoon} />
					</button>
				</div>
				<div className={styles.settingsItem}>
					<p>{menuState.userSettings.useReducedAnimation ? "Enable" : "Reduce"} animations</p>
					<button onClick={toggleReducedAnimations} className={styles.settingsButton}>
						<FontAwesomeIcon icon={menuState.userSettings.useReducedAnimation ? faEye : faEyeSlash} />
					</button>
				</div>
				,
			</div>
		</div>
	);
};

export default SettingsMenu;
