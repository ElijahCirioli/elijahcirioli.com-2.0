import { Comfortaa } from "next/font/google";
import Link from "next/link";
import Frame from "@/components/Frame";
import styles from "./MicroProject.module.css";

const fontComfortaa = Comfortaa({
	subsets: ["latin"],
});

export interface MicroProjectProps {
	src: string;
	title: string;
	description: string;
	devTime: string;
	github: string;
	width: number;
	height: number;
}

const MicroProject: React.FC<MicroProjectProps> = ({
	src,
	title,
	description,
	devTime,
	github,
	width,
	height,
}: MicroProjectProps) => {
	return (
		<article className={styles.project}>
			<Frame src={src} title={title} width={width} height={height} hasBorder={true} />
			<div className={styles.titleWrap}>
				<h2 className={fontComfortaa.className}>{title}</h2>
				<p>{devTime}</p>
			</div>
			<p>{description}</p>
			<Link className={styles.button} href={github}>
				Code
			</Link>
		</article>
	);
};

export default MicroProject;
