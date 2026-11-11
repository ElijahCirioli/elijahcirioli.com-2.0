"use client";

import { useRef } from "react";
import Header from "@/components/Header";
import MicroProject from "@/components/micro/MicroProject";
import ScrollButton from "@/components/micro/ScrollButton";
import styles from "./page.module.css";

export default function Home() {
	const ref = useRef<HTMLDivElement | null>(null);

	function handleClickLeft() {
		ref.current?.scrollBy({ top: 0, left: -400, behavior: "smooth" });
	}

	function handleClickRight() {
		ref.current?.scrollBy({ top: 0, left: 400, behavior: "smooth" });
	}

	function scrollToStart() {
		if (ref.current) {
			ref.current?.scrollTo(0, 0);
		}
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
					<div id={styles.carousel} ref={ref} onLoad={scrollToStart}>
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
						<MicroProject
							src="/projects/micro/minesweeper/index.html"
							title="Minesweeper"
							description="I'm gonna pretend I didn't copy the Google version's color scheme. Left click to reveal, right click to place flags."
							devTime="~1 hour of coding"
							github="https://github.com/ElijahCirioli/Minesweeper"
							width={600}
							height={650}
						/>
						<MicroProject
							src="/projects/micro/snake/index.html"
							title="Snake"
							description="A bare-bones implementation of one of the most basic games ever, but a solid
							time-waster. Move with the arrow keys."
							devTime="~30 minutes of coding"
							github="https://github.com/ElijahCirioli/js-snake-demo"
							width={400}
							height={438}
						/>
						<MicroProject
							src="/projects/micro/ascii/index.html"
							title="ASCII Video Filter"
							description="I wanted to see how easy it would be to play with the pixels of a video in real-time. It turned out to be quite easy."
							devTime="~45 minutes of coding"
							github="https://github.com/ElijahCirioli/ASCII-Filter"
							width={615}
							height={615}
						/>
						<MicroProject
							src="/projects/micro/mold/index.html"
							title="Mold Particles"
							description="An interesting looking particle simulation that vaguely resembles mold. Click to start a new simulation."
							devTime="~30 minutes of coding"
							github="https://github.com/ElijahCirioli/mold-visualization"
							width={500}
							height={500}
						/>
					</div>
				</div>
			</main>
		</>
	);
}
