textbox.addEventListener('click', () => {
	focus();
});

textbox.addEventListener('blur', () => {
	unfocus();
});

console.log("my essental code have ran!");

// goofy ahh code gonna run every time you hit a key, ggs.
// TODO: make code to unregister event listener? I don't trust JIT if it can't handle a while(true)
document.addEventListener("keyup", e => {
	// use case switch when too much if statements
	if (e.key === "Escape") {
		// TODO: handle esc closing the <dialog> element. see functions.js's closeDialog();
		// could add variables defining whether a dialog is open or not...?
		unfocus();
	} else if (e.key === '.') {
		focus();
	}
});
document.addEventListener("keydown", e => {
	// this is for control + whatever
	if (e.ctrlKey && e.key === "s") {
		e.preventDefault();
		download(textbox.innerHTML, "text.txt");
	}
})

// remove styling on paste
// this should be its own eventlistener because the user might use the system clipboard or something else instead of control+v
textbox.addEventListener('paste', (e) => {
	e.preventDefault();
	// FIXME: execCommand deprecated 💀
	document.execCommand('insertText', false, (e.clipboardData || window.Clipboard).getData('text/plain'));
});

document.getElementById("settings-light-toggle").addEventListener('change', function() {
    if (this.checked) {
		replaceCSSFile("style/dark.css", "style/light.css");
		snackbar("Let there be light", "Successfully changed the theme to light.");
    } else {
		replaceCSSFile("style/light.css", "style/dark.css");
		snackbar("The modern world loves darkness.", "Successfully changed the theme to dark.")
    }
});

console.log("Script.js parsed and ready!");
document.getElementById("settings-light-toggle").checked = false;

// snackbar("hi", "something happend");
// snackbar("hi", "something happend and stuff im making this message extremely long for the jokes WOOOOOOOOOOOOO Lorem ipsum dolor sit amet justo diam lobortis no et amet justo consetetur lorem elitr invidunt dolore sit dolores sadipscing et rebum. Dolores mazim ipsum voluptua magna sed. Aliquyam facilisis kasd nibh ut sadipscing eos praesent illum sea vulputate consequat consequat sanctus elitr magna dolor. Nonumy sea enim dolore elitr consectetuer amet consequat vero. Nobis ea sadipscing nostrud elit nisl vero vero. Diam dolor lorem amet amet dolore. Dignissim duo et ea. Sanctus vero diam sadipscing et in vel. Sadipscing sed et dolor nonumy dolores labore luptatum dolore et sed adipiscing praesent suscipit kasd nonumy nonumy et rebum. Consequat ea et amet feugiat at invidunt no et ad gubergren et clita in labore. Molestie minim sed labore iriure sadipscing hendrerit aliquyam voluptua et diam takimata no tempor dolor ad sanctus gubergren blandit. Consetetur eos vero dolor eros sadipscing adipiscing molestie euismod at et sed accusam labore. Dolor ipsum aliquyam ullamcorper diam dolor consequat et doming lorem volutpat sit erat diam dolor molestie. Takimata takimata praesent duis takimata.");