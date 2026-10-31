import Frame from "@/components/Frame";
import Header from "@/components/Header";

export default function Home() {
	return (
		<>
			<Header />
			<main>
				<Frame
					src="/projects/boids/index.html"
					title="The boids simulation"
					width={1010}
					height={880}
					hasBorder={false}
					marginTop={50}
				/>
			</main>
		</>
	);
}
