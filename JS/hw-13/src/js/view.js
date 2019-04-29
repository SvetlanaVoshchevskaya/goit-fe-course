import Event from './event-emitter';

export default class View extends Event {
  constructor() {
    super();
    this.form = document.querySelector('.js-forms');
    this.source = document.querySelector('#js-card-template').innerHTML.trim();
    this.input = document.querySelector('.link-input');
    this.content = document.querySelector('.content');
    this.dataFromStorage = JSON.parse(localStorage.getItem('bookmark')) || [];
    this.form.addEventListener('submit', (event) => this.getValue(event));
    window.addEventListener(
      'DOMContentLoaded', () => this.drawingItemFromStorage())

  }

  drawingItemFromStorage() {
    this.emit('loaded', this.dataFromStorage);
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
    this.content.insertAdjacentHTML('afterbegin', markup);
    this.content.addEventListener('click', ({ target }) => this.handleRemove({ target }));
  }

  handleRemove({ target }) {
    const card = target.closest('.bookmarks');
    this.emit('delete', card.dataset.id);
  }

  removeItem(id) {
    const card = document.querySelector(`[data-id="${id}"]`);
    if (card) { card.remove() }
  }
}

