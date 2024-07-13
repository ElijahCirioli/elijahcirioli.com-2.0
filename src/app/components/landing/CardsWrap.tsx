"use client";

import { useState } from "react";
import styles from "./CardsWrap.module.css";
import Project from "@/app/lib/Project";
import Card from "./Card";

interface CardsWrapProps {
	projects: Project[];
}

const CardsWrap: React.FC<CardsWrapProps> = ({ projects }: CardsWrapProps) => {
	const allUnflippedStates = () => Object.fromEntries(projects.map((project) => [project.title, false]));

	const [flippedStates, setFlippedStates] = useState<Record<string, boolean>>(allUnflippedStates());

	const handleMouseClick = () => {
		setFlippedStates(allUnflippedStates());
	};

	const flipCard = (e: React.MouseEvent<HTMLElement>, key: string) => {
		setFlippedStates({ ...flippedStates, [key]: !flippedStates[key] });
		e.stopPropagation();
	};

	return (
		<div id={styles.cardsWrap} onClick={handleMouseClick}>
			{projects.map((project) => (
				<Card
					project={project}
					flipped={flippedStates[project.title]}
					setFlipped={(e: React.MouseEvent<HTMLElement>) => flipCard(e, project.title)}
					key={project.title}
				/>
			))}
		</div>
	);
};

export default CardsWrap;
