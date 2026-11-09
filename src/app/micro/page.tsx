"use client";

import { useRef } from "react";
import Header from "@/components/Header";
import MicroProject from "@/components/micro/MicroProject";
import ScrollButton from "@/components/micro/ScrollButton";
import styles from "./page.module.css";

export default function Home() {
	const ref = useRef<HTMLDivElement | null>(null);

	function handleClickLeft(): void {
		ref.current?.scrollBy({ top: 0, left: -400, behavior: "smooth" });
	}

	function handleClickRight(): void {
		ref.current?.scrollBy({ top: 0, left: 400, behavior: "smooth" });
	}

	return (
		<>
			<Header />
			<main>
				<h2 id={styles.title}>A collection of tiny coding projects</h2>
				<div id={styles.carouselWrap}>
					<div className={styles.fade} id={styles.leftFade}></div>
					<div className={styles.fade} id={styles.rightFade}></div>
					<ScrollButton direction="left" onClick={handleClickLeft} />
					<ScrollButton direction="right" onClick={handleClickRight} />
					<div id={styles.carousel} ref={ref}>
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
						<MicroProject
							src="/projects/micro/containment/index.html"
							title="Containment"
							description="A very simple game that's pretty much just circular pong. I'm sure the idea isn't new but it's a pretty decent distraction."
							devTime="~1 hour of coding"
							github="https://github.com/ElijahCirioli/Containment"
							width={450}
							height={500}
						/>
					</div>
				</div>
			</main>
		</>
	);
}
