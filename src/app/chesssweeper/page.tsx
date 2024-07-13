import Logo from "@/app/components/Logo";
import { Josefin_Sans } from "next/font/google";
import styles from "./page.module.css";

const fontJosefinSans = Josefin_Sans({ subsets: ["latin"] });

export default function Home() {
	return (
		<main id={styles.main}>
			<div id={styles.titleWrap}>
				<h1 id={styles.title} className={fontJosefinSans.className}>
					Chess Sweeper
				</h1>
				<div id={styles.titleEndCap}></div>
				<Logo id={styles.ecLogo} />
			</div>
			<iframe
				id={styles.gameFrame}
				src="/projects/chesssweeper/index.html"
				title="The chesssweeper game"
			/>
		</main>
	);
}
