//these tests will incorporate all 5 methods(add, delete, search, autocomplete, display) but gradually incorporate each one per test
//these tests will be global and test the global state as preferred in the requirements
const axios = require("axios");

//should expect 5 words to be added in the trie
//if a request succeeds then the word will be added
async function addFiveAndGetFive() {
  let wordArray = ["This", "is", "one", "nice", "test"];
  let requestsSuceeded = true;

  await resetTrie();
  console.log("Test 1 Started");
  //adds all 5 words
  for (let i of wordArray) {
    try {
      let results = await axios.post(
        `https://triechallenge.herokuapp.com/add`,
        {
          specifiedWord: i,
        }
      );
      console.log(results["data"]["message"]);
    } catch (error) {
      requestsSuceeded = false;
    }
  }

  console.log(`All 5 Requests Succeeded? ${requestsSuceeded}`);
  console.log("Test 1 Ended");
  console.log("");
}

//should expect 4 words to be added in the trie
async function addFiveAndDeleteOne() {
  let wordArray = ["This", "is", "one", "nice", "test"];
  let requestsSuceeded = true;

  await resetTrie();
  console.log("Test 2 Started");
  //adds all 5 words
  for (let i of wordArray) {
    try {
      let results = await axios.post(
        `https://triechallenge.herokuapp.com/add`,
        {
          specifiedWord: i,
        }
      );
      console.log(results["data"]["message"]);
    } catch (error) {
      requestsSuceeded = false;
    }
  }

  //deletes last word
  try {
    let deleteResults = await axios.post(
      `https://triechallenge.herokuapp.com/delete`,
      { specifiedWord: "test" }
    );
    console.log(deleteResults["data"]["message"]);
  } catch (error) {
    requestsSuceeded = false;
  }

  console.log(`All 6 Requests Succeeded? ${requestsSuceeded}`);
  console.log("Test 2 Ended");
  console.log("");
}

//should expect 3 words to be added in the trie and the last added word to be found
async function addFiveAndDeleteTwoAndSearchTrue() {
  let wordArray = ["This", "is", "one", "nice", "test"];
  let requestsSuceeded = true;

  await resetTrie();
  console.log("Test 3 Started");
  //adds all 5 words
  for (let i of wordArray) {
    try {
      let results = await axios.post(
        `https://triechallenge.herokuapp.com/add`,
        {
          specifiedWord: i,
        }
      );
      console.log(results["data"]["message"]);
    } catch (error) {
      requestsSuceeded = false;
    }
  }

  //deletes first 2 words
  for (let i = 0; i < 2; i++) {
    try {
      let results = await axios.post(
        `https://triechallenge.herokuapp.com/delete`,
        {
          specifiedWord: wordArray[i],
        }
      );
      console.log(results["data"]["message"]);
      if (results["data"]["message"].includes("not found")) {
        requestsSuceeded = false;
      }
    } catch (error) {
      requestsSuceeded = false;
    }
  }

  //checks if last word is in trie
  try {
    let results = await axios.post(
      `https://triechallenge.herokuapp.com/search`,
      {
        specifiedWord: "test",
      }
    );
    console.log(results["data"]["message"]);
    if (results["data"]["message"].includes("not")) {
      requestsSuceeded = false;
    }
  } catch (error) {
    requestsSuceeded = false;
  }

  console.log(`All 8 Requests Succeeded? ${requestsSuceeded}`);
  console.log("Test 3 Ended");
  console.log("");
}

async function addFiveAndDeleteTwoAndSearchFalse() {
  let wordArray = ["This", "is", "one", "nice", "test"];
  let requestsSuceeded = true;

  await resetTrie();
  console.log("Test 4 Started");
  //adds all 5 words
  for (let i of wordArray) {
    try {
      let results = await axios.post(
        `https://triechallenge.herokuapp.com/add`,
        {
          specifiedWord: i,
        }
      );
      console.log(results["data"]["message"]);
    } catch (error) {
      requestsSuceeded = false;
    }
  }

  //deletes first 2 words
  for (let i = 0; i < 2; i++) {
    try {
      let results = await axios.post(
        `https://triechallenge.herokuapp.com/delete`,
        {
          specifiedWord: wordArray[i],
        }
      );
      console.log(results["data"]["message"]);
      if (results["data"]["message"].includes("not found")) {
        requestsSuceeded = false;
      }
    } catch (error) {
      requestsSuceeded = false;
    }
  }

  //checks if 1st word is not in trie
  try {
    let results = await axios.post(
      `https://triechallenge.herokuapp.com/search`,
      {
        specifiedWord: "This",
      }
    );
    console.log(results["data"]["message"]);
    if (!results["data"]["message"].includes("not")) {
      requestsSuceeded = false;
    }
  } catch (error) {
    requestsSuceeded = false;
  }

  console.log(`All 8 Requests Succeeded? ${requestsSuceeded}`);
  console.log("Test 4 Ended");
  console.log("");
}

async function addFiveAndDeleteTwoAndAuto() {}

async function addFiveAndDeleteTwoAndDisplay() {}

//resets trie as needed
async function resetTrie() {
  try {
    let results = await axios.get(`https://triechallenge.herokuapp.com/reset`);
    console.log(results["data"]["message"]);
  } catch (error) {
    console.log("Trie not reset");
  }
}

//uncomment each test as needed
//we must wait for each function to resolve its test hence the await keywords
//we dont want all the tests executing asynchronously
async function executeTests() {
  // await addFiveAndGetFive();
  // await addFiveAndDeleteOne();
  // await addFiveAndDeleteTwoAndSearchTrue();
  await addFiveAndDeleteTwoAndSearchFalse();
  // await addFiveAndDeleteTwoAndAuto();
  // await addFiveAndDeleteTwoAndDisplay();
}

executeTests();
