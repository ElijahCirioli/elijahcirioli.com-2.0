import Frame from "@/components/Frame";
import Header from "@/components/Header";

export default function Home() {
	return (
		<>
			<Header />
			<main>
				<Frame
					src="/projects/tetrisnt/index.html"
					title="The tetrisn't game"
					width={600}
					height={640}
					marginTop={80}
					hasBorder={true}
				/>
			</main>
		</>
	);
}
