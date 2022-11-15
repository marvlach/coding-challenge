
export const validateNoStartEndSpaces = (_, value) => {
    return value.trim() === value ? Promise.resolve() : Promise.reject(new Error("Cannot start or end on space"))
}


