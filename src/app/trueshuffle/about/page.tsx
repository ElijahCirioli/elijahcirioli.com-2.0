import TextWrap from "@/app/components/blog/TextWrap";
import Header from "@/app/components/Header";

export default function Home() {
	return (
		<>
			<Header />
			<TextWrap title="About True Shuffle" date="Fall 2020">
				<p>
					Like many people before me, I am often annoyed at the shuffle functionality in Spotify. While I
					haven’t conducted any kind of statistical analysis to prove it, anecdotally I can say that they
					always like to start with the same 3 to 5 songs even when the playlist has hundreds. I really just
					made this to use myself so that I could actually trust that my songs were in a random order, or at
					least random enough. I don’t want to get into a whole discussion about pseudorandomness.
				</p>
				<p>
					The tool itself is incredibly bare bones, but I think it gets the job done well enough. The Spotify
					API was pretty decent, and it allows you to do some really powerful things. The authorization model
					is also nice because you can do it entirely without your own backend. It does have some real
					problems with consistency when it comes to how it wants you to pass arguments in the JSON strings
					and a lot of the functions use totally different formats for their parameters. I’d also say it’s a
					little annoying how specific your GET requests have to be. You end up needing to make several
					requests to get different bits of the information you need when I would have made it just return a
					larger JSON argument that contained all the relevant information but what do I know. I’m not really
					on the GraphQL train, but someone who is would probably tell me that this is a good use case.
				</p>
			</TextWrap>
		</>
	);
}
