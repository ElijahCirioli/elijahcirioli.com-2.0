import { Comfortaa, Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import Project from "@/lib/Project";
import { listClasses } from "@/lib/utils";
import styles from "./Card.module.css";

const fontComfortaa = Comfortaa({
	subsets: ["latin"],
});
const fontMontserrat = Montserrat({ subsets: ["latin"] });

interface CardProps {
	project: Project;
	flipped: boolean;
	setFlipped: (e: React.MouseEvent<HTMLElement>) => void;
}

const Card: React.FC<CardProps> = ({ project, flipped, setFlipped }: CardProps) => {
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

	const handleLinkClick = (e: React.MouseEvent<HTMLElement>) => {
		e.stopPropagation();
	};

	const cardSideWrapClasses = [styles.cardSideWrap];
	if (flipped) {
		cardSideWrapClasses.push(styles.flipped);
	}

	return (
		<article
			className={styles.card}
			onMouseMove={handleMouseMove}
			onMouseEnter={handleMouseMove}
			onMouseLeave={handleMouseLeave}
		>
			<div className={listClasses(...cardSideWrapClasses)} onClick={setFlipped}>
				<div className={listClasses(styles.cardSide, styles.cardSideFront)}>
					<Link
						className={listClasses(styles.title, fontComfortaa.className)}
						href={project.buttons[0]?.route ?? ""}
						onClick={handleLinkClick}
					>
						{project.title}
					</Link>
					<h4 className={styles.date}>{project.date}</h4>
					<Image
						className={styles.image}
						src={project.image}
						alt={project.title}
						width="300"
						height="300"
						draggable="false"
					/>
				</div>
				<div className={listClasses(styles.cardSide, styles.cardSideBack)}>
					<h3 className={listClasses(styles.title, fontComfortaa.className)}>{project.title}</h3>
					<h4 className={styles.date}>{project.date}</h4>
					<p className={styles.description}>{project.description}</p>
					<div className={styles.buttonsWrap}>
						{project.buttons.map((button) => (
							<Link
								className={listClasses(styles.button, fontMontserrat.className)}
								key={button.text}
								href={button.route}
								onClick={handleLinkClick}
							>
								{button.text}
							</Link>
						))}
					</div>
				</div>
			</div>
		</article>
	);
};

export default Card;
