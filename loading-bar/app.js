const progressStatus = document.getElementById('progress-status');
const loadButton = document.getElementById('load-button');
const queue = document.getElementById('queue-count');
const timer = document.getElementById('timer');
const time = 3;
let queueCount = 0;


progressStatus.ontransitionend = function () {
    queueCount--;
    queue.innerHTML = `Queue : ${queueCount}`;
    progressStatus.style.transition = 'none';
    progressStatus.style.width = '0px';
}

loadButton.onclick = function () {
    loadProgress();
}

const loadProgress = () => {
    queueCount++;
    queue.innerHTML = `Queue : ${queueCount}`;
    const intervalId = setInterval(() => {
        if ((!progressStatus.style.width || progressStatus.style.width == '0px') && queueCount > 0) {
            startTransition();
        } else if (queueCount == 0) {
            window.clearInterval(intervalId);
        }
    }, 100);
}

const startTransition = () => {
    let progressWidth = 1;
    progressStatus.style.transition = `width ${time}s linear`;
    for (progressWidth = 1; progressWidth <= 100; progressWidth++) {
        progressStatus.style.width = progressWidth + '%';
    }
}