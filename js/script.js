const textbox = document.getElementById('textbox');
try {
	const textWrappingStatusText = document.getElementById('textWrappingStatusText');
	console.log(textWrappingStatusText.classList());
} catch {
	console.warn("a");
}
var clearOnClick = true; // haha boolean
var snackbarReady = true;

const debug = true;

textbox.addEventListener('click', () => {
	focus();
});

textbox.addEventListener('blur', () => {
	unfocus();
});

// goofy ahh code gonna run every time you hit a key, ggs.
// TODO: make code to unregister event listener? I don't trust JIT if it can't handle a while(true)
document.addEventListener('keyup', e => {
	if (e.key === 'Escape') {
		unfocus();
	}

	if (e.key === '.') {
		focus();
	}

	// if (e.key === "d") {
	// 	console.log("secret debug key hit");
	// 	settings();
	// }
});

// remove styling on paste
textbox.addEventListener('paste', (e) => {
	e.preventDefault();
	const text = (e.clipboardData || window.Clipboard).getData('text/plain');
	// FIXME: execCommand deprecated 💀
	document.execCommand('insertText', false, text);
});

///////////////
// FUNCTIONS //
///////////////

function dbglog(input) {
	if (debug) {
		console.log(debug);
	}
}

/**
 * read the damn function name lmao
 */
function toggleTextWrapping() {
	// TODO: this sometimes doesn't work
	// why?
	// i don't fucking know
	const wrapping = textbox.style.whiteSpace !== 'nowrap';
	textbox.style.whiteSpace = wrapping ? 'nowrap' : 'normal';

	dbglog("toggled text wrapping: " + wrapping);

	if (wrapping) {
		snackbar("success", "wrapping successfully enabled");
	} else {
		snackbar("success", "wrapping successfully disabled");
	}
}

function unfocus() {
	textbox.contentEditable = false;

	textbox.style.border = '1px solid #1b1b1b';

	if (textbox.innerHTML == "" || textbox.innerHTML == "<br>" || textbox.innerHTML == null) {
		// if its empty, then we change the stuff
		textbox.innerHTML = "Click to edit";
		clearOnClick = true;
	}
}

function focus() {
	if (clearOnClick) {
		textbox.innerHTML = "";
		clearOnClick = false;
	}
	textbox.contentEditable = true;
	textbox.focus();

	// todo: using css to do this fixes the flash of the uhhhh ykyk
	textbox.style.outline = 'none';
}

function download(variable, filename) {
	let x = JSON.stringify(variable).slice(1, -1);// remove the ""s at the beginning and end

	// thank you chatgpt for this amazingly formatted solution 💯💯💯💯💯
	const a = document.createElement('a');
	a.href = URL.createObjectURL(new Blob([x],{type: 'application/json'}));
	a.download = filename || 'text.txt';

	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
}

function settings() {
	const settingsmenu = document.getElementById("settingsmenu");
	const settingsinner = document.getElementById("settingsinner");

	if (settingsmenu.className == "modalOpen") {
		settingsinner.className = "modalClosed";
		settingsmenu.className = "modalClosed";

		setTimeout(function() {
			settingsmenu.className = settingsmenu.className.replace("modalClosed", "");
			settingsinner.className = settingsinner.className.replace("modalClosed", "");
		}, 360);
	} else {
		settingsmenu.className = "modalOpen";

		setTimeout(function() {
			settingsinner.className = "modalOpen";
		}, 100);
	}
}

// just dont make the text super long lmao
function snackbar(title, message) {
	const snackbar = document.getElementById("snackbar");

	if (snackbar.className == "visible" || snackbarReady == false) {
		console.warn("snackbar still visible/not ready");
	} else {
		snackbarReady = false;
		const h1 = document.getElementById("snackbartitle");
		const p = document.getElementById("snackbartext");

		// h6.innerText = appname;
		h1.innerText = title;
		p.innerText = message;
		snackbar.className = "visible";

		setTimeout(function() {
			snackbar.className = snackbar.className.replace("visible", "");
			snackbarReady = true;
		}, 5900);
	}
}

console.log("Hello, world!");
// snackbar("hi", "something happend");
// snackbar("hi", "something happend and stuff im making this message extremely long for the shits WOOOOOOOOOOOOO Lorem ipsum dolor sit amet justo diam lobortis no et amet justo consetetur lorem elitr invidunt dolore sit dolores sadipscing et rebum. Dolores mazim ipsum voluptua magna sed. Aliquyam facilisis kasd nibh ut sadipscing eos praesent illum sea vulputate consequat consequat sanctus elitr magna dolor. Nonumy sea enim dolore elitr consectetuer amet consequat vero. Nobis ea sadipscing nostrud elit nisl vero vero. Diam dolor lorem amet amet dolore. Dignissim duo et ea. Sanctus vero diam sadipscing et in vel. Sadipscing sed et dolor nonumy dolores labore luptatum dolore et sed adipiscing praesent suscipit kasd nonumy nonumy et rebum. Consequat ea et amet feugiat at invidunt no et ad gubergren et clita in labore. Molestie minim sed labore iriure sadipscing hendrerit aliquyam voluptua et diam takimata no tempor dolor ad sanctus gubergren blandit. Consetetur eos vero dolor eros sadipscing adipiscing molestie euismod at et sed accusam labore. Dolor ipsum aliquyam ullamcorper diam dolor consequat et doming lorem volutpat sit erat diam dolor molestie. Takimata takimata praesent duis takimata.");