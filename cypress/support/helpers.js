export function strToHex(str) {
    var arr1 = [];
    for (let i = 0; i < str.length; i++) {
        var hex = Number(str.charCodeAt(i)).toString(16);
        arr1.push(hex);
    }
    return arr1.join(' ');
}