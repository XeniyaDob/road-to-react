function firstResponse() {
  console.log("Who's there?");
}

function secondResponse(name) {
  console.log(`${name} who?`);
}

function badJoke(firstResponseHandler, secondResponseHandler) {
  console.log("Knock, knock.");
  firstResponseHandler();
  console.log("Nobel.");
  secondResponseHandler("Nobel");
  console.log("Nobel... that's why I knocked.");
}
console.log(badJoke(firstResponse, secondResponse));

//output

// Knock, knock.
// Who's there?
// Nobel.
// Nobel who?
// Nobel... that's why I knocked.
// undefined
