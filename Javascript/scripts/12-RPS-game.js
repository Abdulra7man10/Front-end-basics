const score = JSON.parse(localStorage.getItem('score')) 
|| {wins:0,loses:0,ties:0}; //get the value


function resetScore() {
  document.querySelector('.js-message').innerHTML =
  'Are you sure to reset the score? <button class="choice-button yes">Yes</button>'+
  '<button class="choice-button no">No</button>';
}
document.querySelector('.js-message').addEventListener('click', (event) => {
  if (event.target.classList.contains('yes')) {
    score.wins = score.loses = score.ties = 0;
    document.querySelector('.js-message').innerHTML = '';
    updateScore();
  } else if (event.target.classList.contains('no')) {
    document.querySelector('.js-message').innerHTML = '';
  }
});

document.querySelector('.js-rock-button')
.addEventListener('click', () => {
  playGame('rock');
});
document.querySelector('.js-paper-button')
.addEventListener('click', () => {
  playGame('paper');
});
document.querySelector('.js-scissors-button')
.addEventListener('click', () => {
  playGame('scissors');
});
document.body.addEventListener('keydown', (event) => {
  console.log(event.key);
  if (event.key === 'r' || event.key === 'R') playGame('rock');
  else if (event.key === 'p' || event.key === 'P') playGame('paper');
  else if (event.key === 's' || event.key === 'S') playGame('scissors');
  else {
    const playerMove = pickComputerMove();
    playGame(playerMove);
  }
});

let isAutoPlaying = false;
let intervalID;

function autoPlay() {
  if (!isAutoPlaying) {
    intervalID = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
  }
  else {
    clearInterval(intervalID);
    isAutoPlaying = false;
  }
}

function updateScore() {
  document.querySelector('.js-score')
  .innerHTML = `Wins: ${score.wins}, Losses: ${score.loses}, Ties: ${score.ties}`;
}

function playGame(playerMove) {
  const computerMove = pickComputerMove();
  const result = checking(playerMove,computerMove);

  if (result === 'You win.') score.wins++;
  else if (result === 'You lose.') score.loses++;
  else score.ties++;

  localStorage.setItem('score', JSON.stringify(score));
  document.querySelector('.js-result').innerHTML = `${result}`;
  document.querySelector('.js-moves').innerHTML = 
  `You
  <img src="media/${playerMove}-emoji.png" class="move-icon">
  <img src="media/${computerMove}-emoji.png" class="move-icon">
  Computer`;
  updateScore();
}

function checking(choose, computerMove) {
  let result = ' ';
  if (choose === 'rock') {
    if (computerMove === 'rock')
      result = 'Tie';
    else if (computerMove === 'paper')
      result = 'You lose.';
    else
      result = 'You win.';
  }

  else if (choose === 'paper') {
    if (computerMove === 'rock')
      result = 'You win.';
    else if (computerMove === 'paper')
      result = 'Tie';
    else
      result = 'You lose.';
  }

  else if (choose === 'scissors') {
    if (computerMove === 'rock')
      result = 'You lose.';
    else if (computerMove === 'paper')
      result = 'You win.';
    else
      result = 'Tie';
  }
  return result;
}

function pickComputerMove() {
  const RN = Math.random();
  if (RN >= 0 && RN < 1/3)
    computerMove = 'rock';
  else if (RN >= 1/3 && RN < 2/3)
    computerMove = 'paper';
  else if (RN >= 2/3 && RN < 1)
    computerMove = 'scissors';
  return computerMove;
}