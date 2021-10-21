const startRatingWidget = document.getElementById('star-rating-widget');
const rating = document.getElementById('rating');
const numberOfStars = 5;
let currentRating = 0;

for (let count = 1; count <= numberOfStars; count++) {
    const star = document.createElement('i');
    star.classList.add('far', 'fa-star');
    star.id = `star-${count}`;
    star.onmouseover = () => giveRating(count);
    star.onclick = () => giveRating(count, true);
    star.onmouseleave = function () {
        if (currentRating <= 0) {
            removeHighlight(star);
            for (let prev = count - 1; prev > 0; prev--) {
                const prevStar = document.getElementById(`star-${prev}`);
                removeHighlight(prevStar);
            }
        }
    }
    startRatingWidget.appendChild(star);
}

const giveRating = (count, fixed) => {
    for (let star = 1; star <= numberOfStars; star++) {
        const currentStar = document.getElementById(`star-${star}`);
        if (star <= count) {
            highlightStar(currentStar);
        } else {
            removeHighlight(currentStar);
        }
    }
    if (fixed) {
        currentRating = count;
        rating.innerHTML = `Rating : ${currentRating}`;
    }
}

const highlightStar = (star) => {
    star.classList.remove('far');
    star.classList.add('fas', 'highlighted-star');
}

const removeHighlight = (star) => {
    star.classList.remove('fas', 'highlighted-star');
    star.classList.add('far');
}