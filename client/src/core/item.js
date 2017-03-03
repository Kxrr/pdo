/**
 * Created by kxrr on 17/2/24.
 */


export function merge(items, newItem) {
    let mergedItems = [];
    let merged = false;

    for (let i of items){
        if (!merged && newItem.id == i.id){
            merged = true;
            mergedItems.push(newItem);
        } else {
            mergedItems.push(i);
        }
    }

    if (!merged){
        // a new item
        mergedItems.push(newItem);
    }

    return mergedItems;
}
