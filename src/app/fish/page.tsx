import Header from "@/components/Header";
import styles from "./page.module.css";

export default function Home() {
	return (
		<>
			<Header />
			<main>
				<iframe
					id={styles.simulationFrame}
					src="/projects/fish/index.html"
					title="The 3D boids fishtank simulation"
				/>
			</main>
		</>
	);
}
