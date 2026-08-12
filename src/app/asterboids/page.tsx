import Frame from "@/components/Frame";
import Header from "@/components/Header";
import styles from "./page.module.css";

export default function Home() {
	return (
		<>
			<Header />
			<main>
				<Frame
					src="/projects/asterboids/index.html"
					title="The Asterboids game"
					width={800}
					height={600}
					marginTop={80}
					hasBorder={true}
				/>
				<div id={styles.controls}>
					<h2>Controls:</h2>
					<p>Left/right arrows - Turn</p>
					<p>Forward arrow - Thrust</p>
					<p>Spacebar - Shoot</p>
					<p>Down Arrow - Hyperdrive</p>
					<p>Enter - Select</p>
					<p>Escape - Quit</p>
				</div>
			</main>
		</>
	);
}
