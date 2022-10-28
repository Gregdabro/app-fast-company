export function transformArrayData(array) {
    return array.map(item => ({
        label: item.name, value: item._id
    }));
}
