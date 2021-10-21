let currentScore = 0, highScore = parseInt(localStorage.getItem('highScore'), 10) || 0;
const numberOfBlocks = 5;
let round = 1, currentIndex = 0, givenSequence, roundInProgress = false;

const currentScoreContainer = document.getElementById('current-score');
const highScoreContainer = document.getElementById('high-score');

currentScoreContainer.innerHTML = currentScore;
highScoreContainer.innerHTML = highScore;

//create the blocks
const blocksContainer = document.getElementById('blocks-container');

for (let count = 0; count < numberOfBlocks; count++) {
    const block = document.createElement('div');
    block.classList.add('block');
    block.id = `block-${count}`;
    block.onclick = function () {
        if (!roundInProgress) {
            gameScoreCheck(count);
            block.classList.add('click');
            setTimeout(() => {
                block.classList.remove('click');
            }, 200);
        }
    }
    blocksContainer.appendChild(block);
}

function gameScoreCheck(blockId) {
    if (givenSequence[currentIndex] == blockId) {
        currentIndex++;
        console.log('correct');
        //when the round is over
        if (currentIndex == round) {
            currentScore++;
            updateHighScore();
            ++round;
            playCurrentRound();
        }
    } else {
        blocksContainer.classList.add('game-over');
        console.log('game over');
        currentScore = 0;
        startButton.disabled = false;
        round = 1;
    }
    currentScoreContainer.innerHTML = currentScore;
}

function updateHighScore() {
    if (currentScore > highScore) {
        highScore = currentScore;
        highScoreContainer.innerHTML = highScore;
        localStorage.setItem('highScore', highScore.toString());
    }
}

//start button click function
const startButton = document.getElementById('start-button');

startButton.onclick = function () {
    startButton.disabled = true;
    blocksContainer.classList.remove('game-over');
    playCurrentRound();
}

function playCurrentRound() {
    autoBlink();
}

//to blink random blocks 'round' number of times
function autoBlink() {
    roundInProgress = true;
    givenSequence = [];
    let count = 0;
    const intervalId = setInterval(() => {
        const randomBlockId = Math.floor(Math.random() * numberOfBlocks);
        givenSequence.push(randomBlockId);
        const block = document.getElementById(`block-${randomBlockId}`);
        block.classList.add('blink');
        setTimeout(() => {
            block.classList.remove('blink');
        }, 500);
        if (++count == round) {
            window.clearInterval(intervalId);
            roundInProgress = false;
            userSequence = [];
            currentIndex = 0;
        }
    }, 1000);
}