'use strict';
const laptops = [{
    size: 13,
    color: 'white',
    price: 28000,
    release_date: 2015,
    name: 'Macbook Air White 13"',
    img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
    descr: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.'
  },
  {
    size: 13,
    color: 'gray',
    price: 32000,
    release_date: 2016,
    name: 'Macbook Air Gray 13"',
    img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
    descr: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.'
  },
  {
    size: 13,
    color: 'black',
    price: 35000,
    release_date: 2017,
    name: 'Macbook Air Black 13"',
    img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
    descr: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.'
  },
  {
    size: 15,
    color: 'white',
    price: 45000,
    release_date: 2015,
    name: 'Macbook Air White 15"',
    img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
    descr: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.'
  },
  {
    size: 15,
    color: 'gray',
    price: 55000,
    release_date: 2016,
    name: 'Macbook Pro Gray 15"',
    img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
    descr: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.'
  },
  {
    size: 15,
    color: 'black',
    price: 45000,
    release_date: 2017,
    name: 'Macbook Pro Black 15"',
    img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
    descr: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.'
  },
  {
    size: 17,
    color: 'white',
    price: 65000,
    release_date: 2015,
    name: 'Macbook Air White 17"',
    img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
    descr: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.'
  },
  {
    size: 17,
    color: 'gray',
    price: 75000,
    release_date: 2016,
    name: 'Macbook Pro Gray 17"',
    img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
    descr: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.'
  },
  {
    size: 17,
    color: 'black',
    price: 80000,
    release_date: 2017,
    name: 'Macbook Pro Black 17"',
    img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
    descr: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.'
  }
];

const form = document.querySelector('.form');
const galleryList = document.querySelector('.gallery-list');
const source = document.querySelector('#item').innerHTML.trim();

function render(template) {
  const templ = Handlebars.compile(source);
  const markup = templ(template);
  galleryList.innerHTML = markup;
}
render(laptops);


function checkItem() {
  event.preventDefault();
  const input = Array.from(
    document.querySelectorAll('[type=checkbox]:checked')
  );
  const filter = input.reduce((acc, value) => {
    if (acc.hasOwnProperty(value.name)) {
      acc[value.name] = [value.value];
    } else {
      acc[value.name] = [value.value];
    }
    return acc;
  }, {});
  galleryList.innerHTML = ' ';
  const newArr = filterGallery(filter, laptops);
  if (newArr.length > 0) {
    render(newArr);
  }
}

function filterGallery(obj, arr) {
  let result = Object.keys(obj).reduce((acc, item) => {
    if (obj[item].length !== 0) {
      return arr.filter(el => obj[item].includes(String(el[item])));
    } else {
      obj[item].filter(el => {
        return obj[item].includes(String(el[item]));
      });
    }
    return acc;
  }, []);
  return result;
}

form.addEventListener('submit', checkItem);