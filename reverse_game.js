// guess the number game
const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

guessTheNumber();

async function guessTheNumber() {
  console.log("Guess the number between 1 and 100");
  let attempts = 0;
  const targetNumber = Math.floor(Math.random() * 100) + 1;
  let guess = null;

  // do while game loop
  while (guess !== targetNumber) {
    // get the user's guess
    guess = await ask("Enter your guess: ");

    // check if the input is a valid number
    if (isNaN(guess)) {
      console.log("Please enter a valid number.");
      break;
    }

    // increment and console.log number of attempts
    attempts++;

    // check if the guess is correct and display if too high or too low
    if (guess < targetNumber) {
      console.log(`${guess} is too low! Guess again. Attempts: ` + attempts);
    } else if (guess > targetNumber) {
      console.log(`${guess} is too high! Guess again. Attempts: ` + attempts);
    } else {
      console.log(
        `Hey, nice job! You guessed my number in ${attempts} attempts.`
      );
      break;
    }
  }

  rl.close();
}
