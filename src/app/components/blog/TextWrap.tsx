import { Comfortaa, Montserrat } from "next/font/google";
import styles from "./TextWrap.module.css";

const fontComfortaa = Comfortaa({
	subsets: ["latin"],
});
const fontMontserrat = Montserrat({ subsets: ["latin"] });

interface TextWrapProps {
	title: string;
	date: string;
	children: React.ReactNode;
}

const TextWrap: React.FC<TextWrapProps> = ({ title, date, children }: TextWrapProps) => {
	return (
		<main id={styles.textWrap} className={fontMontserrat.className}>
			<div id={styles.titleWrap}>
				<h1 className={fontComfortaa.className}>{title}</h1>
				<p>{date}</p>
			</div>
			<hr />
			{children}
		</main>
	);
};

export default TextWrap;
