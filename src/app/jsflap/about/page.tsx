import Link from "next/link";
import TextWrap from "@/app/components/blog/TextWrap";
import Header from "@/app/components/Header";
import FileLink from "@/app/components/blog/FileLink";

export default function Home() {
	return (
		<>
			<Header />
			<TextWrap title="About jsFLAP" date="Fall 2021">
				<p>
					I created the JavaScript Formal Languages and Automata Package (jsFLAP) to be used as an
					educational tool for learning about the theory of computation, formal languages, and
					finite state automata. It allows the construction and simulation of different types of
					finite automata, including Turing machines. It is inspired in part by a Java program
					called{" "}
					<a href="https://www.jflap.org/" target="_blank">
						JFLAP
					</a>{" "}
					that is widely used in education about the theory of computation. This project became my
					undergraduate thesis for the Oregon State University Honors College.
				</p>
				<ul>
					<li>
						<Link
							href="https://ir.library.oregonstate.edu/concern/honors_college_theses/pv63g7611"
							target="_blank"
						>
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
