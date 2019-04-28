export default function validText(array, text) {
    const check = array.some(item => item.url === text);
    if (check) { alert('bookmark already exist'); return; }
}