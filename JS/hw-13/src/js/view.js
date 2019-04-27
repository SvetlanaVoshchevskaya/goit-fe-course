import Event from './event-emitter';

export default class View extends Event {
  constructor() {
    super();
    this.form = document.querySelector('.js-forms');
    this.source = document.querySelector('#js-card-template').innerHTML.trim();
    // this.delBtn = document.querySelector('.delete');
    this.input = document.querySelector('.link-input');
    this.content = document.querySelector('.content');
    this.dataFromStorage = JSON.parse(localStorage.getItem('bookmark')) || [];
    this.form.addEventListener('submit', (event) => this.getValue(event));
    window.addEventListener(
      'DOMContentLoaded', () => this.drawingItemFromStorage())

  }

  drawingItemFromStorage() {
    this.emit('loaded', this.dataFromStorage);
    console.log(this.dataFromStorage)
  }

  getValue(event) {
    event.preventDefault();
    let text = this.input.value;
    this.emit('add', text);
    this.input.value = '';
  }

  createItem(obj) {
    const template = Handlebars.compile(this.source);
    const markup = template(obj);
    console.log(obj)
    this.content.insertAdjacentHTML('afterbegin', markup);
    this.content.addEventListener('click', ({ target }) => this.handleRemove({ target }));
  }

  handleRemove({ target }) {
    const button = target.closest('.bookmarks');
    console.log(button)
    this.emit('delete', button.dataset.id);
  }

  removeItem() {
    const idBookmark = event.target.parentNode;
    const card = document.querySelector(`[data-id="${idBookmark.dataset.id}"]`);
    card.remove()
  }
}

