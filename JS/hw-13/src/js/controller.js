export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    view.on('add', this.createBookmarks.bind(this));
    view.on('delete', this.deleteBookmarks.bind(this));
    view.on('loaded', this.drawingFromStorage.bind(this));
  }
  //drawingFromStorage() {
    // this.model.itemFromStorage()
    // .then(data => this.view.createItem(data))

  }
  createBookmarks(text) {
   this.model.addItem(text)
   .then(data=>this.view.createItem(data))

  }
  deleteBookmarks(id) {
    console.log(id)
    this.model.deleteItem(id);
    this.view.removeItem(id);
  }
}

