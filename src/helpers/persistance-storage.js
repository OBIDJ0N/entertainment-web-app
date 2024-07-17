export const setItem = (key, data) => {
    try {
        localStorage.setItem(key, data)
    } catch (error) {
        console.log('Error saving data', error);
    }
}

export const getItem = key => {
    try {
        return localStorage.getItem(key)
    } catch (error) {
        console.log('Error getting data', error);
    }
}

export const removeItem = key => {
    try {
        return localStorage.removeItem(key)
    } catch (error) {
        console.log('Error removing data', error);
    }
}