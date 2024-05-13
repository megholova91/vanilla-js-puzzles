(() => {
  const numberOfBlocks = 5;

  let currentScore = 0,
    highScore = parseInt(localStorage.getItem("highScore"), 10) || 0;
  let round = 1,
    currentIndex = 0,
    givenSequence = [],
    roundInProgress = false;

  const currentScoreContainer = document.getElementById("current-score");
  const highScoreContainer = document.getElementById("high-score");
  const blocksContainer = document.getElementById("blocks-container");
  const startButton = document.getElementById("start-button");

  currentScoreContainer.innerText = currentScore;
  highScoreContainer.innerText = highScore;

  const createBlocks = () => {
    for (let count = 0; count < numberOfBlocks; count++) {
      const block = document.createElement("div");
      block.classList.add("block");
      block.dataset.count = count;
      blocksContainer.appendChild(block);
    }
  };

  //start button click function
  startButton.onclick = function () {
    startButton.disabled = true;
    blocksContainer.classList.remove("game-over");
    playCurrentRound();
  };

  //to blink random blocks 'round' number of times
  function playCurrentRound() {
    roundInProgress = true;
    givenSequence = [];
    let count = 0;
    const intervalId = setInterval(() => {
      const randomBlockNumber = Math.floor(Math.random() * numberOfBlocks);
      givenSequence.push(randomBlockNumber);
      const block = document.querySelector(
        `[data-count="${randomBlockNumber}"]`
      );
      block.classList.add("blink");
      setTimeout(() => {
        block.classList.remove("blink");
      }, 500);
      if (++count == round) {
        window.clearInterval(intervalId);
        roundInProgress = false;
        userSequence = [];
        currentIndex = 0;
      }
    }, 1000);
  }

  blocksContainer.addEventListener("click", (event) => {
    const { count } = event.target.dataset;
    if (count && !roundInProgress) {
      gameScoreCheck(count);
      event.target.classList.add("click");
      setTimeout(() => {
        event.target.classList.remove("click");
      }, 200);
    }
  });

  function gameScoreCheck(blockNumber) {
    if (givenSequence[currentIndex] == blockNumber) {
      currentIndex++;
      //when the round is over
      if (currentIndex == round) {
        currentScore++;
        updateHighScore();
        ++round;
        playCurrentRound();
      }
    } else {
      blocksContainer.classList.add("game-over");
      currentScore = 0;
      startButton.disabled = false;
      round = 1;
    }
    currentScoreContainer.innerText = currentScore;
  }

  function updateHighScore() {
    if (currentScore > highScore) {
      highScore = currentScore;
      highScoreContainer.innerText = highScore;
      localStorage.setItem("highScore", highScore.toString());
    }
  }

  createBlocks();
})();
