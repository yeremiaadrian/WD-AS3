document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.querySelector('.overlay');
  const yesButton = document.querySelector('#yes-button');
  const noButton = document.querySelector('#no-button');

  if (yesButton) {
    yesButton.addEventListener('click', () => {
      if (overlay) overlay.style.display = 'none';
    });
  }

  if (noButton) {
    noButton.addEventListener('click', () => {
      if (overlay) overlay.style.display = 'none';
    });
  }

  const bgMusic = new Audio('audio/jazz.mp3')


  const soundBtn = document.querySelector('#sound-btn')
  soundBtn.addEventListener('click', () => {

    if (bgMusic.paused) {
      bgMusic.play()
      soundBtn.name = 'volume-up'
    } else {
      bgMusic.pause()
      soundBtn.name = 'volume-mute'
    }

  });

  gsap.fromTo(".overlay", { y: -500, fill: 'blue', }, { y: 0, fill: 'green' }


  );


  //---------------------------
  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".trigger",
        scrub: 0.5,
        pin: true,
        start: "top top",
        end: "+=150%"
      }
    })
    .to("#home", {
      force3D: true,
      duration: 1,
      xPercent: 100,
      ease: "power1.inOut",
      stagger: { amount: 1 }
    })
    .to(".box", { ease: "power1.out", duration: 1, rotation: "45deg" }, 0)
    .to(".box", { ease: "power1.in", duration: 1, rotation: "0deg" }, 1);



  // Carousel Initialization
  (function (element, params = { autoScrollSeconds: 10, transitionSeconds: 0.6 }) {
    window.addEventListener('load', initCarousel);

    function initCarousel() {
      let activeSlide = 0;
      let progressbarInstance;
      const slides = document.querySelectorAll('.carousel-slide');

      // Initialize navigator
      initNavigator();

      slides.forEach(slide => slide.style.transitionDuration = params.transitionSeconds + "s");

      const previousButton = document.querySelector('.carousel-previous button');
      const nextButton = document.querySelector('.carousel-next button');

      document.querySelector('.carousel-previous button').addEventListener('click', function () {
        console.log('Previous button clicked');
        resetProgressbar();
        decrementSlide();
      });

      document.querySelector('.carousel-next button').addEventListener('click', function () {
        console.log('Next button clicked');
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

        return window.setInterval(function () {
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

          _radio.addEventListener('click', function () {
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
});