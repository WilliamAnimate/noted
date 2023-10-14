/**
 * prints stuff if the `debug` variable is true.
 * @param {*} input input
 */
function dbglog(input) {
	if (debug) {
		console.log(input);
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
		snackbarIsShowingQueue = true;

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