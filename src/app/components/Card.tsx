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
}

const Card: React.FC<CardProps> = ({ project }: CardProps) => (
	<article className={styles.card} key={project.title}>
		<div className={styles.cardSideWrap}>
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

export default Card;
