import Frame from "@/components/Frame";
import Header from "@/components/Header";

export default function Home() {
	return (
		<>
			<Header />
			<main>
				<Frame
					src="/projects/raytracing/index.html"
					title="The Raytracing engine"
					width={1240}
					height={613}
					marginTop={80}
					hasBorder={false}
				/>
			</main>
		</>
	);
}
