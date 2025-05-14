import Link from "next/link";
import Header from "@/components/Header";
import LabeledImage from "@/components/blog/LabeledImage";
import TextWrap from "@/components/blog/TextWrap";

export default function Home() {
	return (
		<>
			<Header />
			<TextWrap title="About Rope Simulation" date="Summer 2021">
				<p>
					We find ourselves again in a familiar situation. Eli watched another{" "}
					<Link href="https://www.youtube.com/c/SebastianLague" target="_blank">
						Sebastian Lague
					</Link>{" "}
					video (the king) and wanted to make something that he featured. I don’t know how this guy gets his
					ideas, but until I can do it as well as him I will likely keep piggybacking. In this instance, he
					briefly mentioned a simple technique for simulating ropes that utilized some math called Verlet
					integration. When I watched this I essentially said “it can’t be that easy” and immediately went to
					try it for myself.
				</p>
				<p>
					I actually have a little bit of experience simulating ropes, or at least something rope-adjacent.
					Back in probably my sophomore year of high school I created an arcade-style game called
					GrappleStomp. It was basically a 1v1 deathmatch game where you launched yourself around with
					grappling hooks to try and stomp on the opponent’s head. I’m kind of overselling it here, it didn’t
					turn out as cool as it sounds. I came up with a system for this to make the grappling ropes bend as
					you moved around obstacles, but I wouldn’t call it physics. They weren’t affected by gravity and
					their length was not fixed.{" "}
				</p>
				<LabeledImage
					src="/projects/rope/about/grapple_stomp.png"
					label="An early build of GrappleStomp."
					style={{ width: "60%", maxWidth: "500px" }}
				/>
				<p>
					Anyway, let’s talk about these ropes. As you can pretty clearly see, the ropes are made up of a
					series of points connected by lines. The points are defined with a position and whether they are
					locked in place or not, and the lines are defined by two points, as well as the fixed distance
					between them at the time of their creation.
				</p>
				<p>
					Every physics tick we apply two steps. The first is simple: we apply Newtonian physics to every
					point that isn’t locked, accelerating them downwards in accordance with gravity. The second step is
					a little more complicated. We take each line and find its center and direction based on the new
					position of the points. We know how long the line should be so we move both points in towards the
					center until it is that length again. This will try to adjust every point so all the lines can
					satisfy their initial length, but that isn’t always possible. By repeating the second step many
					times per tick and updating the lines in a random order, the system quickly settles to a fairly
					stable state where all lines can feel happy. You could do this second step only once, but the
					oscillations will be quite extreme so I repeat it 500 times on each frame.
				</p>
				<p>
					And that’s seriously it for how the ropes are simulated. The{" "}
					<Link href="https://en.wikipedia.org/wiki/Verlet_integration" target="_blank">
						Verlet integration
					</Link>{" "}
					part simply relates to how physics are applied to the points. We are implementing Newtonian physics,
					but we don’t deal with forces, or even velocity, at least not as defined variables. All we keep
					track of for each point is its current position and its last position, and we also keep track of the
					delta time since the last tick. We move the point the same amount it moved between the last two
					positions and we move it down by our acceleration due to gravity multiplied by the delta time
					squared. There’s no reason that specific technique for Newtonian physics is necessary here, it’s
					just quite simple and elegant which fits with the rest of the project.
				</p>
				<p>
					I’ve never done physics where I calculate the time step before, but it’s something I’ve been meaning
					to do for a while now. I usually just assume that the amount of time between frames will be constant
					but that is not always the case so it is good to have physics that run independently of the
					framerate.
				</p>
				<p>
					The net-like structure I constructed out of these ropes is essentially a cloth simulation, and it
					didn’t require any additional work which I think is really cool. I thought it would be fun if I
					could cut the cloth, so I decided to add the scissors tool that would delete lines as you dragged it
					over them. The cursor is a circle so I was essentially finding the intersection of a circle and a
					line segment which was slightly more challenging than I anticipated. I ended up doing this by
					finding the discriminant and using the quadratic formula. There may be a simpler way to do this that
					I don’t know about, but this wasn’t too bad once I’d worked the math out. All in all this was a very
					simple project, but I’m quite pleased with the result, especially considering how little time it
					took to make.
				</p>
			</TextWrap>
		</>
	);
}
