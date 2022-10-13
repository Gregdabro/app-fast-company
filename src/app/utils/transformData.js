export function transformData(data) {
    return data && !data._id
        ? Object.keys(data).map(key => ({
            ...data[key]
        }))
        : data;
}
