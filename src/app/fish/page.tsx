import Frame from "@/components/Frame";
import Header from "@/components/Header";

export default function Home() {
	return (
		<>
			<Header />
			<main>
				<Frame
					src="/projects/fish/index.html"
					title="The 3D boids fishtank simulation"
					width={600}
					height={400}
					hasBorder={true}
					marginTop={80}
				/>
			</main>
		</>
	);
}
