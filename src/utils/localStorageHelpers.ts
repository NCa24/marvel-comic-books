export const getFromLocalStorage = (key: string): any => {
    try {
        const data = localStorage.getItem(key);
        if(data) {
            return JSON.parse(data);
        }
        return null;
    } catch (err: any) {
        return null;
    }
}

export const setInLocalStorage = (key: string, data: any): boolean => {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (err: any) {
        return false;
    }
}
