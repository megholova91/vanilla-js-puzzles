/**
 * Count down starts, ends & resets
 * Count down should stop when reaching 0
 * Add validation for button clicks when counter value is invalid
 */
function countDown() {
  let count = 0;
  let intervalId = null;
  const counter = document.getElementById("counter");
  const input = document.getElementById("count-input");
  const error = document.getElementById("error");

  input.addEventListener("change", function updateCounter(evt) {
    const inputCount = evt.target.value;
    if (inputCount > 0) {
      counter.textContent = evt.target.value;
      count = evt.target.value;
    }
  });

  document
    .getElementById("start-btn")
    .addEventListener("click", function startCount() {
      if (!intervalId && count <= 0) showError();
      else hideError();
      intervalId = setInterval(() => {
        if (count <= 0) resetInterval();
        else {
          count--;
          counter.textContent = count;
        }
      }, 1000);
    });

  document
    .getElementById("stop-btn")
    .addEventListener("click", function stopCount() {
      resetInterval();
    });

  document
    .getElementById("reset-btn")
    .addEventListener("click", function resetCount() {
      resetInterval();
      count = 0;
      counter.textContent = count;
      input.value = 0;
    });

  function showError() {
    error.classList.remove("hidden");
  }

  function hideError() {
    error.classList.add("hidden");
  }

  function resetInterval() {
    clearInterval(intervalId);
    intervalId = null;
  }
}

countDown();
