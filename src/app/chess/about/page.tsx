import Link from "next/link";
import Header from "@/components/Header";
import TextWrap from "@/components/blog/TextWrap";

export default function Home() {
	return (
		<>
			<Header />
			<TextWrap title="About Public Chess" date="Spring 2021">
				<p>
					A while back I teased a trilogy of chess-related projects and it seemed like implementing the game
					of chess itself was a good place to start. I had two main goals for this project: I wanted to see
					how hard it was to program chess, and I wanted to expand on what I did in{" "}
					<a href="/projects/vote/">Movie Ballot</a> where I implemented real time multiplayer using{" "}
					<a href="https://firebase.google.com/">Google Firebase.</a>
				</p>
				<p>
					The game of chess serves as a good exercise in object-oriented programming. I started by creating a
					generic Piece class that had a position and color as well as a few other variables. I defined all
					the other pieces as inheriting from that class and each one overwrote the getMoves() function. This
					allowed me to use polymorphism in the higher-level game logic to get the available moves for a given
					piece without actually caring what type of piece it was. I started by adding the basic moves for all
					the pieces, with many of them using a helper function to find all available moves in a given
					direction. I added a special case where the pawn was able to move two spaces based on whether it’s
					hasMoved flag was set to false. At the start of the game these pieces were all placed in a 2D array
					that represents the board.
				</p>
				<p>
					I added a flag for whose turn it was and just like that I had a very rudimentary chess game
					implemented. From there things got progressively more complicated. My next steps were fairly easy
					things like capturing pieces, and I eventually moved on to check. To test if the current player was
					in check, I looked at all of the opponent’s possible moves and checked if any of them would capture
					the king. That was easy enough, but then I had to make sure that the player couldn’t put themselves
					into check. After the player clicked on a piece and generated the list of possible moves, I made
					several copies of the board and pretended to make each move. After making the move I ran the check
					test and if it came back true then I removed that move from the player’s list of options. This isn’t
					really the most efficient way to do this, I think I would be better off keeping track of all the
					squares that the opponent is currently able to attack and using that to figure out check, but this
					worked well enough.
				</p>
				<p>
					From here I added some special moves like castling and en passant, which all came with their own
					sets of special cases. As you get into the more complex chess rules, their interactions create many
					edge cases that you need to check, such as castling through check. The last big things to implement
					were checkmate which was a natural extension of the check system and promotion. It would be nice to
					have a UI that lets the user pick what they would like to promote their piece to but I didn’t really
					want to do that so in my version pawns always promote to queens. After I got all of these things
					working correctly it was just a matter of testing as many edge cases as I could think of. I haven’t
					tested enough to be 100% sure but I think I have everything working as it should.
				</p>
				<p>
					Now it was time to move on to the multiplayer aspect of this. In Movie Ballot I experimented with
					using Google Firebase for a sort of peer-to-peer system with no central server logic. It’s not
					actually peer to peer in the sense that there is a central database, but the logic is calculated by
					the clients and shared among themselves. I will again say that this is not a good way to implement
					multiplayer, but I thought it was very interesting and I wanted to see how far I could push it. I’ve
					been reading a lot about WebSockets lately and they seem surprisingly easy so I will probably make
					something soon with more traditional multiplayer.
				</p>
				<p>
					Firebase is a non-relational database so it acts essentially like a big json object. I have a lot of
					extra bits of information stored in this database such as timestamps and hidden user ids, but the
					core of the data structure is that I have an array of games, which each have an array of turns. Each
					of these turns stores what color it is, and an array of every piece still on the board. This is not
					like the 2D array that’s used in the game logic, but rather just a list of each piece which has an x
					and y coordinate stored with it along with a type, color, and whether it has moved. The state of a
					chess game is commonly represented using{" "}
					<a href="https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation">
						Forsyth-Edwards Notation
					</a>
					. This is nice for many reasons, especially because it is fairly concise, but I chose not to use it
					here. I would rather use the hierarchical json structure that I have access to rather than encoding
					everything as characters in a string. FEN does store a lot of the same information such as who can
					still castle and where, but it is encoded in a pretty arbitrary way. If I do this all again I may go
					through the trouble of implementing a FEN encoder and decoder, but I wasn’t that concerned with
					efficiency when I made this and I was able to pretty much upload my existing data structure directly
					to the database which was pretty nice.
				</p>
				<p>
					One of the best things about Firebase is that you can set up listeners to trigger events when the
					database is updated. This allows multiple people to play with each other in real time without having
					to ping the database periodically. The client listens for when anyone else updates the game state,
					and it adjusts the client’s view accordingly. I added a lot of UI features to let the users navigate
					through this database, looking at previous moves and previous games. Every move of every game is
					stored forever which isn’t a big deal for this since no one really uses it, but if this was popular
					that could eventually become an issue.
				</p>
				<p>
					I think the user interface came out pretty well. There is a bit of a clash between the square and
					rounded elements, but the use of animation and shadows is pretty nice in my opinion. The art for the
					pieces is the same{" "}
					<a href="https://commons.wikimedia.org/wiki/Category:SVG_chess_pieces">
						Wikimedia Commons chess pieces
					</a>{" "}
					that are used in all sorts of places. I’d love to make my own set at some point but I don’t have the
					artistic skill for that just yet. Towards the end of the project I figured that it would be nice to
					have a chat feature to make the game feel a little bit less lonely. This didn’t use the same
					Realtime Database, but instead Cloud Firestore. This turned out to be incredibly easy to implement,
					although it should be noted it’s not secure in any way at all. Messages get deleted after 12 hours
					but in that time anyone can view them. I think I know how I could do a lot of security stuff, but if
					I want to keep this as something that doesn’t require any kind of sign on at all then I think it’s
					impossible.
				</p>
				<p>
					I’m pretty pleased with how this project came out, and I think it’s a much more refined (albeit less
					ambitious) use of Firebase than Movie Ballot. A decent number of people have made suggestions for
					it, but they all push it towards being just a worse version of lichess. I know there’s nothing
					competitive about this, that’s the point. It’s just supposed to be a casual thing where you can drop
					in and play a few moves when you’re bored. For that purpose I think it does a good job.
				</p>
			</TextWrap>
		</>
	);
}
