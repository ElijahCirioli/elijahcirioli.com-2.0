import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faFileLines, faShirt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Comfortaa } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import Project from "@/lib/Project";
import { listClasses } from "@/lib/utils";
import HeaderNavBar from "@/components/HeaderNavBar";
import CardsWrap from "@/components/landing/CardsWrap";
import GoToTopButton from "@/components/landing/GoToTopButton";
import styles from "./page.module.css";
import projectsJson from "./projects.json";

const fontComfortaa = Comfortaa({ subsets: ["latin"] });

export default function Home() {
	const projects = projectsJson as Project[];

	return (
		<>
			<header id={styles.header}>
				<HeaderNavBar />
				<h1 id={styles.title} className={fontComfortaa.className}>
					elijah<span className={styles.greenText}>cirioli</span>
				</h1>
				<div id={styles.aboutWrap}>
					<Image
						id={styles.aboutImage}
						src="/landing/portrait.jpg"
						alt="Elijah Cirioli portrait"
						width="150"
						height="150"
					/>
					<p id={styles.aboutText}>
						Hello, I&#39;m a full-stack software engineer from Portland, Oregon. Here are a few personal
						projects that I enjoyed making.
					</p>
				</div>
				<nav className={styles.nav}>
					<Link className={styles.navLink} href="https://github.com/ElijahCirioli" target="_blank">
						<FontAwesomeIcon icon={faGithub} />
						<p className={styles.navLinkTitle}>GitHub</p>
					</Link>
					<Link
						className={styles.navLink}
						href="https://www.linkedin.com/in/elijah-cirioli-591a3920b/"
						target="_blank"
					>
						<FontAwesomeIcon icon={faLinkedin} />
						<p className={styles.navLinkTitle}>LinkedIn</p>
					</Link>
					<Link className={styles.navLink} href="/landing/Elijah_Cirioli_Resume.pdf" target="_blank">
						<FontAwesomeIcon icon={faFileLines} />
						<p className={styles.navLinkTitle}>Résumé</p>
					</Link>
					<Link className={styles.navLink} href="mailto:contact@elijahcirioli.com">
						<FontAwesomeIcon icon={faEnvelope} />
						<p className={styles.navLinkTitle}>Email</p>
					</Link>
					<Link
						className={listClasses(styles.navLink, styles.navLinkSmaller)}
						href="https://www.etsy.com/shop/elijahciriolidotcom"
						target="_blank"
					>
						<FontAwesomeIcon icon={faShirt} />
						<p className={styles.navLinkTitle}>Store</p>
					</Link>
				</nav>
			</header>
			<main id={styles.main}>
				<GoToTopButton />
				<CardsWrap projects={projects} />
			</main>
		</>
	);
}
