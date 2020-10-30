export const gameModel = async (list, connectGames) => {

    const res: any[] = [];
    await connectGames.forEach(game => {
        list.forEach(ls => {
            if (game.gamename === ls.name) {
                res.push({ ...ls, ...game })
            }
        });
    });
    return res;
}


export const configDataModel = async (configData) => {

    const gameList: any[] = [];
    const resList: any[] = [];
    const res: any[] = [];
    await configData.forEach(data => {
        if (!(gameList.includes(data.gamename))) {
            gameList.push(data.gamename);
            resList.push({ gamename: data.gamename, config: [] });
        }
    });

    await resList.forEach(async (game) => {
        await configData.forEach(data => {
            if (game.gamename == data.gamename) {
                game.config.push(data);
            }
        });
    });
    return { list: gameList, config: resList };
}

export const optionModel = async (optionList) => {
    const res: any[] = [];
    var count = -1;
    await optionList.forEach(option => {
        if (count >= 0 && res[count].gAcolumn == option.gAcolumn) {
            res[count].value.push(option.oPvalue);
        } else {
            count++;
            res.push({
                gAcolumn: option.gAcolumn,
                dictionary: option.dictionary,
                value: []
            })
            res[count].value.push(option.oPvalue);
        }
    });
    console.log("Res", res)
    return res;
}