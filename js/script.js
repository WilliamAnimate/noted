const textbox = document.getElementById('textbox');
// what was this for again?
try {
	const textWrappingStatusText = document.getElementById('textWrappingStatusText');
	console.log(textWrappingStatusText.classList);
	console.log(textWrappingStatusText.innerHTML);
} catch (err) {
	console.warn(err);
}

let clearOnClick = true; // haha boolean
let snackbarReady = true;
let snackbarQueueTitle = []
let snackbarQueueMessage = []
let snackbarQueueSize = 0;
let snackbarIsShowingQueue = false;

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
	} else if (e.key === '.') {
		focus();
	}
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
		snackbar("success", "wrapping successfully disabled");
	} else {
		snackbar("success", "wrapping successfully enabled");
	}
}

/**
 * all this code does is unfocus the editor.
 */
function unfocus() {
	textbox.contentEditable = false;

	textbox.style.border = '1px solid #1b1b1b';

	if (textbox.innerHTML == "" || textbox.innerHTML == "<br>" || textbox.innerHTML == null) {
		// if its empty, then we change the stuff
		textbox.innerHTML = "Click to edit";
		clearOnClick = true;
	}
}

/**
 * all this code does is focus the editor.
 */
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

/**
 * triggers a file download.
 * @param {*} variable the variable to trigger download from
 * @param {*} filename what it should be named. keep empty for default.
 */
function download(variable, filename) {
	let x = JSON.stringify(variable).slice(1, -1); // remove the ""s at the beginning and end

	// thank you chatgpt for this amazingly formatted solution 💯💯💯💯💯
	const a = document.createElement('a');
	a.href = URL.createObjectURL(new Blob([x],{type: 'application/json'}));
	a.download = filename || 'text.txt';

	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
}

/**
 * Function to open/close settings. It does it automatically
 */
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

/**
 * triggers a snackbar. there is currently no queue! **DO NOT MAKE THE TEXT SUPER LONG!**
 * @param {*} title title of the snackbar
 * @param {*} message message of the snackmar
 */
function snackbar(title, message) {
	const snackbar = document.getElementById("snackbar");

	// snackbar is in the middle of showing a message, send it to the queue.
	if (!snackbarReady) {
		console.log("a");
		console.log("adding title to queue: " + title)
		console.log("adding message to queue: " + message)
		snackbarQueueTitle.push(title);
		snackbarQueueMessage.push(message);
		snackbarQueueSize++;

		if (snackbarQueueSizeNotCorrect()) {
			// TODO: error handling
		}
		return;
	}

	if (snackbarIsShowingQueue) {
		snackbarQueueTitle.shift();
		snackbarQueueMessage.shift();
		snackbarQueueSize--;

		if (snackbarQueueSizeNotCorrect()) {
			return;
		}
	}

	if (snackbar.className == "visible") {
		console.warn("snackbar still visible/not ready");
	} else {
		snackbarReady = false;
		const h1 = document.getElementById("snackbartitle");
		const p = document.getElementById("snackbartext");

		h1.innerText = title;
		p.innerText = message;
		snackbar.className = "visible";

		setTimeout(function() {
			snackbar.className = snackbar.className.replace("visible", "");
			snackbarReady = true;

			// 0.7 second delay
			setTimeout(function() {
				snackbarDoQueue();
			}, 700);
		}, 5900);
		// }, 900);
	}
}

/**
 * if there are contents in the queue, it executes it.
 *
 * why is this function a thing? i can't call snackbar() within the snackbar function for some reason, and im not willing to debug that so you have this solution
 *
 * **remove me one day**
 */
function snackbarDoQueue() {
	if (snackbarQueueSize > 0) {
		snackbarReady = true;
		snackbarIsShowingQueue = true;
		console.warn(snackbarQueueTitle[0], snackbarQueueMessage[0]);

		snackbar(snackbarQueueTitle[0], snackbarQueueMessage[0]);
	}
}

/**
 * detects whether the variable `snackbarQueueSize` is properly set, so you dont have to check the length of snackbarQueueMessage and snackbarQueueTitle.
 * @returns true for mismatch, false for correct.
 */
function snackbarQueueSizeNotCorrect() {
	// this is stupid.
	if (snackbarQueueSize !== snackbarQueueMessage.length ||
		snackbarQueueSize !== snackbarQueueTitle.length
	) {
		console.error("snackbarQueueSize and snackbarQueueMessage/snackbarQueueTitle does not match the expected size! Are you doing something?");
		return true;
	}
	return false;
}

console.log("Hello, world!");
snackbar("hi", "something happend");
snackbar("hi", "something happend and stuff im making this message extremely long for the jokes WOOOOOOOOOOOOO Lorem ipsum dolor sit amet justo diam lobortis no et amet justo consetetur lorem elitr invidunt dolore sit dolores sadipscing et rebum. Dolores mazim ipsum voluptua magna sed. Aliquyam facilisis kasd nibh ut sadipscing eos praesent illum sea vulputate consequat consequat sanctus elitr magna dolor. Nonumy sea enim dolore elitr consectetuer amet consequat vero. Nobis ea sadipscing nostrud elit nisl vero vero. Diam dolor lorem amet amet dolore. Dignissim duo et ea. Sanctus vero diam sadipscing et in vel. Sadipscing sed et dolor nonumy dolores labore luptatum dolore et sed adipiscing praesent suscipit kasd nonumy nonumy et rebum. Consequat ea et amet feugiat at invidunt no et ad gubergren et clita in labore. Molestie minim sed labore iriure sadipscing hendrerit aliquyam voluptua et diam takimata no tempor dolor ad sanctus gubergren blandit. Consetetur eos vero dolor eros sadipscing adipiscing molestie euismod at et sed accusam labore. Dolor ipsum aliquyam ullamcorper diam dolor consequat et doming lorem volutpat sit erat diam dolor molestie. Takimata takimata praesent duis takimata.");