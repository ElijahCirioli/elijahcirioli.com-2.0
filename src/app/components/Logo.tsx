import Image from "next/image";
import Link from "next/link";

interface LogoProps {
	width?: number;
	height?: number;
	id?: string;
}

const Logo: React.FC<LogoProps> = ({ width = 100, height = 57, id }: LogoProps) => {
	const calcWidth = width === 100 && height !== 57 ? height * (100 / 57) : width;
	const calcHeight = height === 57 && width !== 100 ? width * 0.57 : height;

	return (
		<Link href="/" id={id ?? ""}>
			<Image src="/logo.png" alt="Elijah Cirioli logo" width={calcWidth} height={calcHeight} />
		</Link>
	);
};

export default Logo;
