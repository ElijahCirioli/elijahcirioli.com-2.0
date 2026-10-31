export const colors = [
	"light-green",
	"green",
	"dark-green",
	"darker-green",
	"light-gray",
	"gray",
	"dark-gray",
	"white",
	"black",
	"shadow",
	"highlight",
	"link",
	"visited-link",
];

export function applyThemeColorsToDocument(targetDocument: HTMLDocument) {
	try {
		const styles = getComputedStyle(document.documentElement);
		for (const colorName of colors) {
			const colorValue = styles.getPropertyValue(`--theme-${colorName}-color`);
			targetDocument.documentElement.style.setProperty(`--ec-theme-${colorName}-color`, colorValue);
		}
	} catch (e) {
		console.log("Failed to apply theme colors to document", e);
	}
}
