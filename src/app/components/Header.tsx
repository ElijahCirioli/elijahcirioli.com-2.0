import { Comfortaa } from "next/font/google";
import styles from "./Header.module.css";
import Logo from "./Logo";
import SettingsMenu from "./SettingsMenu";

const fontComfortaa = Comfortaa({ subsets: ["latin"] });

const Header: React.FC<{}> = () => (
	<header id={styles.header}>
		<Logo id={styles.logo} />
		<div id={styles.settingsWrap}>
			<SettingsMenu />
		</div>
		<h1 id={styles.title} className={fontComfortaa.className}>
			elijah<span className={styles.greenText}>cirioli</span>
		</h1>
	</header>
);

export default Header;
