
export const csvFileToArray = string => {
    const csvHeader = string.slice(0, string.indexOf("\r\n")).split(";");
    const csvRows = string.slice(string.indexOf("\r\n") + 2).split("\r\n"); 
    csvRows.pop() // pop EOF
    console.log('csvHeader', csvHeader)
    console.log('csvRows', csvRows)
    const array = csvRows.map(i => {
        const values = i.split(";");
        const obj = csvHeader.reduce((object, header, index) => {
            object[header] = values[index];
            return object;
        }, {});
        return obj;
    });

    const arrayEnglishKeys = array.map(itemGer => {
        const { Land:country, Nachname:lastName, Nr:number, Ort:city, PLZ:code, Rolle:role, Strasse:street, Vorname:firstName } = itemGer;
        return { firstName, lastName, role, street, number, city, code, country, }
    })

    return arrayEnglishKeys;
};