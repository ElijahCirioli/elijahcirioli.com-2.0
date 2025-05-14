import { Comfortaa } from "next/font/google";
import HeaderNavBar from "@/components/HeaderNavBar";
import styles from "./Header.module.css";

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
