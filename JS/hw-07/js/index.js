'use strict';


const posts = [{
    img: 'https://placeimg.com/400/150/arch',
    title: 'Post title 1',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos ea temporibus voluptatem maiores maxime consequatur impedit nobis sunt similique voluptas accusamus consequuntur, qui modi nesciunt veritatis distinctio rem!',
    link: 'link-1.com'
  },
  {
    img: 'https://placeimg.com/400/150/nature',
    title: 'Post title 2',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos ea temporibus voluptatem maiores maxime consequatur impedit nobis sunt similique voluptas accusamus consequuntur, qui modi nesciunt veritatis distinctio rem!',
    link: 'link-2.com'
  },
  {
    img: 'https://placeimg.com/400/150/arch',
    title: 'Post title 3',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos ea temporibus voluptatem maiores maxime consequatur impedit nobis sunt similique voluptas accusamus consequuntur, qui modi nesciunt veritatis distinctio rem!',
    link: 'link-3.com'
  }
];

const root = document.querySelector('.root');

function createPostCard({img,title,text,link}) {
  const post = document.createElement('div');
  const imgEl = document.createElement('img');
  const h2 = document.createElement('h2');
  const p = document.createElement('p');
  const a = document.createElement('a');
  post.classList.add('post');
  imgEl.classList.add('post__image');
  imgEl.setAttribute('src', img);
  imgEl.setAttribute('alt', 'post__image');
  h2.classList.add('post__title');
  h2.textContent = title;
  p.classList.add('post__text');
  p.textContent = text;
  a.classList.add('button');
  a.setAttribute('href', link);
  a.textContent = 'Read more';
  post.append(imgEl, h2, p, a);

  return post;
}

function createCards(posts) {
  return posts.map(post => createPostCard(post));
}


const allPost = createCards(posts);
root.append(...allPost);