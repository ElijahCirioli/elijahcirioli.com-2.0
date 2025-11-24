import Header from "@/components/Header";
import styles from "./page.module.css";

export default function Home() {
	return (
		<>
			<Header />
			<main>
				<iframe id={styles.plotterFrame} src="/projects/plotter/index.html" title="The 3D etch-a-skethc" />
			</main>
		</>
	);
}
