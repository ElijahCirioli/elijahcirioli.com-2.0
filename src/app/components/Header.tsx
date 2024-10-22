import { Comfortaa } from "next/font/google";
import styles from "./Header.module.css";
import HeaderNavBar from "./HeaderNavBar";

const fontComfortaa = Comfortaa({ subsets: ["latin"] });

const Header: React.FC<{}> = () => (
	<header id={styles.header}>
		<HeaderNavBar />
		<h1 id={styles.title} className={fontComfortaa.className}>
			elijah<span className={styles.greenText}>cirioli</span>
		</h1>
	</header>
);

export default Header;
