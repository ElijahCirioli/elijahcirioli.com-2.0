import Frame from "@/components/Frame";
import Header from "@/components/Header";

export default function Home() {
	return (
		<>
			<Header />
			<main>
				<Frame
					src="/projects/plotter/index.html"
					title="The 3D etch-a-sketch"
					width={610}
					height={900}
					marginTop={60}
				/>
			</main>
		</>
	);
}
