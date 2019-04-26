
import fetchData from './api';
import v4 from 'uuid/v4';
export default class Model {
    constructor(items) {
        this.items = items || [];
        // this.selectedIndex = -1

    }

    addItem(text) {
        const item = fetchData(text);
        item.then(data => {
            data.id = v4()
            this.items.push(data);
            localStorage.setItem('bookmark', JSON.stringify(this.items))
        });
        return item
    }


    deleteItem(id) {
        let arrayToStorage = JSON.parse(localStorage.getItem('bookmark'))
        // const newArr = arrayToStorage.splice(index, 1);
        const newArr = arrayToStorage.filter(el => el.id !== Number(id));
        console.log(id)
        localStorage.setItem('bookmark', JSON.stringify(newArr));
    }

}
