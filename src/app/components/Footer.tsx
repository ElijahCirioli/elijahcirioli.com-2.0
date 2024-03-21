import Link from "next/link";
import styles from "./Footer.module.css";

const Footer: React.FC<{}> = () => (
	<footer className={styles.footer}>
		<p>©{new Date().getFullYear()} Elijah Cirioli</p>
		<Link className={styles.link} href="/">
			Portfolio
		</Link>
		<Link className={styles.link} href="https://github.com/ElijahCirioli" target="_blank">
			GitHub
		</Link>
		<Link className={styles.link} href="https://www.linkedin.com/in/elijah-cirioli-591a3920b/" target="_blank">
			LinkedIn
		</Link>
		<Link className={styles.link} href="/landing/Elijah_Cirioli_Resume.pdf" target="_blank">
			Résumé
		</Link>
		<Link className={styles.link} href="mailto:contact@elijahcirioli.com">
			Email
		</Link>
		<Link className={styles.link} href="https://www.etsy.com/shop/elijahciriolidotcom" target="_blank">
			Store
		</Link>
	</footer>
);

export default Footer;
