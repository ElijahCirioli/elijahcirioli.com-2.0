import Image from "next/image";
import Link from "next/link";
import styles from "./LabeledImage.module.css";

interface LabeledImageProps {
	src: string;
	label?: string;
	creditName?: string;
	creditHref?: string;
	style?: React.CSSProperties;
}

const LabeledImage: React.FC<LabeledImageProps> = ({
	src,
	label,
	creditName,
	creditHref,
	style,
}: LabeledImageProps) => {
	return (
		<div id={styles.imageWrap} style={style}>
			<Image src={src} alt={label ?? ""} width="0" height="0" />
			{creditName && (
				<Link href={creditHref ?? ""} target="_blank">
					{`Photo courtesy of ${creditName}, `}
					<cite>{creditHref ?? ""}</cite>
				</Link>
			)}
			{label && <p>{label}</p>}
		</div>
	);
};

export default LabeledImage;
