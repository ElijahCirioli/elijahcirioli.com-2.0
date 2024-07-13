"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./GoToTopButton.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";

const GoToTopButton: React.FC<{}> = () => {
	const [isButtonVisible, setButtonVisible] = useState<boolean>(false);
	const ref = useRef<HTMLAnchorElement | null>(null);

	useEffect(() => {
		const observer = new IntersectionObserver((intersections) => {
			setButtonVisible(intersections.find((intersection) => intersection.isIntersecting) === undefined);
		});
		if (ref.current) {
			observer.observe(ref.current);
		}
	}, []);

	const handleMouseClick = (e: React.MouseEvent<HTMLElement>) => {
		if (typeof window !== "undefined") {
			window.scrollTo({
				top: 0,
				behavior: "smooth",
			});
			e.preventDefault();
		}
	};

	return (
		<>
			{isButtonVisible && (
				<Link href="#" id={styles.button} onClick={handleMouseClick}>
					<FontAwesomeIcon icon={faChevronUp} />
				</Link>
			)}
			<a ref={ref} href="" id={styles.marker} />
		</>
	);
};

export default GoToTopButton;
