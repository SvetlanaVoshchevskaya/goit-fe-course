
import fetchData from './api';
import v4 from 'uuid/v4';


export default class Model {
    constructor(items) {
        this.items = items || [];
        this.arrayToStorage = JSON.parse(localStorage.getItem('bookmark'));
    }

    addItem(text) {
        const item = fetchData(text)
        item.then(data => this.addtoStorage(data))
        return item
    }

    validText(text) {
        return this.arrayToStorage.some(item => item.url === text);

    }

    addtoStorage(data) {
        data.id = v4();
        this.items.push(data);
        localStorage.setItem('bookmark', JSON.stringify(this.items))
    }

    deleteItem(id) {
        const newArr = this.arrayToStorage.filter(el => el.id !== id
        );
        localStorage.setItem('bookmark', JSON.stringify(newArr));
    }

}
