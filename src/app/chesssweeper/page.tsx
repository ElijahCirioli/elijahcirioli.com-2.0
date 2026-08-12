import { Josefin_Sans } from "next/font/google";
import Frame from "@/components/Frame";
import Logo from "@/components/Logo";
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
			<Frame
				src="/projects/chesssweeper/index.html"
				title="The chesssweeper game"
				width={500}
				height={600}
				marginTop={10}
			/>
		</main>
	);
}
