'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const nav = document.querySelector('.nav');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// -------------------------------------------------------------------

const header = document.querySelector('header');
// console.log(header);

const message = document.createElement('div');

message.classList.add('cookie-message');

message.innerHTML =
  'We used cookie for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

header.append(message);

document.querySelector('.btn--close-cookie').addEventListener('click', () => {
  message.remove();
});

message.style.height =
  Number.parseFloat(getComputedStyle(message).height) + 40 + 'px';

// const headerImg = document.querySelector('.header__img');
// console.log(headerImg.src);

// const logo = document.querySelector('.nav__logo');
// console.log(logo);

btnScrollTo.addEventListener('click', () => {
  const coords1 = section1.getBoundingClientRect();

  const windowHeight = document.documentElement.clientHeight;

  // window.scrollTo({
  //   left: coords1.left,
  //   top: window.pageYOffset + coords1.top,
  //   behavior: 'smooth',
  // });
  section1.scrollIntoView({ behavior: 'smooth' });
});

// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);

// const randomColor = () =>
//   `rgb (${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
// console.log(randomColor());

document.querySelector('.nav__links').addEventListener('click', e => {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    let id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', e => {
  const currentDataAtt = e.target.closest('button').dataset.tab;
  if (!e.target.closest('button').dataset.tab) return;
  e.target.closest('button').classList.add('operations__tab--active');
  const arrayTabs = [...tabs];
  arrayTabs.forEach(t => {
    if (t != e.target) t.classList.remove('operations__tab--active');
  });
  const currentContent = document.querySelector(
    `.operations__content--${currentDataAtt}`
  );
  tabsContent.forEach(tC => tC.classList.remove('operations__content--active'));
  currentContent.classList.add('operations__content--active');
});

const navItems = nav.children;

const handleHover = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(s => {
      if (s !== link) {
        s.style.opacity = opacity;
      }
    });
    logo.style.opacity = opacity;
  }
};

nav.addEventListener('mouseover', e => {
  handleHover(e, '0.5');
});

nav.addEventListener('mouseout', e => {
  handleHover(e, '1');
});

const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

const headerOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
};

const headerObserver = new IntersectionObserver(stickyNav, headerOptions);
headerObserver.observe(header);

// ------------- Sections appear

const allSections = document.querySelectorAll('.section');

const revealSections = (entries, observer) => {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionOptions = {
  root: null,
  threshold: 0.15,
};

const sectionObserver = new IntersectionObserver(
  revealSections,
  sectionOptions
);
allSections.forEach(s => {
  sectionObserver.observe(s);
  s.classList.add('section--hidden');
});

// ------------- Images appear

const imgTarget = document.querySelectorAll('img[data-src]');

const revealImg = (entries, observer) => {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('lazy-img');
  // console.log(entry.target.src);
  // console.log(entry.target.dataset.src);
  entry.target.src = entry.target.dataset.src;
  observer.unobserve(entry.target);
};

const imgOptions = {
  root: null,
  threshold: 0,
};

const imgObserver = new IntersectionObserver(revealImg, imgOptions);
imgTarget.forEach(img => {
  imgObserver.observe(img);
});

// -------------------------- Create slider

const slider = document.querySelector('.slider');

const slides = document.querySelectorAll('.slide');

slides.forEach((slide, i) => {
  slide.style.transform = `translateX(${100 * i}%)`;
});

const btnRight = document.querySelector('.slider__btn--right');
const btnLeft = document.querySelector('.slider__btn--left');

let curSlide = 0;
let maxSlide = slides.length - 1;

// Generate dots

const dotContainer = document.querySelector('.dots');
const createDots = () => {
  slides.forEach((_, i) => {
    console.log(i);
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};

createDots();

const dots = document.querySelectorAll('.dots__dot');

const activateDot = function (slide) {
  dots.forEach(d => d.classList.remove('dots__dot--active'));
  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};
activateDot(0);

const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};
goToSlide(0);

const backToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i + slide)}%)`)
  );
};

const nextSlide = function () {
  if (curSlide == maxSlide) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  goToSlide(curSlide);
  activateDot(curSlide);
};

btnRight.addEventListener('click', nextSlide);

const previousSlide = function () {
  if (curSlide < 1) {
    curSlide = maxSlide;
  } else {
    curSlide--;
  }
  goToSlide(curSlide);
  activateDot(curSlide);
};

btnLeft.addEventListener('click', previousSlide);

// Slide with keyBoard

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft') previousSlide();
  if (e.key === 'ArrowRight') nextSlide();
});

dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const slide = e.target.dataset.slide;
    goToSlide(slide);
    activateDot(slide);
  }
});
