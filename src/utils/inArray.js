function inArray(list, item) {

    let index = list.findIndex((value) => {
        return value === item;
    });

    if(index > -1){
        return true;
    }
    return false;
};

export default inArray;
