
export function getAllNonEmpty(obj: any): any {
    return Object.entries(obj).reduce((acc, [key, value]) => {

        if (value instanceof String) {
            const trimmed = (value as string).trim();
            if (trimmed.length > 0) return { ...acc, [key]: trimmed}
        }
        else if (value) { return {...acc, [key]: value} }
        else { return acc; }
    }, {});
}
