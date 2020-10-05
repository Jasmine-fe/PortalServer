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