const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

start();

// starting the game
async function start() {
  let answer = await ask(
    "Which game would you like to play? Do you want to pick a number or do you want to guess? (pick/guess): "
  );

  while (answer) {
    if (answer.toLowerCase() != undefined) {
      console.log("Invalid input. Enter 'pick' or 'guess'.");
    } else if (answer.toLowerCase() === "pick") {
      answer == false;
      computerGuess();
    } else if (answer.toLowerCase() === "guess") {
      answer == false;
      guessTheNumber();
    }
  }
}

// computerGuess();

// give the user a choice between computer guess or YOU guess

async function computerGuess() {
  let min = 1;
  let max = 100;
  let attempts = 0;
  console.log(
    `Let's play a game where you make up a number between ${min} and ${max} and I (computer) try to guess it.`
  );

  // check for number validity
  let secretNumber;
  while (true) {
    secretNumber = Number(
      await ask("What is your secret number?\nI won't peek, I promise...\n")
    );

    if (isNaN(secretNumber) || secretNumber < min || secretNumber > max) {
      console.log(
        `${secretNumber} is not a valid number. Please enter a number between ${min} and ${max}.`
      );
    } else {
      console.log("You entered: " + secretNumber);
      break; // loop closes once number is input
    }
  }

  // start the gameplay loop
  while (true) {
    const guess = Math.floor((min + max) / 2);
    // random guess (computer not smart)
    // const guess = Math.floor(Math.random() * (max - min + 1)) + min;

    attempts++;

    // computer checks if the guess is correct

    const response = await ask(`Is your number ${guess}? `);
    if (response.toLowerCase() === "yes") {
      console.log(
        `Ha! I guessed your number ${secretNumber} in ${attempts} attempts!`
      );
      playAgain();
      return;
    }

    const higherLower = await ask(
      "Is your number higher or lower? (higher/lower) "
    );

    // switch case for higher or lower guess

    switch (higherLower.toLowerCase()) {
      case "higher":
        min = guess + 1;
        break;
      case "lower":
        max = guess - 1;
        break;
      default:
        console.log("Tell me if it's higher or lower >_>");
    }

    // cheat detector!!
    if (min > max) {
      console.log(
        "Hold on a second!! That can't be possible! I'm not playing this game anymore!"
      );
      playAgain();
      return;
    }
  }
}

// import reverse game onto the same sheet

async function guessTheNumber() {
  console.log("Guess the number between 1 and 100");
  let attempts = 0;
  const targetNumber = Math.floor(Math.random() * 100) + 1;
  let guess = null;

  // do while game loop
  while (guess !== targetNumber) {
    // get the user's guess
    guess = Number(await ask("Enter your guess: "));

    // check if the input is a valid number
    if (isNaN(guess)) {
      console.log("Please enter a valid number.");
      continue;
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
      playAgain();
      return;
    }
  }
}

// duplicate play again function in this new scope

function playAgain() {
  rl.question("Do you want to play again? (yes/no): ", (answer) => {
    if (answer.toLowerCase() === "yes") {
      start();
    } else {
      console.log("Thanks for playing! This was fun!");
      rl.close();
    }
  });
}
