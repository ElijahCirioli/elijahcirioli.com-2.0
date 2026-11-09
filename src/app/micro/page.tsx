import Header from "@/components/Header";
import MicroProject from "@/components/micro/MicroProject";
import styles from "./page.module.css";

export default function Home() {
	return (
		<>
			<Header />
			<main>
				<div id={styles.carouselWrap}>
					<div id={styles.carousel}>
						<MicroProject
							src="/projects/micro/chaos/index.html"
							title="Lorenz Attractor"
							description="A simple simulation of the Lorenz attractor as an example of chaos theory."
							devTime="~3 hours of coding"
							github="https://github.com/ElijahCirioli/js-lorenz-attractor"
							width={520}
							height={600}
						/>
						<MicroProject
							src="/projects/micro/snaketris/index.html"
							title="Snaketris"
							description="An unspecified combination of two of my favorite games. Move with the arrow keys, grow long, and clear lines for massive points."
							devTime="~4 hours of coding"
							github="https://github.com/ElijahCirioli/snaketris"
							width={375}
							height={490}
						/>
						<MicroProject
							src="/projects/micro/buddy/index.html"
							title="Statistics Explainer"
							description="An interactive demo of my high school statistics teacher's favorite picture. Demonstrates the
								relationship between alpha, beta, sample size, and the chance of error in hypothesis
								testing."
							devTime="~3 hours of coding"
							github="https://github.com/ElijahCirioli/buddy"
							width={524}
							height={690}
						/>
					</div>
				</div>
			</main>
		</>
	);
}
