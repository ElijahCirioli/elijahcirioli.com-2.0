import Link from "next/link";
import TextWrap from "@/app/components/blog/TextWrap";
import Header from "@/app/components/Header";

export default function Home() {
	return (
		<>
			<Header />
			<TextWrap title="About Zing" date="Spring 2022">
				<p>
					A couple of my <Link href="/projects/vote/">recent</Link>{" "}
					<Link href="/projects/chess/">projects</Link> have revolved around somewhat-realtime
					communication between multiple users. I achieved this through fairly hacky means using
					Google Firebase, so I figured that it was time to figure out the proper way to do
					bidirectional client-server communication. This means that all the clients can send
					updates to the server and importantly the server can send messages back to trigger events.
					Trying to do this with regular HTTP requests rather than websockets would mean that the
					client and server can communicate, but the timing of it is controlled completely by the
					client. The server couldn’t decide to send a message out of the blue to the client.
				</p>
				<p>
					I suspected websockets were going to be really easy to learn, so I wanted to do a project
					that would take things a bit further. I decided to create a video chatting application
					that would use the WebRTC API which is built for peer-to-peer communication with a focus
					on audio and video. This WebRTC connection will allow two users to stream audio and video
					to each other without it passing through the server at all. The purpose of the server here
					is to allow the two clients to send each other messages in order to negotiate the WebRTC
					connection. When streams are added or dropped (such as when muting) the connection must be
					renegotiated. The server here is acting as a middleman in this conversation, passing these
					negotiation messages between the users but not touching the camera streams themselves.
				</p>
				<p>
					Getting this WebRTC connection to work was challenging, especially because the API itself
					is only partially implemented in most browsers. I got a basic idea of what to do from
					these{" "}
					<Link
						href="https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Signaling_and_video_calling"
						target="_blank"
					>
						two
					</Link>{" "}
					<Link
						href="https://simplecoding.dev/articles/nilmadhab/let-s-build-a-video-chat-app-with-javascript-and-webrtc-29cd"
						target="_blank"
					>
						guides
					</Link>{" "}
					and figured the rest out through a lot of experimentation. In addition to the web server
					that routes the messages between the two clients, it’s also necessary to specify TURN and
					STUN servers to deal with NAT and firewall issues. The TURN servers act as a fallback
					relay to ensure that the stream data can make it to its destination.
				</p>
				<p>
					The server code for this is pretty small. It’s a pretty standard express web server that
					hosts the page, passes the messages between clients using websockets, and manages the
					different rooms. In addition to the WebRTC messages which include things like session
					descriptions and ICE candidates, the clients will also send messages for events like
					changing their name or ending the call.
				</p>
				<p>
					The whole front end was kept pretty barebones since the focus was using WebRTC, not making
					a beautiful video chat interface. I like that you don’t need to make an account and it’s
					easy to just share a link, but there’s definitely things that could be improved. People
					would appreciate a chat I’m sure and being able to move around the video boxes would be
					nice.
				</p>
				<p>
					This could definitely be expanded as well to support calls between more than two people
					and also things like screen sharing (aka livestreaming). Maybe someone else will want to
					do that in the future, but I’m happy with how this turned out now, even if it is simple. I
					definitely want to find an excuse to use websockets again but I don’t know what that is
					just yet.
				</p>
			</TextWrap>
		</>
	);
}
