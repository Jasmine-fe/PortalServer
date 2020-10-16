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

export const gameIdModel = async (list, configData) => {

    const res: any[] = [];
    await configData.forEach(game => {
        list.forEach(ls => {
            if (ls.gameId === game.gameid) {
                res.push({ ...ls, ...game })
            }
        });
    });
    return res;
}