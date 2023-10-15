const textbox = document.getElementById('textbox');

let clearOnClick = true;
let snackbarReady = true;
let snackbarQueueTitle = []
let snackbarQueueMessage = []
let snackbarQueueSize = 0;
let snackbarIsShowingQueue = false;

const debug = false;
console.log("all variables ready!");