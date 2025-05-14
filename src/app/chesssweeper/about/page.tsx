import Link from "next/link";
import Header from "@/components/Header";
import TextWrap from "@/components/blog/TextWrap";

export default function Home() {
	return (
		<>
			<Header />
			<TextWrap title="About Chess Sweeper" date="Fall 2022">
				<p>
					For some reason that I can’t quite remember, I had a moment a few years ago where I envisioned a
					series of different chess-related projects that I wanted to create. The first of these was the{" "}
					<Link href="/chess">public chess board</Link> I built that was more or less just implementing the
					standard game of chess (which is surprisingly annoying to do). Many of the other chess ideas I had
					at the time involved mashing up chess with other other games and concepts which is a pretty common
					way for me to generate project ideas. I think that some of these ideas like Rubik’s cube chess could
					be really interesting to theorize and strategize about, but wouldn’t actually be very fun to play.
					The one idea that I actually started in the Spring of 2021 was a mashup of chess and minesweeper.
					This was a good first target since it isn’t too ambitious. After all, minesweeper is a fairly simple
					game to implement.
				</p>
				<p>
					Despite this being a simpler project, I never finished it at the time. Maybe I got bored, or maybe I
					just thought that the game wouldn’t end up being fun so I shouldn’t spend time finishing it. I
					recently looked back at this project I had started about 18 months earlier and realized that I had
					pretty much stopped right before the finish line. I was procrastinating studying for my final exams
					so I decided to push it across that line. To my surprise, the game was actually really fun. The
					prototype version that I started as a freshman can be{" "}
					<Link href="/projects/chesssweeper/prototype/index.html">played here</Link>.
				</p>
				<p>
					Despite the two games that inspired it, chess sweeper doesn’t actually have that much in common with
					chess or minesweeper. It reminds me most of sudoku or one of those grid-based logic puzzles. There
					is a real sense of strategy to maximizing the amount of information gained for each piece used. In
					regular minesweeper you are more or less just performing a fairly simple algorithm over and over,
					but I think chess sweeper has another level of depth and strategy to it. After playing for a few
					days I was able to beat the prototype fairly consistently and I decided it was time to make this
					into something real.
				</p>
				<p>
					The way past-me designed the prototype isn’t really bad, but current-me found it kind of annoying. I
					was storing a lot of the game information in the DOM itself using classes, ids, and event listeners.
					This can be a good strategy, but I think I was trying too hard to be clever with it at the time and
					it just ended up being cumbersome to work with. Because of that, I decided to start fresh to create
					my final version of chess sweeper.
				</p>
				<p>
					The gameplay in the final version is unchanged with one exception. After playing the prototype it
					was immediately clear that I needed some way to mark squares as safe or dangerous. Despite how
					simple it is, I think this tool is fundamentally important to how enjoyable the game is to play. It
					could still be improved I think, I’d especially like to be able to click and drag it to mark lots of
					squares quickly.
				</p>
				<p>
					I think the visual design I came up with is pretty decent. I even made custom piece icons because I
					was sick of those wikimedia ones that are used everywhere. Mine aren’t amazing by any means, but I’m
					happy with them. I think I overcommitted to putting everything inside of the red square, but it is
					what it is. The biggest issue I think is that there is just so much information packed inside of the
					little squares on the board. It can be difficult to distinguish the pieces and the numbers,
					especially when the squares are very small. I don’t have a good solution to this, but I’m sure
					somebody else could come up with one. My favorite visual element has to be the explosions when you
					trigger a mine. They were inspired by the explosions from <Link href="/asterboids">asterboids</Link>{" "}
					and I think they provide a lot of personality.
				</p>
				<p>
					There’s a lot of opportunities for UI improvement surrounding the temporal aspect of the game.
					Because pieces obstruct other pieces you can learn a lot by seeing how the numbers of a piece change
					when you block its sight in different directions. Once the number changes, it never goes back to
					what it was before, so you need to make sure that you remember what it was. If you wanted to show
					someone a still frame of the game for help they could treat it as a self-contained puzzle, but it
					would really help them to know that different pieces used to display different numbers. I’m not
					quite sure how best to remedy this problem, but you can get part of the way there just by marking
					cells as safe or dangerous. One solution would just be to add in a tool for looking back through the
					history of the game to see how things have evolved, similar to what I have on my public chess board.
					Another solution could be a highlight representing where you’ve just placed a piece and something
					indicating that the number of a piece has just gone down because of that move. This would mean
					conveying more information with highlights and the piece numbers which are already doing too much so
					I don’t really like it. I will have to think more about whether there is an elegant way to convey
					this information.
				</p>
				<p>
					As a whole I am super happy with how this project turned out. It’s a simple game, but I think the
					concept is strong, and I’m glad to have been wrong about giving up on it. Unlike most things that I
					make, I’m probably the best person in the world at playing it (for now). I’ve been able to beat
					level 15 which is the second hardest level, but I haven’t beat level 16 yet. The difficulty jump
					there is pretty significant and it may turn out to actually be impossible. I’m sure someone could
					calculate the entropy of it, but for now I’ll keep trying to beat it.
				</p>
			</TextWrap>
		</>
	);
}
