import Link from "next/link";
import Header from "@/components/Header";
import LabeledImage from "@/components/blog/LabeledImage";
import TextWrap from "@/components/blog/TextWrap";

export default function Home() {
	return (
		<>
			<Header />
			<TextWrap title="About Movie Ballot" date="Spring 2021">
				<p>
					As you may have guessed, this project is <Link href="/projects/trueshuffle">another one</Link>{" "}
					that’s made pretty much exclusively for me. I am not lacking in movies that I want to watch, so some
					sort of movie recommendation engine wouldn’t be that helpful to me (and also really difficult to
					implement well). Where I struggle is deciding what exactly I am going to watch from my list,
					especially when my family members start getting involved. I wanted to create a tool that would help
					us to quickly narrow down everyone’s selections into a single choice in a way that would feel fair
					and hopefully leave everyone happy. Over a single weekend I worked pretty rapidly, completing about
					50% of the project before getting bored of it and pushing it onto the back-burner. A few months
					later I decided that enough was enough and I would finally get it done. I perhaps overestimated how
					close to completion I was at the time (I had thought like 70%) but I was able to get it done over
					about another week of sporadic work.{" "}
				</p>
				<p>
					Now I should warn you, this project is an amalgamation of many terrible programming practices. I
					wouldn’t recommend anyone else do things this way, but I thought it would be interesting and I
					wanted to see how far I could push it. You see, this was going to be a multiplayer tool so everyone
					could submit their own suggestions for what to watch. One of my main inspirations was{" "}
					<Link href="https://kahoot.com" target="_blank">
						Kahoot!
					</Link>{" "}
					which you can see a little bit in the visual design. What I thought would be interesting is if I did
					this multiplayer functionality without ANY backend code. I’ve written plenty of backend servers to
					handle requests before, but I had been messing around with{" "}
					<Link href="https://firebase.google.com/" target="_blank">
						Google Firebase
					</Link>{" "}
					a lot lately and it had given me some ideas. Firebase has a lot of your usual features for these
					types of services, you can host your code and you can run cloud functions and stuff like that. I
					could do everything with cloud functions and technically call it “serverless” but that just wasn’t
					edgy enough for me.
				</p>
				<p>
					My idea was to use a Firebase feature called “realtime database” which is just a non-relational
					database kind of like NOSQL that you can attach listeners to. You can also update it directly
					through client-side javascript which is pretty cool. Some of my simplest backends just serve to
					connect HTTP requests from a browser to a SQL query, but doing things this way would cut that out
					entirely. My plan was essentially to use the database as an intermediary for all the devices to send
					their data to one another, and one user would be designated as the host who would actually process
					all of this data and compute results. I would later realize that I was essentially building a
					peer-to-peer system with an extra step in the form of the database. Rather than sending data
					directly to one another which would be quite difficult to do using only client-side Javascript they
					would send the data to the central storage location and everyone would download it. But it’s not a
					server I promise! It’s just a fairly large JSON object that everyone is updating.
				</p>
				<p>
					Now what’s actually wrong with this? Well… a lot. For one it’s incredibly insecure (just like you).
					I didn’t want to force people to make accounts so anyone is able to anonymously update the database.
					With no backend I can’t really validate that they’re sending the right type of data or that they’re
					not acting outside of their scope. Someone could theoretically modify my code and read all the data
					from every session that’s currently active. This would never fly on a professional level, but I knew
					that there would be no personal information stored in this database, it’s pretty much all random
					strings of characters that act as IDs. There’s never a text box where you type something and it gets
					posted on the server. I also just thought that this would be a really interesting experiment. I’ve
					never really done anything multiplayer before so I was really curious to see if I could do it. One
					of these days I’ll create a good multiplayer system with an actual server but at least this is a
					start.
				</p>
				<p>
					So how does this system actually work? Great question. When someone presses the button to create a
					new room, they create a new subdirectory in the database with the room’s 4 digit random ID. They
					become known as the host which is stored both client-side and in the database. Anyone who joins is
					assigned a 10 digit ID that is unique to them. The database stores everyone who has joined a given
					room in a subdirectory called users and it stores a state variable that tracks the current screen
					the room should be on.
				</p>
				<p>
					I mentioned listeners before which are really cool. Firebase can trigger an event on the client-side
					whenever something changes in a specified directory of the database. It would be amazing if I could
					do everything in this project using just listeners, but there was some functionality that meant I
					had to query the server manually. An important feature is tracking timestamps to see who is online.
					A lot of the other features for choosing movies ask you to wait for your friends to finish before
					you can move on. If someone closes their tab or leaves then I didn’t want you to be unable to move
					on. My solution was a function that would be called periodically to update a lot of the data. Every
					player would post a timestamp next to their name and they would check everyone else’s timestamp. The
					number of people that I list as online is simply the number of people in the list of players who
					have updated their timestamp in the last 90 seconds. The host also updates one big timestamp for the
					room itself. When a host goes to create a room they will delete any other rooms that haven’t been
					updated in 3 hours. This function also checks a few other things like how many people are done and
					what the current state of the room is. The interval that this function happens at affects the
					perceived responsiveness of the whole system, specifically in things like how fast it switches
					between different screens. If I update too frequently I might bump myself up out of the free tier on
					Firebase so I settled on updating 4 times a second as a nice middle-ground.
				</p>
				<p>
					The last thing that the database stores is a list of movies, but I will get into that a bit more
					later. Here’s an example of the data structure of a given room.
				</p>
				<LabeledImage
					src="/projects/movieballot/about/total.png"
					label="The structure of the database"
					style={{ width: "60%", maxWidth: "500px" }}
				/>
				<p>
					Again, I want to clarify that this is not a <i>good</i> way to do things, but I was curious if it
					would work and I have to say I’m pretty impressed. One bad practice that I can’t justify is the
					atrocious CSS. I’ve been trying to get better at this, I’m even taking a class about it for the
					first time now, but for whatever reason when I started this project months ago I decided to hardcode
					pretty much everything as pixel values. I don’t usually do that but I did then for some reason and I
					had to stick with a lot of it because the only thing worse than writing CSS is writing CSS twice. In
					general I’d say the design is pretty ugly. I should have used more than two colors and one font and
					I also should have made a clearer decision about what type of drop shadows I wanted to use. Right
					now it does work on most mobile devices and it is usable on desktop but it’s not that responsive and
					it’s definitely not pretty.
				</p>
				<p>
					Okay, so that’s how the database is structured, let’s talk about what it’s actually like to use.
					After the host has created a room and everyone has joined it, it’s time to add your movies. Everyone
					is brought to a page where they can search for every movie they want to watch. For this I used a
					service called{" "}
					<Link href="https://www.themoviedb.org/?language=en-US" target="_blank">
						The Movie Database
					</Link>{" "}
					which is like an open source version of IMDB. I can just pass their API the search terms from the
					user and receive a bunch more JSON objects in return. TMDB has somewhat inconsistent key names for
					their objects, so I had to filter through the results and turn them into my own movie objects that
					included things like the title, the description, and a url to a poster image. TMDB also gives each
					movie a unique 5 digit ID which is very helpful. Here’s what one movie object looks like.
				</p>
				<LabeledImage
					src="/projects/movieballot/about/movie.png"
					label="The data structure of an individual movie"
					style={{ width: "70%", maxWidth: "600px" }}
				/>
				<p>
					The users each add as many movies as they want to their personal list and when everyone is done (or
					the host decides to stop waiting) the state is updated and everyone posts their movies to the master
					list in the database, making sure to ignore duplicates. They get brought to a screen where they can
					see all the movies and then everyone pretty much just waits on the host to decide what to do. The
					host sees three buttons for their three options: pick randomly, ranked-choice voting, and approval
					swiping. These three choices were a key part of my initial design plan and I think they all
					complement each other nicely. The important concept is that you can use them all successively.
					Movies that make it through each round stay in the running and those that fail will become inactive.
					The next action you take will only affect the pool of movies that are still active. This lets you
					start with the most broad topics to narrow it down to the movies that people will generally like and
					then you can pick randomly from there.
				</p>
				<p>
					The random selection was of course the easiest to implement. Rather than just picking one winner to
					keep active it actually shuffles the order of the whole list of active movies. This means that if
					you really don’t like the result you can always take the second choice and so on. The swiping screen
					is a lot like Tinder. There are truly only two types of new apps that can come out these days: it’s
					either “Tinder for X“ or “Uber for X”. Well, I’m not about to make an exception to that rule. This
					screen displays large cards for each movie that have ratings and descriptions and you can either
					give them a thumbs up or a thumbs down on whether you’d be willing to watch it or not. Every movie
					that has at least 50% approval gets to move on. The trickiest part of this was letting you actually
					swipe the cards because I didn’t feel like doing this in a great way. I decided to use more
					Javascript but I bet you could even do it using the HTML drag and drop functionality. Dragging the
					mouse adjusts the absolute position of the card and when it passes a certain threshold it triggers
					the animation to send it away and bring in the next card. This works well enough but it’s a bit
					janky. If I was making a whole app based around this I’d be sure to do it better.
				</p>
				<p>
					The hardest action to implement was the voting. I wanted to do ranked-choice voting because I think
					it’s really interesting, but it turned out to be pretty complicated to actually program. The UX
					element of it was easy, it’s just creating an ordered list. When it’s time for the host to compute
					actual rankings from it I pass it off to a very large algorithm. Ranked-choice voting isn’t usually
					too complex. Voters rank their choices in order of how much they want them and if their favorite is
					eliminated then their vote just transfers down to their next choice in the line. What made this more
					challenging was that I wanted there to be an arbitrary number of winners as decided by the host. The
					algorithm essentially runs through this flowchart over and over until there are no more votes left
					to distribute.
				</p>
				<LabeledImage
					src="/projects/movieballot/about/flowchart.png"
					label="The ranked-choice voting algorithm explained"
					style={{ width: "70%", maxWidth: "600px" }}
				/>
				<p>
					What also makes it harder is that you don’t have millions or even hundreds of voters. You can’t
					guarantee that through enough rounds of the RCV algorithm that anyone will have enough votes to win.
					If there still aren’t enough winners then it triggers the failsafe and just picks whoever was ahead
					until the threshold is met. I’m confident that my implementation of this algorithm isn’t perfect,
					but it’s definitely good enough for what it is. I would probably have been better off just assigning
					a number of points based on where the movie ranked and then totalling all of those and comparing
					them but that’s not nearly as fun.
				</p>
				<p>
					That’s all the core functionality and I’d say it definitely satisfies the job I set out to complete.
					Right at the end I realized that I should add a very important feature which is host transferring.
					Before this anyone could leave and come back and it would be fine except for the host. If the host
					didn’t check in for 90 seconds then they would be marked as offline and everyone would be kicked
					back to the lobby. This is still how some big budget multiplayer video games do things but almost
					all users would agree that it really sucks when that happens. I realized that I could make it so
					that when there is no host, one person would be singled out as the new host and be given all the
					powers. This also introduced the edge case where the host leaves but then eventually comes back. In
					that case one of the players would assert themselves behind the scenes as the true host and the
					other host would step down.
				</p>
				<p>
					One last feature I added was to make it a true progressive web app. This basically just involved
					adding a service worker and some extra web manifest files but it meant that I could download the
					website as an app and view it without the url bar. I definitely want to do more stuff with PWAs in
					the future. They let you do things like run background tasks, send push notifications and store
					things offline which are all really nice features but I didn’t need to use any of them here.
				</p>
				<p>
					Overall I’m impressed that this holds together as well as it does. It’s not great but I’d say it’s
					probably better than the sum of its individual parts and it does what I set out to do. There were
					some really interesting algorithms, mostly related to the host’s computation, but most of the
					project was just a lot of jQuery. I don’t love that kind of frontend development but it can be fun
					sometimes. I just don’t think the end result looks like I put in as much effort as I actually did.
				</p>
			</TextWrap>
		</>
	);
}
