"use client";

import { faEye, faEyeSlash, faGear, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import SettingsMenuItem from "@/components/SettingsMenuItem";
import { useDarkMode, useReducedAnimations } from "@/components/UserSettingsProvider";
import styles from "./SettingsMenu.module.css";

const SettingsMenu: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { darkMode, setDarkMode } = useDarkMode();
	const { reducedAnimations, setReducedAnimations } = useReducedAnimations();

	const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
		// ignore blur events when child has focus
		if (e.currentTarget.contains(e.relatedTarget)) {
			return;
		}
		setIsOpen(false);
	};
	return (
		<div id={styles.menu} className={isOpen ? styles.menuOpen : ""} onBlur={handleBlur}>
			<button
				onClick={() => setIsOpen(!isOpen)}
				className={isOpen ? styles.buttonColorsActive : styles.buttonColors}
			>
				<FontAwesomeIcon icon={faGear} />
			</button>
			<div
				className={styles.connectingLine}
				style={{ height: `${isOpen ? 95 : 0}px`, opacity: isOpen ? 1 : 0 }}
			></div>
			<SettingsMenuItem
				index={0}
				text={`Enable ${darkMode ? "light" : "dark"} mode`}
				icon={darkMode ? faSun : faMoon}
				visible={isOpen}
				updateSetting={() => setDarkMode(!darkMode)}
			/>
			<SettingsMenuItem
				index={1}
				text={`${reducedAnimations ? "Enable" : "Reduce"} animations`}
				icon={reducedAnimations ? faEye : faEyeSlash}
				visible={isOpen}
				updateSetting={() => setReducedAnimations(!reducedAnimations)}
			/>
		</div>
	);
};

export default SettingsMenu;
