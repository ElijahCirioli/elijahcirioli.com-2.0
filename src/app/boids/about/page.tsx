import Link from "next/link";
import Header from "@/components/Header";
import LabeledImage from "@/components/blog/LabeledImage";
import TextWrap from "@/components/blog/TextWrap";

export default function Home() {
	return (
		<>
			<Header />
			<TextWrap title="About Boids" date="Summer 2019">
				<LabeledImage
					src="/projects/boids/about/vant_boid.png"
					style={{ width: "30%", float: "right", margin: "0.8em 0 0 1em" }}
				/>
				<p>
					Summer is over. Senior year. First week of school. Labor Day weekend. You know what that means...
					IT’S BOIDS TIME! Wait, I know what you’re about to ask. &quot;But Elijah Cirioli, owner of{" "}
					<Link href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">www.elijahcirioli.com</Link>, what is a
					boids????&quot; Excellent question, dear reader! Please click my ads. I had a little extra time
					because of labor day so I did what I always do with my extra time: I watched YouTube. Through the
					magic dartboard of YouTube recommendations I came across{" "}
					<Link href="https://www.youtube.com/watch?v=bqtqltqcQhw">this video</Link> by a guy named Sebastion
					Lague. It’s a pretty neat video that gets into some 3D stuff that’s too advanced for me but my main
					takeaway from it was that boids exist and I needed to make some.
				</p>
				<p>
					Picture this: the year is 1987, <i>The Simpsons</i> have just appeared on television for the first
					time, Ronald Reagan has just given his famous speech in front of the Berlin Wall, and most
					importantly, computer graphics specialist Craig Reynolds is about to release his groundbreaking
					research paper{" "}
					<Link href="http://www.cs.toronto.edu/~dt/siggraph97-course/cwr87/">
						Flocks, Herds, and Schools: A Distributed Behavioral Model
					</Link>
					. In this paper Reynolds describes boids, a model for simulating emergent flocking behaviour not
					dissimilar to that of birds or fish. The concept is very basic, with only three simple rules one can
					create varied and adaptive flock behaviour at little computational cost.
				</p>
				<p>
					What are those three rules? Hold all questions till the end, please. All boids are just a collection
					of 2D vectors. At the beginning, the boids are spawned in with a random position and a random
					velocity vector. Each game tick, the three rules are applied, creating three additional vectors
					which are then added to the current velocity vector and normalized to a set length. These vectors
					can also be weighted in different amounts to produce different types of emergent behaviour, which is
					something I have implemented in my version. The last item I need to discuss before I get into the
					rules of boids (it’s suspensful, I know) is how an individual boid perceives its environment. Boids
					all have a defined view distance that specifies how far they can see and view angle that specifies
					their field of view. In my implementation, this translates to boids being able to see all the boids
					within around a 100 pixel radius of them, but not directly behind them. The boids that they can see
					are referred to as their neighbourhood.
				</p>
				<LabeledImage
					src="/projects/boids/about/separation.png"
					style={{ width: "30%", float: "right", margin: "0.8em 0 0 1em" }}
				/>
				<p>
					Rule one: <s>don’t talk about boids</s> separation. Put simply, boids will try to steer away from
					all other boids within their neighbourhood. This rule creates a bunch of vectors pointing directly
					away from the boid’s neighbors with a magnitude inversely proportional to the distance between the
					two boids. All of these vectors are added up and then normalized to a length of one, essentially
					meaning that the strength with which the resultant vector points in each direction is based on which
					of the boid’s neighbors are closest. That explanation may have been a bit wordy, so here’s a nice
					picture that I found on wikipedia.
				</p>
				<LabeledImage
					src="/projects/boids/about/alignment.png"
					style={{ width: "30%", float: "right", margin: "0.8em 0 0 1em" }}
				/>
				<p>
					Rule two: alignment. Boids will attempt to align their angle of travel (also known as their heading)
					with that of their neigjbors. This translates into creating one large vector by adding up all of the
					velocity vectors of a boid’s neighbors and then again normalizng the length to one. It’s pretty
					simple, but I need to fill a little more space so that this image can fit nicely so I’ll restate it
					one more time. The velocities of all of the boid’s neighbors, regardless of distance, are averaged
					and added to the current boid’s velocity.
				</p>
				<LabeledImage
					src="/projects/boids/about/cohesion.png"
					style={{ width: "30%", float: "right", margin: "0.8em 0 0 1em" }}
				/>
				<p>
					Rule three: cohesion. This is where things get complicated... Just kidding! You can consider
					yourself pranked because this one is super easy as well. First the average position of all
					neigboring boids is calculated, and then a vector is created pointing from the current boid to that
					position. This means that all of the boids are attempting to fly towards the average position of all
					of their neighbors.
				</p>
				<p>
					That’s it. When those three rules are active at the same time, complex behaviour emerges. The boids
					try to fly in the same direction as each other, while trying to stay packed tightly together, while
					also trying to not actually collide with one another. Well, that was me describing basically what
					the research paper says, but what did I actually contribute myself? I wanted to make my version a
					fun little interactive screensaver where the player could tweak different settings to see what kind
					of behaviour they could create.
				</p>
				<p>
					I made some simple mouse interactions that allowed users to create more boids or to force them to
					scatter. This is done by adding a fourth velocity vector to all of the boids that points directly
					away from where the mouse was clicked. I added two sliders to control the speed, which is the length
					to which the velocity vectors of all boids are normalized, and the inertia, which controls the total
					weight of the vectors that are added to the current velocity. With less weight on the vectors, the
					current velocity doesn’t change as much, equating to the boid having more inertia. I then tried my
					hand at creating a triangle selector so that the weights of the three rules could be controlled
					individually as well. I heard you can use jquery for this, but I’m still learning that so I decided
					to use the classic javascript + HTML canvas that I love so much. The end result is far from great,
					but it was already the Tuesday following labor day so I was ready to be done. The controls took me
					about as long, if not longer, than creating the boids themselves. A lot of that can be attributed to
					my inexperience with HTML, but it still goes to show how easy creating boids actually is. Thanks,
					Craig Reynolds, and thanks <Link href="https://www.w3schools.com/">W3Schools</Link> for teaching me
					how to make sliders.
				</p>
			</TextWrap>
		</>
	);
}
