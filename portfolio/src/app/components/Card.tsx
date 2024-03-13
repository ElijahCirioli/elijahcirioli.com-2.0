import Project from "../lib/Project";
import { listClasses } from "../lib/utils";
import Image from "next/image";
import styles from "./Card.module.css";

interface CardProps {
    project: Project;
}

const Card: React.FC<CardProps> = ({ project }: CardProps) => (
    <article className={styles.card}>
        <div className={styles.cardSideWrap}>
            <div className={listClasses(styles.cardSide, styles.cardSideFront)}>
                <h3 className={styles.title}>{project.title}</h3>
                <h4 className={styles.date}>{project.date}</h4>
                <Image className={styles.image} src={project.image} alt={project.title} width="250" height="250" />
            </div>
            <div className={listClasses(styles.cardSide, styles.cardSideBack)}>
                <h3 className={styles.title}>{project.title}</h3>
                <h4 className={styles.date}>{project.date}</h4>
                <p className={styles.description}>{project.description}</p>
                <div className={styles.buttonsWrap}>
                    {project.buttons.map(button => <button className={styles.button}>{button.text}</button>)}
                </div>
            </div>
        </div>
    </article>
);

export default Card;
