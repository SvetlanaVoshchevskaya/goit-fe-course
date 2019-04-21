import v4 from 'uuid/v4';

import fetchData from './api';

export default class Model {
    constructor(items) {
        this.items = items || [];
        this.arrayToStorage = JSON.parse(localStorage.getItem('bookmark')) || [];
    }

    addItem(text) {
        const item = {
            id: v4(),
            content: text,
        };
        this.items.push(item);
      
       return fetchData(item).then(data => console.log(data))
    }

    deleteItem(id) {
        this.items = this.items.filter(el => el.id !== id);
        console.log(id)
        localStorage.setItem('bookmark', JSON.stringify(this.items));
    }

    itemFromStorage() {
        return this.arrayToStorage.forEach(item => fetchData(item).then(data => console.log(data)))
    }
}
