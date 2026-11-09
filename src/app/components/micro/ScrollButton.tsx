import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CSSProperties } from "react";
import styles from "./ScrollButton.module.css";

export interface ScrollButtonProps {
	direction: "left" | "right";
	onClick: () => void;
}

const ScrollButton: React.FC<ScrollButtonProps> = ({ direction, onClick }) => {
	let icon;
	let position: CSSProperties;
	switch (direction) {
		case "left":
			icon = faChevronLeft;
			position = { left: 40 };
			break;
		case "right":
			icon = faChevronRight;
			position = { right: 40 };
			break;
	}

	return (
		<button className={styles.scrollButton} onClick={onClick} style={position}>
			<FontAwesomeIcon icon={icon} />
		</button>
	);
};

export default ScrollButton;
