import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Footer from "@/components/Footer";
import "./globals.css";

config.autoAddCss = false;

export const metadata: Metadata = {
	title: "Elijah Cirioli",
	description: "A portfolio of some of my javascript projects",
	icons: [
		{
			rel: "apple-touch-icon",
			sizes: "180x180",
			url: "/favicon/apple-touch-icon.png",
		},
		{
			rel: "icon",
			sizes: "32x32",
			url: "/favicon/favicon-32x32.png",
			type: "image/png",
		},
		{
			rel: "icon",
			sizes: "16x16",
			url: "/favicon/favicon-16x16.png",
			type: "image/png",
		},
		{
			rel: "manifest",
			url: "/favicon/site.webmanifest",
		},
		{
			rel: "mask-icon",
			url: "/favicon/safari-pinned-tab.svg",
			color: "#5bbad5",
		},
	],
	openGraph: {
		type: "website",
		url: "https://elijahcirioli.com/",
		title: "elijahcirioli.com",
		description: "A portfolio of some of my javascript projects",
		images: {
			url: "/landing/thumbnails/open_graph_thumbnail.png",
			alt: "Preview image for elijahcirioli.com",
			width: 1718,
			height: 1278,
		},
	},
	twitter: {
		card: "summary_large_image",
		title: "elijahcirioli.com",
		description: "A portfolio of some of my javascript projects",
		images: {
			url: "/landing/thumbnails/open_graph_thumbnail.png",
			alt: "Preview image for elijahcirioli.com",
			width: 1718,
			height: 1278,
		},
	},
	metadataBase: new URL("https://elijahcirioli.com"),
};

const fontMontserrat = Montserrat({ subsets: ["latin"] });

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={fontMontserrat.className}>
				{children}
				<Footer />
			</body>
		</html>
	);
}
