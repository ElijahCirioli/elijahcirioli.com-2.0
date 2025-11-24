import Link from "next/link";
import Header from "@/components/Header";
import TextWrap from "@/components/blog/TextWrap";
import styles from "./page.module.css";

export default function Home() {
	return (
		<>
			<Header />
			<TextWrap title="About 3D Plotter" date="Winter 2021">
				<p>
					Allow me to set the scene for you: I’m in a little class called Honors Vector Calculus, we’re
					learning something about history or maybe chemistry, I don’t really know. As you do in vector calc
					we finally start working in three dimensions. I live and breathe vectors and I actually have a
					little bit of experience in a 3D world so I could visualize this stuff fairly well, but my professor
					started talking about how he’d like some better tools to help people understand graphing in 3D. He
					ended by saying that what he wanted was basically a 3D etch a sketch. That idea really intrigued me
					so I figured I would try to make it real, albeit in a much less cool digital way.
				</p>
				<p>
					I’ve done a little work in 3D before,{" "}
					<Link href="/raytracing/about">
						you all read those two thousand words I wrote about raytracing, right?
					</Link>{" "}
					I usually do things from scratch (and in scratch?) because I want to fully understand them but it’s
					also good to get experience working with different libraries and also I would do a much worse job at
					writing a 3D raster engine that actually has good performance. I settled on{" "}
					<Link href="https://threejs.org/">THREE.js</Link> because it seems to be pretty popular and it also
					looked very easy to use. I started by constructing the actual shape of the etch a sketch out of
					primitive solids. I don’t know what you really need me to say about that, it’s kinda a masterpiece.
				</p>
				<p>
					THREE.js has ready-to-use code for orbit controls which were something I wasn’t really looking
					forward to writing myself. They also have the option to use buttons on the keyboard for the orbit
					controls but this seemed to be broken because it gave me a lot of errors. My extremely brief
					Googling led me to believe that this was an error in the latest version of THREE.js. I could have
					just used an older version but instead I just went into the code for the orbit controls and tweaked
					a few lines to fix all the errors. It was a pretty simple fix but the downside of doing this was
					that I now had to host my modified version of all the THREE.js code I was using, rather than just
					requesting it from a CDN like I usually do.{" "}
				</p>
				<p>
					When it came to making the etch a sketch functional I was originally planning on adding new line
					segments to the scene every time the cursor moved but I think in terms of performance this would
					have been really bad. Instead I have one line that’s constructed of many points that are stored in a
					buffer. As I update this buffer I tell THREE.js to instance more points in the line, making it
					longer. This is really good for performance but it does have the downside that there are a fixed
					number of points that define the line so you can run out. I set it up to use 10,000 points so it
					takes a while to run out but if I was really worried about it I could implement some kind of
					optimizer system to remove points in between when it’s travelling in the same direction or I’d just
					add a new line when the old one reaches max length.
				</p>
				<p>
					But Elijah Cirioli (.co.uk), those both sound fairly simple, why didn’t you do either of those
					things? Well ya know I was making this in a weekend and I really couldn’t be bothered. The same
					principle applies to the knobs on the etch a sketch. It would be cool if you could use the mouse to
					rotate the knobs, but that would be a lot of work. I’d have to massively overhaul the orbit controls
					so they don’t steal the mouse events that I needed and it probably wouldn’t end up being worth it.
					You’d also only be able to manipulate one dimension of movement at a time so it would be more of a
					novelty than something functional. I settled on making the knobs rotate in accordance with how
					you’re using the button controls because it was infinitely easier and still looks at least a little
					cool.{" "}
				</p>
				<p>
					Oddly enough, one of the trickiest aspects of this project was trying to figure out a good control
					scheme. The <i>WASDQE</i> keys jumped out to me immediately, it just seemed logical. With these I
					could move in all three dimensions at once but I got a few complaints from people who wanted to
					control it with two hands. To hopefully cover all future complaints I implemented fully remappable
					controls for the first time ever which was actually fairly simple. Now these controls are binary,
					you’re either pressing a key or not. This means that you can only move the cursor in 26 different
					directions. Ideally, the controls would be analog, letting you move the cursor in an infinite number
					of directions to create complex curves. I’ve thought about this a fair amount and I can’t really
					think of any way to do this using a keyboard and mouse. The mouse lets you perform analog inputs,
					but it only really works in one dimension. In a real 3D etch a sketch you’d only really be able to
					spin two of the knobs at once, so even being able to use two dimensions would be nice. If I did two
					dimensional analog input using the mouse I would have basically just made MS Paint. An etch a sketch
					needs that obfuscation of the controls to really make it special. In the end it’s certainly not
					amazing that the controls are binary but from what I see there’s not much that I can do about it. To
					try and add a little depth I made a quick speed slider for the cursor that should hopefully let you
					make somewhat more complex shapes.{" "}
				</p>
				<p>
					To cap things off I added some on screen buttons for some special controls, a couple of which
					involved me modifying the orbit controls code some more. This whole thing is pretty simple, but I’m
					happy with it. It more or less achieves what I set out to do, I wasn’t trying to make something
					super deep or polished. I also got a good amount of experience with THREE.js so I’m feeling pretty
					confident about working in 3D again in the future. The professor liked it so that’s cool too. If
					anyone wants to make a physical 3D etch a sketch I’ll give you this idea: what if you hooked up
					three knobs to control a 3D printer in real time. It would be terrible but also I think it could be
					really interesting.
				</p>
			</TextWrap>
		</>
	);
}
