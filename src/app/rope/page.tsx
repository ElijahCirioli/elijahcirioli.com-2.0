import styles from "./page.module.css";
import Header from "@/app/components/Header";

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
