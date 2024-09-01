import styles from "./page.module.css";
import Header from "@/app/components/Header";

export default function Home() {
	return (
		<>
			<Header />
			<main id={styles.main}>
				<iframe
					id={styles.simulationFrame}
					src="/projects/fish/index.html"
					title="The 3D boids fishtank simulation"
				/>
			</main>
		</>
	);
}
