import Frame from "@/components/Frame";
import Header from "@/components/Header";

export default function Home() {
	return (
		<>
			<Header />
			<main>
				<Frame
					src="/projects/rope/index.html"
					title="The rope physics simulation"
					width={508}
					height={460}
					marginTop={80}
				/>
			</main>
		</>
	);
}
