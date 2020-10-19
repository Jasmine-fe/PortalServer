export const configConvert = async (dictionaries, data) => {
    await data.forEach((data) => {
        dictionaries.forEach((dic, index) => {
            const key = Object.keys(dic)[0];
            if (key == data.dictionary) {
                dictionaries[index][key].push({ "GAcolumn": data.gAcolumn, "default_value": data.defaultValue, ... data })
            }
        });
    });
    return dictionaries;
}