import Link from "next/link";
import TextWrap from "@/app/components/blog/TextWrap";
import Header from "@/app/components/Header";
import styles from "./page.module.css";

export default function Home() {
	return (
		<>
			<Header />
			<TextWrap title="About 3D Boids" date="Spring 2021">
				<p>
					Well well well, we’re really doing boids again, huh? I’ll have you know that it’s not a phase, mom.
					Boids are my passion! Back when I made <Link href="/boids">the first boids project</Link> in the
					summer of 2019 (what a sweet summer child, he knows not how many boids lie in his future) I thought
					that they had a lot of potential, and I planned out two other projects that I wanted to use them in.
					You might not know this, but the projects that make it onto this site are only a small fraction of
					all the coding that I do. I have a lot of projects in various stages of development, many of which
					have secret pages on this website. I’m pretty bad at finishing what I start which is why a lot of
					the ones that do make it on are little weekend projects. Some projects are entirely done but they
					would involve an incredibly long writeup to do them justice so I’m saving them for the future.
				</p>
				<p>
					For a while these projects just sat in my ideas notebook, creating what I called “the boids trilogy”
					comprised of <Link href="/boids">the original boids</Link>,{" "}
					<Link href="/asterboids">Asterboids</Link>, and <Link href="/fish">3D boids</Link>. I eventually did
					make Asterboids which was a pretty huge undertaking. I held off on making the comparatively simple
					3D boids for a while, partly because it’s not actually that interesting, but also because I had very
					limited experience working in 3D. After making the <Link href="/sketch">3D etch a sketch</Link> and
					learning how easy THREE.js was, I decided I’d finally finish off this trilogy and say goodbye to
					boids forever (or would I?). Okay yes I will. I could definitely make boid projects until I die but
					I don’t think you guys would be that interested. But just think of what could have been...
				</p>
				<video width="960" height="540" className={styles.gif} autoPlay loop>
					<source src="/projects/fish/about/disease.mp4" type="video/mp4" />
					Your browser does not support the video tag.
				</video>
				<video width="960" height="540" className={styles.gif} autoPlay loop>
					<source src="/projects/fish/about/quantum.mp4" type="video/mp4" />
					Your browser does not support the video tag.
				</video>
				<p>
					The boids trilogy is actually not my only trilogy of projects. I have three different chess
					projects, one of which is almost done, one which I’ve barely started, and one that is still in my
					notebook. Maybe someday these will see the light of day, but don’t hold your breath.
				</p>
				<p>
					Actually implementing this project was pretty easy. I thought a fish tank would be a cute way to
					present it so I started off by making the tank. Now if you look closely (sorry I’m about to get
					really technical here) you might observe that the tank is, for all intents and purposes, essentially
					a box. To make it vaguely resemble water I just lowered the opacity of the faces. This created a few
					problems. In THREE.js (and most 3D programs) if you move the camera inside of an object it seems to
					disappear. This is because by default the faces are only rendered from the outside. Usually you can
					just tell the program to render both sides but with translucent sides that makes it look really
					weird. What I needed to do was only render the outside of the tank when you’re outside of it and
					then only render the inside when you’re inside it. I did this by raycasting at the tank to see if
					you collide with it, since the rays only collide with the rendered side of a face. If the ray
					collides with nothing that must mean you’re inside the tank and you need to decide to render the
					inside now. The only problem with this is that as soon as you start rendering the inside then the
					rays have something to collide with again. This isn’t really a complicated problem to solve, you’re
					probably thinking of several different solutions right now, but since I’m pretty new to the world of
					3D it took me a minute to figure out what was actually going wrong. I was going for a pretty
					abstract representation, I don’t think I’m fooling anyone into thinking this is actually a water
					simulation, but I made the color of the water slowly lerp between a few different values to at least
					make it look a little more interesting.
				</p>
				<p>
					Now the boids (and bear with me here) are actually made out of cones. This was originally intended
					to be a placeholder. I would later spend too much time finding free 3D models of different types of
					fish and then scaling them to make sense within the tank. This seems like it would be good but trust
					me it wasn’t. It would take a lot of effort involving rigging and animating these models for them to
					look good I think. I decided for the sake of my sanity that this simple look was probably for the
					best. I’ve done the boids rules a million times at this point. There’s the classic separation,
					alignment, and cohesion, and then for this project I added two more rules. One rule is similar to
					one from Asterboids that makes the boids avoid running into the walls of the tank, the other just
					adds a tiny bit of randomness to their movement to try and encourage more interesting behaviors.
				</p>
				<p>
					It was all pretty easy to do, I didn’t even need to write my own vector class like I usually have
					two since THREE.js already has one for me. The only problem was that the end result was kinda
					boring. The first few seconds were really cool as patterns began to form out of the chaos of boids,
					but it didn’t take a long time for them to find a stable arrangement that they would stick to,
					travelling as one pack and bouncing off of walls like the little DVD logo. I think they could
					probably create more interesting patterns if there were more boids in a larger area. The flocking
					behavior created by the boids algorithm is more reminiscent of a big school of fish so you need to
					suspend your disbelief a little bit to imagine that I could fit this many boids in a tank (or maybe
					the tank is massive). What I really felt like I needed was something that would cause disturbances
					to shake them up and throw off their patterns.
				</p>
				<p>
					The simplest solution I could come up with for this was to introduce a competing school of fish. I
					added the orange boids and modified the rules so that only the separation rule applied across
					different colors, not alignment or cohesion. This did the trick nicely I thought, when the two
					schools ran into each other they’d be forced to scatter. I think you could probably make a cool
					project where you have some kind of ecosystem made up of different schools of boids. Food that would
					appear that they could all be attracted to and eating it would cause that school to gain more boids.
					You could do something with genetic mutation controlling their speed and the weights of the rules
					and stuff like that. But you know, you’re never gonna get that because you people don’t want any
					more boids projects. As it stands this is an incredibly simple project. There’s absolutely no
					interactivity but I think it’s at least nice to look at. People don’t complain that real fish tanks
					aren’t interactive so I’m gonna just kinda use that to deflect all criticism of this.
				</p>
			</TextWrap>
		</>
	);
}
