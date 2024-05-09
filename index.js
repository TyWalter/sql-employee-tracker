const {questions, askQuestion} = require("./utils/questions");
const fs = require("fs").promises;






// Hardcoded query: DELETE FROM course_names WHERE id = 3;
// pool.query(`DELETE FROM course_names WHERE id = $1`, [3], (err, {rows}) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(rows);
// });

// Query database
// pool.query('SELECT * FROM course_names', function (err, {rows}) {
//   console.log(rows);
// });




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