import Header from "@/components/Header";
import styles from "./page.module.css";

export default function Home() {
	return (
		<>
			<Header />
			<main id={styles.main}>
				<iframe id={styles.chessFrame} src="/projects/chess/index.html" title="The public chess board" />
			</main>
		</>
	);
}
