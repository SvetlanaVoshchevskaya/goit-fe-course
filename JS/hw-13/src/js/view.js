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
    this.form.addEventListener('submit', this.getValue.bind(this));
    window.addEventListener(
      'DOMContentLoaded', this.drawingItemFromStorage.bind(this)
    );
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
    this.content.addEventListener('click', this.handleRemove.bind(this));
  }

  handleRemove() {
    // const parent = target.closest('.bookmarks')
    if (event.target.textContent === 'Delete') {
      const button = event.target;
      const card = button.parentNode;
      this.emit('delete', card.dataset.id);
      console.log(parent)
    }

  }

  removeItem(id) {
    const card = this.content.querySelector(`[data-id="${id}"]`);
    console.log(id)
   card.remove()
  }
}

