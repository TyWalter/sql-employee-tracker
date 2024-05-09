const {askQuestion} = require("./utils/js/questions");
const fs = require("fs").promises;

// Reading the txt file, awaiting the response and then posting the txt file and then running questions
async function start() {
  try {
      const data = await fs.readFile('./utils/images/art.txt', 'utf8');
      console.log(data);
      await askQuestion();
  } catch (err) {
      console.error(err.message);
  }
}

// Calling functions to start
start();