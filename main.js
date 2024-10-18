const overlay = document.querySelector('.overlay');

const yesButton = document.querySelector('#yes-button');
const noButton = document.querySelector('#no-button');

yesButton.addEventListener('click', () => {
    overlay.style.display='none'
});

noButton.addEventListener('click', () => {
    
});






(function(element, params = { autoScrollSeconds: 10, transitionSeconds: 0.6 }) {
  window.addEventListener('load', initCarousel);

  function initCarousel() {
    let activeSlide = 0;
    let progressbarInstance;
    const slides = document.querySelectorAll('.carousel-slide');
    
    // Initialize navigator
    initNavigator();
    
    // Set transition duration for slides
    slides.forEach(slide => slide.style.transitionDuration = params.transitionSeconds + "s");

    // Set event listeners for previous and next buttons
    document.querySelector('.carousel-previous').addEventListener('click', function() {
      resetProgressbar();
      decrementSlide();
    });
    document.querySelector('.carousel-next').addEventListener('click', function() {
      resetProgressbar();
      incrementSlide();
    });

    // Initialize auto-scrolling if enabled
    if (!!params.autoScrollSeconds) {
      progressbarInstance = initProgressbar();
    }

    function initProgressbar() {
      let x = document.createElement('div');
      x.classList.add('inner');
      x.style.animationDuration = params.autoScrollSeconds + "s";
      document.querySelector('.carousel-progress').appendChild(x);

      return window.setInterval(function() {
        if (document.querySelector('.carousel-progress>.inner')) {
          document.querySelector('.carousel-progress>.inner').remove();
        }
        let x = document.createElement('div');
        x.classList.add('inner');
        x.style.animationDuration = params.autoScrollSeconds + "s";
        document.querySelector('.carousel-progress').appendChild(x);

        incrementSlide();
      }, params.autoScrollSeconds * 1000);
    }

    function resetProgressbar() {
      window.clearInterval(progressbarInstance);
      if (document.querySelector('.carousel-progress>.inner')) {
        document.querySelector('.carousel-progress>.inner').remove();
      }
      progressbarInstance = initProgressbar();
    }

    function incrementSlide() {
      slides.item(activeSlide).classList.remove('active');
      activeSlide = (activeSlide === slides.length - 1) ? 0 : activeSlide + 1;
      slides.item(activeSlide).classList.add('active');
    }

    function decrementSlide() {
      slides.item(activeSlide).classList.remove('active');
      activeSlide = (activeSlide === 0) ? slides.length - 1 : activeSlide - 1;
      slides.item(activeSlide).classList.add('active');
    }

    function initNavigator() {
      const frag = document.createDocumentFragment();
      slides.forEach((slide, index) => {
        let _radio = document.createElement('input');
        _radio.setAttribute("type", "radio");
        _radio.setAttribute("name", "active-slide");
        _radio.setAttribute("id", "active-slide-selector-" + index);
        _radio.checked = (activeSlide === index);

        _radio.addEventListener('click', function() {
          resetProgressbar();
          slides.item(activeSlide).classList.remove('active');
          activeSlide = index;
          slides.item(activeSlide).classList.add('active');
        });

        frag.appendChild(_radio);
      });

      document.querySelector('.carousel-navigator').appendChild(frag);
    }
  }
})(document.querySelector('.carousel'), {
  autoScrollSeconds: 10,
  transitionSeconds: 0.6,
});