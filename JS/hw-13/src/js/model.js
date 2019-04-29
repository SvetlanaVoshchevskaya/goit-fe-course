
import fetchData from './api';
import v4 from 'uuid/v4';


export default class Model {
    constructor(items) {
        this.items = items || [];
        this.arrayToStorage = JSON.parse(localStorage.getItem('bookmark'));
    }

    addItem(text) {
        let item = fetchData(text);
        if (this.items.length === 0) {
            item.then(data => this.addtoStorage(data))
        }
        else if (this.items.length > 0) {
            if (!this.validText(text)) {
                item.then(data => this.addtoStorage(data))
            }
            else {
                alert('bookmark already exist');
                return;
            }
        }
        return item
    }

    validText(text) {
        return this.items.some(item => item.url === text);
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
