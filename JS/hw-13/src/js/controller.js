export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.arrayToStorage = JSON.parse(localStorage.getItem('bookmark')) || [];

    view.on('add', (text) => this.createBookmarks(text));
    view.on('delete', (id) => this.deleteBookmarks(id));
    view.on('loaded', () => this.drawingFromStorage());
  }
  drawingFromStorage() {
    if (this.arrayToStorage) {
      this.arrayToStorage.forEach(item => this.view.createItem(item))
    }

  }

  createBookmarks(text) {
    this.model.addItem(text)
      .then(data => {
        this.view.createItem(data)
      })
  }

  deleteBookmarks(id) {
    this.model.deleteItem(id);
    this.view.removeItem(id);

  }
}

