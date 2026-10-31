"use client";

import { useEffect, useRef } from "react";
import { applyThemeColorsToDocument } from "@/lib/colors";
import Header from "@/components/Header";
import { useDarkMode } from "@/components/UserSettingsProvider";
import styles from "./page.module.css";

export default function Home() {
	const iFrameRef = useRef<HTMLIFrameElement | null>(null);
	const { darkMode } = useDarkMode();

	// Pass theme color variables from the DOM into the iFrame (only works same-origin)
	useEffect(() => {
		const iFrame = iFrameRef.current;
		if (iFrame && iFrame.contentDocument) {
			applyThemeColorsToDocument(iFrame.contentDocument);
		}
	}, [iFrameRef, darkMode]);

	return (
		<>
			<Header />
			<main>
				<iframe
					ref={iFrameRef}
					id={styles.frame}
					src="/projects/raytracing/index.html"
					title="The Raytracing engine"
				/>
			</main>
		</>
	);
}
