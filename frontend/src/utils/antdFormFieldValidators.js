
export const validateNoStartEndSpaces = (_, value) => {
    return value.trim() === value ? Promise.resolve() : Promise.reject(new Error("No spaces allowed"))
}


