import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileLines } from "@fortawesome/free-solid-svg-icons";
import styles from "./FileLink.module.css";

interface FileLinkProps {
	href: string;
	children: React.ReactNode;
}

const FileLink: React.FC<FileLinkProps> = ({ href, children }: FileLinkProps) => {
	return (
		<Link href={href} target="_blank">
			{children}
			<FontAwesomeIcon icon={faFileLines} id={styles.icon} />
		</Link>
	);
};

export default FileLink;
