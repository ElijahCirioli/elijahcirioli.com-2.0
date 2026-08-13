import Header from "@/components/Header";
import styles from "./page.module.css";

export default function Home() {
	return (
		<>
			<Header />
			<main>
				<iframe id={styles.frame} src="/projects/raytracing/index.html" title="The Raytracing engine" />
			</main>
		</>
	);
}
