import styles from "./Footer.module.css";

const Footer: React.FC<{}> = () => (
	<footer className={styles.footer}>
		<p>©{new Date().getFullYear()} Elijah Cirioli</p>
		<a>Portfolio</a>
		<a>GitHub</a>
		<a>LinkedIn</a>
		<a>Résumé</a>
		<a>Email</a>
		<a>Store</a>
	</footer>
);

export default Footer;
