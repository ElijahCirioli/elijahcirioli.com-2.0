"use client";

import { useCallback, useEffect, useState } from "react";
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
	const [iFrame, setIFrame] = useState<HTMLIFrameElement | null>(null);
	const { darkMode } = useDarkMode();

	// Focus the iFrame when it loads
	useEffect(() => {
		if (!iFrame) {
			return;
		}

		const handleFocus = () => {
			iFrame?.contentWindow?.focus();
		};

		iFrame.addEventListener("load", handleFocus);
		if (iFrame.contentDocument?.readyState === "complete") {
			handleFocus();
		}

		return () => {
			iFrame.removeEventListener("load", handleFocus);
		};
	}, [iFrame]);

	// Pass theme color variables from the DOM into the iFrame (only works same-origin)
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

	const classes = [styles.frame];
	if (hasBorder) {
		classes.push(styles.border);
	}

	return (
		<iframe
			ref={setIFrame}
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
