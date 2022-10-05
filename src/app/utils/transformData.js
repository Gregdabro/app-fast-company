export function transformData(data) {
    return data
        ? Object.keys(data).map(key => ({
            ...data[key]
        }))
        : [];
}
