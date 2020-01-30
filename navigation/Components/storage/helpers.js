export const checkDataExistence = (arr, newValue) => {
    for(let item of arr) {
        if(item.id.toString() === newValue.id.toString())
            return true;
    }
    return false;
}