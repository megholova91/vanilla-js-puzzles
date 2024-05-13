(() => {
  const startRatingWidget = document.getElementById("star-rating-widget");
  const rating = document.getElementById("rating");

  const numberOfStars = 5;
  let currentRating = 0;

  const createStars = () => {
    for (let count = 1; count <= numberOfStars; count++) {
      const star = document.createElement("i");
      star.classList.add("far", "fa-star");
      star.dataset.count = count;
      startRatingWidget.appendChild(star);
    }
  };

  startRatingWidget.addEventListener("mouseover", (event) => {
    const { count } = event.target.dataset;
    if (count) {
      giveRating(count);
    }
  });

  startRatingWidget.addEventListener("click", (event) => {
    const { count } = event.target.dataset;
    if (count) {
      giveRating(count);
      showFinalRating(count);
    }
  });

  startRatingWidget.addEventListener("mouseleave", (event) => {
    const { count } = event.target.dataset;
    if (count && currentRating <= 0) {
      removeHighlight(event.target);
      for (let prev = count - 1; prev > 0; prev--) {
        const prevStar = document.querySelector(`[data-count="${prev}"]`);
        removeHighlight(prevStar);
      }
    }
  });

  const giveRating = (count) => {
    for (let num = 1; num <= numberOfStars; num++) {
      const currentStar = document.querySelector(`[data-count="${num}"]`);
      if (num <= count) {
        addHighlight(currentStar);
      } else {
        removeHighlight(currentStar);
      }
    }
  };

  const showFinalRating = (count) => {
    currentRating = count;
    rating.innerText = `Rating : ${currentRating}`;
  };

  const addHighlight = (star) => {
    star.classList.remove("far");
    star.classList.add("fas", "highlighted-star");
  };

  const removeHighlight = (star) => {
    star.classList.remove("fas", "highlighted-star");
    star.classList.add("far");
  };

  createStars();
})();
