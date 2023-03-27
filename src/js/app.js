const cards = document.querySelectorAll('.child_card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard){
    return;
  }
  
  if (this === firstCard) {
    return;
  }
  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.name === secondCard.dataset.name;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));

//----------------nav------------

const hamburger = document.querySelector('.hamburger');

hamburger.addEventListener('click', function (){
    this.classList.toggle('is-active')
});

//-----------time-bar------------
let processScroll = () => {
  let docElem = document.documentElement, 
    docBody = document.body,
    scrollTop = docElem['scrollTop'] || docBody['scrollTop'],
      scrollBottom = (docElem['scrollHeight'] || docBody['scrollHeight']) - window.innerHeight,
    scrollPercent = scrollTop / scrollBottom * 100 + '%';
  
    document.getElementById("progress-bar").style.setProperty("--scrollAmount", scrollPercent); 
}

document.addEventListener('scroll', processScroll);

//-------------iframe----------------
window.onSpotifyIframeApiReady = (IFrameAPI) => {
  let element = document.getElementById('embed-iframe');
  let readyToBe = {
    height: '500px',
      width:'50%',
      uri: 'https://open.spotify.com/album/7hzP5i7StxYG4StECA0rrJ?si=y5Ug-9mDQdK2VUwh2GpGrA'
    };
    let callback = (EmbedController) => {
      document.querySelectorAll('ul#episodes > li > button').forEach(
        episode => {
          episode.addEventListener('click', () => {
            EmbedController.loadUri(episode.dataset.spotifyId)
          });
        })
    };
    IFrameAPI.createController(element, readyToBe, callback);
};