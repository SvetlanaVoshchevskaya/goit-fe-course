'use strict';

const galleryItems = [
  {
    preview: 'img/preview-1.jpeg',
    fullview: 'img/fullview-1.jpeg',
    alt: 'alt text 1'
  },
  {
    preview: 'img/preview-2.jpeg',
    fullview: 'img/fullview-2.jpeg',
    alt: 'alt text 2'
  },
  {
    preview: 'img/preview-3.jpeg',
    fullview: 'img/fullview-3.jpeg',
    alt: 'alt text 3'
  },
  {
    preview: 'img/preview-4.jpeg',
    fullview: 'img/fullview-4.jpeg',
    alt: 'alt text 4'
  },
  {
    preview: 'img/preview-5.jpeg',
    fullview: 'img/fullview-5.jpeg',
    alt: 'alt text 4'
  }
];

const gallery = document.querySelector('.image-gallery');
const fullView = document.createElement('div');
const bigImg = document.createElement('img');
let fullviews = galleryItems[0].fullview;
const alt = galleryItems[0].alt;
bigImg.classList.add('fullview');
bigImg.setAttribute('src', fullviews);
bigImg.setAttribute('alt', alt);
fullView.append(bigImg);
gallery.append(bigImg);

const ul = document.createElement('ul');
function createImg({ preview, alt, fullview }) {
  const li = document.createElement('li');
  const imgEl = document.createElement('img');
  ul.classList.add('preview');
  imgEl.classList.add('img-list');
  li.classList.add('js-list-item');
  imgEl.setAttribute('src', preview);
  imgEl.setAttribute('data-fullview', fullview);
  imgEl.setAttribute('alt', alt);
  ul.append(li);
  li.append(imgEl);
  gallery.append(ul);
  return ul;
}
function createGallery(galleryItems) {
  return galleryItems.reduce((acc, el) => acc.concat(createImg(el)), []);
}
const fullGallery = createGallery(galleryItems);
gallery.append(...fullGallery);

gallery.addEventListener('click', clickImg);

function clickImg() {
  const name = event.target;
  if (name.nodeName !== 'IMG') return;
  addClass(name);
  let srcImg = event.target.dataset.fullview;
  let newImg = document.querySelector('.fullview');
  newImg.src = srcImg;
}
function addClass(image) {
  const currentImg = ul.querySelector('img.active');
  if (currentImg) {
    currentImg.classList.remove('active');
  }
  image.classList.add('active');
}
