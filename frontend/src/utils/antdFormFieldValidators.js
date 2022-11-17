
export const validateNoStartEndSpaces = (_, value) => {
    return value?.trim() === value ? Promise.resolve() : Promise.reject(new Error("Cannot start or end on space"))
}


export const validateStreetNumber = (_, value) => {
    return /^[1-9][0-9]{0,}[a-zA-Z]?$/.test(value?.trim()) ? Promise.resolve() : Promise.reject(new Error("Number followed by at most one letter"))
}

export const validateZipCode = (_, value) => {
    return /\b\d{5}\b/g.test(value?.trim()) ? Promise.resolve() : Promise.reject(new Error("Zip Code is 5-digit number"))
}


