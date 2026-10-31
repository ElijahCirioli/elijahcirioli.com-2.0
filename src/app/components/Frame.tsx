"use client";

import { useEffect, useRef } from "react";
import { applyThemeColorsToDocument } from "@/lib/colors";
import { listClasses } from "@/lib/utils";
import { useDarkMode } from "@/components/UserSettingsProvider";
import styles from "./Frame.module.css";

export interface FrameProps {
	src: string;
	title: string;
	width: number;
	height: number;
	hasBorder?: boolean;
	marginTop?: number;
}

const Frame: React.FC<FrameProps> = ({ src, title, width, height, hasBorder, marginTop }: FrameProps) => {
	const iFrameRef = useRef<HTMLIFrameElement | null>(null);
	const { darkMode } = useDarkMode();

	// Focus the iFrame when it loads
	useEffect(() => {
		const handleFocus = () => {
			iFrameRef.current?.contentWindow?.focus();
		};

		const iFrame = iFrameRef.current;
		if (iFrame) {
			if (iFrame.contentDocument?.readyState === "complete") {
				handleFocus();
			} else {
				iFrame.addEventListener("load", handleFocus);
			}
		}

		return () => {
			iFrame?.removeEventListener("load", handleFocus);
		};
	}, [iFrameRef]);

	// Pass theme color variables from the DOM into the iFrame (only works same-origin)
	useEffect(() => {
		const iFrame = iFrameRef.current;
		if (iFrame && iFrame.contentDocument) {
			applyThemeColorsToDocument(iFrame.contentDocument);
		}
	}, [iFrameRef, darkMode]);

	const classes = [styles.frame];
	if (hasBorder) {
		classes.push(styles.border);
	}

	return (
		<iframe
			ref={iFrameRef}
			className={listClasses(...classes)}
			src={src}
			title={title}
			width={width}
			height={height}
			style={{ marginTop }}
		/>
	);
};

export default Frame;
