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

const form = document.getElementById('contact-form');
const status = document.getElementById('status');

form.addEventListener('submit', (event) => {
  event.preventDefault(); // prevent form from submitting

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');

  // validate inputs
  if (nameInput.value.trim() === '') {
    showError('Please enter your name');
    return;
  }

  if (emailInput.value.trim() === '') {
    showError('Please enter your email');
    return;
  }

  if (!isValidEmail(emailInput.value.trim())) {
    showError('Please enter a valid email address');
    return;
  }

  if (messageInput.value.trim() === '') {
    showError('Please enter your message');
    return;
  }

  // submit form data
  const formData = new FormData(form);
  fetch('process-contact.php', {
    method: 'POST',
    body: formData
  })
  .then(response => response.text())
  .then(data => {
    showSuccess(data);
    form.reset();
  })
  .catch(error => console.error(error));
});

function isValidEmail(email) {
  // regex for validating email address format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showError(message) {
  status.innerHTML = `<p id="error-message">${message}</p>`;
}

function showSuccess(message) {
  status.innerHTML = `<p>${message}</p>`;
}

//-----------------nav--------------
