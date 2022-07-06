'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

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

const doc = document.documentElement;
const head = document.head;
const body = document.body;

const header = document.querySelector('header');
console.log(header);

console.log(doc);
console.log(head);
console.log(body);

const message = document.createElement('div');

message.classList.add('cookie-message');

message.innerHTML =
  'We used cookie for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

header.after(message);

document.querySelector('.btn--close-cookie').addEventListener('click', () => {
  message.remove();
});

message.style.height =
  Number.parseFloat(getComputedStyle(message).height) + 40 + 'px';
console.log(message.style.height);

// const headerImg = document.querySelector('.header__img');
// console.log(headerImg.src);

// const logo = document.querySelector('.nav__logo');
// console.log(logo);

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
console.log(btnScrollTo);
console.log(section1);

btnScrollTo.addEventListener('click', () => {
  const coords1 = section1.getBoundingClientRect();
  console.log(coords1);

  const windowHeight = document.documentElement.clientHeight;
  console.log(windowHeight);

  // window.scrollTo({
  //   left: coords1.left,
  //   top: window.pageYOffset + coords1.top,
  //   behavior: 'smooth',
  // });
  section1.scrollIntoView({ behavior: 'smooth' });
});

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () =>
  `rgb (${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
console.log(randomColor());

// const navLinks = document.querySelectorAll('.nav__link');

document.querySelector('.nav__links').addEventListener('click', e => {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    let id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    // let element = document.querySelector(id);
    // element.scrollIntoView({ behavior: 'smooth' });
  }
});

const h1 = document.querySelector('h1');
console.log(h1.childNodes);
console.log(h1.children);
console.log(h1.parentNode);
console.log(h1.parentElement);
// console.log(h1.parentNode);
