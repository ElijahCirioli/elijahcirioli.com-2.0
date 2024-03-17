import Project from "./lib/Project";
import Image from "next/image";
import { Comfortaa } from "next/font/google";
import styles from "./page.module.css";
import projectsJson from "./projects.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faShirt, faEnvelope, faFileLines } from "@fortawesome/free-solid-svg-icons";
import CardsWrap from "./components/CardsWrap";

const fontComfortaa = Comfortaa({ subsets: ["latin"] });

export default function Home() {
	const projects = projectsJson as Project[];

	return (
		<>
			<header className={styles.header}>
				<Image className={styles.logo} src="/logo.png" alt="Elijah Cirioli logo" width="551" height="316" />
				<h1 id={styles.title} className={fontComfortaa.className}>
					elijah<span className={styles.greenText}>cirioli</span>
				</h1>
				<div className={styles.aboutWrap}>
					<img className={styles.aboutImage} src="/landing/portrait.jpg" />
					<p className={styles.aboutText}>
						Hello, I'm a full-stack software engineer from Portland, Oregon. Here are a few personal projects that I have enjoyed making.
					</p>
				</div>
				<nav className={styles.nav}>
					<a className={styles.navLink}>
						<FontAwesomeIcon icon={faGithub} />
						<p className={styles.navLinkTitle}>GitHub</p>
					</a>
					<a className={styles.navLink}>
						<FontAwesomeIcon icon={faLinkedin} />
						<p className={styles.navLinkTitle}>LinkedIn</p>
					</a>
					<a className={styles.navLink}>
						<FontAwesomeIcon icon={faFileLines} />
						<p className={styles.navLinkTitle}>Résumé</p>
					</a>
					<a className={styles.navLink}>
						<FontAwesomeIcon icon={faEnvelope} />
						<p className={styles.navLinkTitle}>Email</p>
					</a>
					<a className={styles.navLink}>
						<FontAwesomeIcon icon={faShirt} />
						<p className={styles.navLinkTitle}>Store</p>
					</a>
				</nav>
			</header>
			<main id={styles.main}>
				<CardsWrap projects={projects} />
			</main>
		</>
	);
}
