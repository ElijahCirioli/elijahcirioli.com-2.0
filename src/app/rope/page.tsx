import Header from "@/components/Header";
import styles from "./page.module.css";

export default function Home() {
	return (
		<>
			<Header />
			<main id={styles.main}>
				<iframe
					id={styles.simulationFrame}
					src="/projects/rope/index.html"
					title="The rope physics simulation"
				/>
			</main>
		</>
	);
}
