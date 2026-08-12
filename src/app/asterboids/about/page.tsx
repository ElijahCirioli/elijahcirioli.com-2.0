import Link from "next/link";
import Header from "@/components/Header";
import TextWrap from "@/components/blog/TextWrap";

export default function Home() {
	return (
		<>
			<Header />
			<TextWrap title="About Asterboids" date="Spring 2020">
				<p>
					Everyone loves boids, I’m sure there’s no disagreement about that, but there is one question that
					has plagued us all since I first made <Link href="/boids">boids</Link>: where are the boints? The
					yearning for boints (boids-points) comes from the desire to make a game out of something as cool as
					boids. I am a man of the people but I’m also all about efficiency so I saw this as an opportunity to
					make something inspired by my favourite arcade game, Asteroids. This project was a massive
					undertaking, completed over several months, and totalling over 3.5 thousand lines of code. The game
					may be considerably more niche than I initially let on but I couldn’t be more pleased with the
					result.
				</p>
				<p>
					Here’s the pitch: an arcade-style space ship game where you run away from a swarm of bird-like
					enemies while avoiding asteroids. The concept was pretty simple, so most of my time went into polish
					as well as refining the physics and difficulty. Of course this project was built around 2D vectors
					just like everything else I make, but for this project I abstracted vectors one step further to make
					particles for all the fancy graphical effects present in the game.
				</p>
				<p>
					I began by creating the basic controls for the ship with a simple physics system and then I was able
					to apply the camera technology I worked on for the <Link href="/spire">SPIRE engine</Link> to have
					an invisible bounding box that would let the player push the camera around the screen. Sometimes I
					will develop entire games with just rectangles and lines as artwork up until the very end, but since
					I was focusing on polish I wanted to take the time to make things look nice at each step of the way.
					At this point I created sprites for the ship and 4 different background layers. I then implemented a
					parallax scrolling effect for the background and a feature that slowly centers the camera back on
					the player as they slow down.
				</p>
				<p>
					Once I had the controls for the ship feeling tight enough, I took my first crack at particles. The
					exhaust particles are assigned one of three colors as well as a random size, speed, and angle. They
					get assigned to come out of either the left or right thruster and then they slowly fade away as they
					get farther from the ship. I think these look really nice, but their implementation is a little
					janky. If I refactored this I could probably do it with fewer variables.
				</p>
				<p>
					I then implemented the shooting mechanics for the player using the same alternating methods as the
					exhaust particles to switch between the left and right guns. I would end up tweaking this a lot to
					adjust the difficulty later but at this point almost all of the player mechanics were done. It was
					now time for me to take another break from coding to make a bunch more art. I made a quick sprite
					for the laser and then I began the process of drawing the asteroids.
				</p>
				<p>
					I first drew a big mothership in the same style as the player and then I began to tear it apart to
					create the big chunks of debris that would serve the role of asteroids. I split the initial sprite
					into four sections and then each was allowed to break twice so I ended up creating 28 different
					asteroid sprites. This took a long time but I think it was worth it because it looks like the
					asteroids break apart pretty convincingly into smaller chunks. Actually coding the asteroids was
					pretty simple. Upon spawning in they randomly pick two points on different outside edges of the map.
					They are giving a random speed, size, and rotational velocity and are set out on their path across
					the map.
				</p>
				<p>
					It was now time for some more polish so I created a function to make particle explosions of any size
					and I added them when asteroids explode and when the player dies. I also added a little bit of
					camera shake when this happens to really sell the effect. At this point I kinda got bored with the
					project and I started focusing on other things but after school was closed for COVID I jumped back
					in and was finished in about a week or so.
				</p>
				<p>
					Coming back I immediately decided to work on the main attraction: the boids. If you read my initial
					write up of boids, you’d know that they navigate by following three very simple rules. They try to
					separate themselves from other boids, they try to match the direction that the other boids fly in,
					and they target the center of clusters of nearby boids. For this project I added three additional
					rules. The boids will try to target and fly towards the player, they work extra hard to avoid boids
					that are extremely close to them, and they try to avoid obstacles like asteroids and the walls. Each
					of these rules has a weight attached and I randomly skew the weights of each boid just a little bit
					upon spawning them in.
				</p>
				<p>
					To try and control the pacing of the game and stop it from being a non-stop pursuit I implemented an
					AI director who controlled the difficulty by affecting the targeting weights of the boids and spawns
					in asteroids. The director tries to determine if the player is getting closely chased for a long
					period of time and then tells the boids to back off a little bit to let the player breathe. It takes
					into account both the level that the player is on and also how many boids are remaining to make sure
					it doesn’t go too easy on the player.
				</p>
				<p>
					With the director implemented, the core functionality that I had planned out was almost entirely
					done. I added a hyperdrive mechanic that I had planned for the player that let them get out of
					sticky situations in a pinch (and see some cool particles). The next goal was to add variety to
					allow for more tactics. I added two different variations of boids, one that splits into two more
					boids when shot and one that explodes when shot, potentially taking out other boids with it. I also
					began work on a powerup system.
				</p>
				<p>
					These powerups would be spawned in around the map by the director and could be flown through by the
					player to be picked up. First I made a powerup to slow down time which was pretty easy, then I made
					one to create a shield around the player so that they could survive an extra hit. The third power up
					was much more difficult, I decided I wanted to make a big laser that could kill a bunch of boids all
					at once. I ended up drawing this without sprites, although that probably would have been easier. The
					effect consists of a bunch of rectangles stacked on top of each other of different sizes, colors,
					and opacities. I think this looks pretty good and some nice screen shake helps sell it. The hitbox
					of the laser is actually not a rectangle but a bunch of overlapping circles because that better fit
					the systems I had already built.
				</p>
				<p>
					I was a few days out from when I hoped to release the game at this point so it was time for the
					final sprint. I added a scoring system and a HUD with a little minimap. The last gameplay feature I
					would add was a boss fight which would appear every ten waves. This meant I had to make another big
					mothership sprite this time in the same style of the boids. I gave it some rudimentary pathfinding
					and two attacks: one where it shoots out a bunch of boids and another where it uses the same big
					laser attack that I worked on earlier. This was very cobbled together, but I think it came out
					ultimately better than the sum of its parts and I think it’s actually pretty fun.
				</p>
				<p>
					The last day or two was devoted to final polishing. I spent a few hours adding a pretty basic
					introductory cutscene and a few more hours drawing a menu. The menu art isn’t great but it’s about
					as good as I could hope given my lack of artistic skill. I do think the title art came out looking
					especially nice. I also added an options menu with a couple settings, as well as sound effects for a
					bunch of different stuff in game. Lastly I added a leaderboard system which was super easy because I
					was able to borrow much of the code from the <Link href="/tetrisnt">Tetrisn’t</Link> leaderboard.
				</p>
				<p>
					The game is certainly very difficult, perhaps too difficult for some, but I’m fairly pleased with
					the challenge. It has much of its roots in arcade games which are also very difficult, but there is
					a little unfairness due to lack of visibility. If the game took up the whole screen rather than a
					800 by 600 window it would probably be a lot easier but that was something I didn’t really want to
					deal with. I’m sure I could clean up a good bit of the code to make it more streamlined especially
					with the particle systems, but I think this represents a new high for me in terms of both visual
					polish and attention to detail.
				</p>
			</TextWrap>
		</>
	);
}
