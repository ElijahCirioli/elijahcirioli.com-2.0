import Link from "next/link";
import Header from "@/components/Header";
import FileLink from "@/components/blog/FileLink";
import TextWrap from "@/components/blog/TextWrap";

export default function Home() {
	return (
		<>
			<Header />
			<TextWrap title="About jsFLAP" date="Fall 2021">
				<p>
					I created the JavaScript Formal Languages and Automata Package (jsFLAP) to be used as an educational
					tool for learning about the theory of computation, formal languages, and finite state automata. It
					allows the construction and simulation of different types of finite automata, including Turing
					machines. It is inspired in part by a Java program called{" "}
					<Link href="https://www.jflap.org/" target="_blank">
						JFLAP
					</Link>{" "}
					that is widely used in education about the theory of computation. This project became my
					undergraduate thesis for the Oregon State University Honors College.
				</p>
				<ul>
					<li>
						<Link href="https://ir.library.oregonstate.edu/concern/honors_college_theses/pv63g7611">
							Thesis Archive
						</Link>
					</li>
					<li>
						<FileLink href="/jsflap/documents/CirioliElijah2023.pdf">Thesis PDF</FileLink>
					</li>
					<li>
						<FileLink href="/jsflap/documents/thesis_slides.pdf">Presentation Slides</FileLink>
					</li>
				</ul>
			</TextWrap>
		</>
	);
}
