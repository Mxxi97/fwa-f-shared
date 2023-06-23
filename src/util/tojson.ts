export function toJSON<T>(array: T[]): T[] {
    return array.map((item) => {
        return { ...item } as T;
    });
}
