"use client";

import { useCallback, useEffect, useState } from "react";
import { applyThemeColorsToDocument } from "@/lib/colors";
import Header from "@/components/Header";
import { useDarkMode } from "@/components/UserSettingsProvider";
import styles from "./page.module.css";

export default function Home() {
	const [iFrame, setIFrame] = useState<HTMLIFrameElement | null>(null);
	const { darkMode } = useDarkMode();

	// Pass theme color variables from the DOM into the iFrame (only works same-origin)
	// This is copied from the Frame component, but it would be good to just use that component here instead.
	const applyThemeColors = useCallback(() => {
		const document = iFrame?.contentDocument ?? iFrame?.contentWindow?.document;
		if (document) {
			applyThemeColorsToDocument(document);
		}
	}, [iFrame]);

	useEffect(() => {
		if (!iFrame) {
			return;
		}

		iFrame.addEventListener("load", applyThemeColors);
		if (iFrame.contentDocument?.readyState === "complete") {
			applyThemeColors();
		}

		return () => {
			iFrame.removeEventListener("load", applyThemeColors);
		};
	}, [iFrame, applyThemeColors, darkMode]);

	return (
		<>
			<Header />
			<main>
				<iframe
					ref={setIFrame}
					id={styles.frame}
					src="/projects/raytracing/index.html"
					title="The Raytracing engine"
				/>
			</main>
		</>
	);
}
