import Link from "next/link";
import Header from "@/components/Header";
import TextWrap from "@/components/blog/TextWrap";

export default function Home() {
	return (
		<>
			<Header />
			<TextWrap title="About Tetrisn’t" date="Spring 2019">
				<p>
					For my second semester of Junior year in high school I decided it was time to start another personal
					project. I am of the belief that Tetris is among the most well-designed games of all time, and much
					of that year was spent playing it when I should have been doing more important things. In my quest
					to play Tetris instead of doing work, I would often attempt to play at school. The school’s
					site-blocker proved difficult such that I could never find an unblocked site that I was happy with.
					Inevitably, these two concepts converged and I began work on a Javascript project that was
					absolutely legally distinct from the Tetris brand. I set out to create a game that was up to the
					high standards of my time wasting, but little did I know I had just begun my largest coding project
					ever that would consume the next several months of my life.
				</p>
				<p>
					Development was a fairly smooth process at first. The game itself is quite simple so I completed the
					core gameplay in a few weeks of spare classtime (with a solid week or so of that dedicated to
					solving a bug related to me missing a case of aliasing). The game was fairly small at this point and
					had all the basic features I wanted, so I set my mind on adding feature after feature to set it
					apart from all the boring JS Tetris-clones I had found on the internet. Adding functional features
					like wall-kicking, holding pieces, and score multipliers were simple, but visual features took much
					longer. I am not exactly <i>adept</i> when it comes to art, so creating things that looked at least
					somewhat decent took many hours of trial and planning. I settled on the galaxy theme because that
					meant I could just draw a bunch of random shapes and apply a heavy blur. The end result I thought
					looked pretty good by my standards, but every time I went to add new flair to the game I was forced
					into another cycle of repeated trial and error until I reached something I was happy with. This
					includes features like making sure all the pieces are centered in the upcoming queue, making lines
					flash white when they’re cleared, and displaying scores in real time when lies are cleared. I
					understand that it may not seem very impressive to most people, but I am very proud of the art I
					created for this game and I think it represents the high point in my visual design so far.
				</p>
				<p>
					After completing the core game to a degree that I was functionally and visually pleased with, I
					noticed that I was getting some interest in playing the game from my peers. At this point I made the
					decision that I had been thinking about for a while; I decided that after lots of polishing, I would
					release the game on my very own website. I couldn’t get ahead of myself, of course, I was about to
					begin the part of the project I had been dreading sine the beginning: the menu system. Making menus
					are incredibly boring, and doing so caused the size of my game code to nearly triple. I’m a bit of a
					stubborn guy, I don’t like using libraries since I prefer doing things myself, and for the menus I
					refused to use HTML because I knew Javascript better. I will concede that this was a bad choice, but
					I didn’t know much of anything about HTML at the time, it was before the creation of this website
					after all. The menus again took a lot of math, especially detecting whether the user is mousing over
					something, but there was no written planning involved. I used one variable I called
					&quot;state&quot; to track every possible thing the player could be doing within the menu including
					highlighting every possible element. This was far from the best choice since it became hard to keep
					track of what every state represented in my head by the end, but it was a simple system that I would
					still stand by for smaller menus at least.
				</p>
				<p>
					After completing the menus I figured that the game was ready for &quot;release&quot;. I bought the
					domain <Link href="www.elijahcirioli.com">www.elijahcirioli.com</Link> and created this site. Well,
					it didn’t really look like this. But it quickly became popular, at least within my computer science
					class. At this point I decided to commit further time to improving the game and adding features. I’d
					sporadically add new gameplay options like swappable block palettes, and my own custom system for
					Delayed Auto-Shift (DAS) with which I could customize the movement delay. I would also commission my
					close friend, James Nicholson, to produce an original song to accompany the gameplay. I really don’t
					know anything about music, but I was very pleased with what he created. At the same time I tried my
					hand at creating some sound effects to play alongside the game. They’re not amazing but I’m not too
					upset since I doubt many people play with sound on in the first place. I also added a bunch of
					random little features like T-Spin detection and reworked wall-kicking but those rarely get noticed
					by anyone which I’m okay with.
				</p>
				<p>
					The largest addition I ever made to Tetrisn’t post-launch was the addition of online leaderboards. I
					had dreamed of adding this since I discovered how interested my peers were in my game, and I had a
					rough idea of how I’d go about it, but I knew I’d have to learn a lot of new technologies to make it
					a reality. Eventually, I felt bold enough to give it a go. The system consists of a Node JS server
					running for free through Heroku. I had previously used Node JS for a couple chat-bot projects hosted
					on a Rapsberry Pi Zero W but that was kinda a pain to work with so I decided to go with Heroku this
					time. I finally got to learn all about git so I could get my code onto the server. It was about time
					I actually learned how to use it, and I was thankful to find out that I already knew a lot of what I
					needed from seeing git-related programming memes. The Node JS server is connected to a PostgreSQL
					server which is just the weird Heroku branch of SQL. SQL was new to me as well but that wasn’t too
					difficult. The end result has the main game sending GET and POST requests to the Node JS server
					which handles the data and stores it in the PostgreSQL table. This was a lot of work (and a lot of
					asynchronous callbacks) in the span of two days but the end result makes it worth it to me.
				</p>
				<p>
					This was far and away the largest programming undertaking I’ve completed. Through it I was able to
					learn a lot about maintaining projects post-launch and releasing things publicly. All in all, would
					recommend, please nobody sue me.
				</p>
			</TextWrap>
		</>
	);
}
