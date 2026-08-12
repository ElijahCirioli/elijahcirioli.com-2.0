"use client";

import { useEffect, useRef } from "react";
import { listClasses } from "@/lib/utils";
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
	}, []);

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
