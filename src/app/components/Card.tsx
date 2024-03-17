import Project from "../lib/Project";
import { listClasses } from "../lib/utils";
import Image from "next/image";
import { Comfortaa, Montserrat } from "next/font/google";
import styles from "./Card.module.css";

const fontComfortaa = Comfortaa({
	subsets: ["latin"],
});
const fontMontserrat = Montserrat({ subsets: ["latin"] });

interface CardProps {
	project: Project;
	isFlipped: boolean;
	flipCard: (e: React.MouseEvent<HTMLElement>, key: string) => void;
}

const Card: React.FC<CardProps> = ({ project, isFlipped, flipCard }: CardProps) => {
	const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
		// This is all very arbitrary but I've found it to look good
		const bounds = e.currentTarget.getBoundingClientRect();
		const centerOffsetX = e.clientX - bounds.left - bounds.width / 2;
		const centerOffsetY = e.clientY - bounds.top - bounds.height / 2;
		const angle = Math.log(Math.sqrt(centerOffsetX ** 2 + centerOffsetY ** 2)) * 1.2;

		e.currentTarget.style.transform = `
			scale3d(1.06, 1.06, 1.06)
			rotate3d(${centerOffsetY / (bounds.height * 4)}, ${-centerOffsetX / bounds.width}, 0, ${angle}deg)
		`;

		e.currentTarget.style.setProperty("--highlight-x", `${e.clientX - bounds.left}px`);
		e.currentTarget.style.setProperty("--highlight-y", `${e.clientY - bounds.top}px`);
	};

	const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
		e.currentTarget.style.transform = "";
	};

	const cardSideWrapClasses = [styles.cardSideWrap];
	if (isFlipped) {
		cardSideWrapClasses.push(styles.flipped);
	}

	return (
		<article className={styles.card} onMouseMove={handleMouseMove} onMouseEnter={handleMouseMove} onMouseLeave={handleMouseLeave}>
			<div className={listClasses(...cardSideWrapClasses)} onClick={(e) => flipCard(e, project.title)}>
				<div className={listClasses(styles.cardSide, styles.cardSideFront)}>
					<h3 className={listClasses(styles.title, fontComfortaa.className)}>{project.title}</h3>
					<h4 className={styles.date}>{project.date}</h4>
					<Image className={styles.image} src={project.image} alt={project.title} width="250" height="250" />
				</div>
				<div className={listClasses(styles.cardSide, styles.cardSideBack)}>
					<h3 className={listClasses(styles.title, fontComfortaa.className)}>{project.title}</h3>
					<h4 className={styles.date}>{project.date}</h4>
					<p className={styles.description}>{project.description}</p>
					<div className={styles.buttonsWrap}>
						{project.buttons.map((button) => (
							<button className={listClasses(styles.button, fontMontserrat.className)} key={button.text}>
								{button.text}
							</button>
						))}
					</div>
				</div>
			</div>
		</article>
	);
};

export default Card;
