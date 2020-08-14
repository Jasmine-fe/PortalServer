import { getManager, Repository, Any } from 'typeorm';
import { GameServerIp } from '../entities/GameServerIp';

/**
   * Returns last game server IP
   */
export const getGameServerIp = async () => {
    const lastIp = await getManager()
    .getRepository(GameServerIp)
    .createQueryBuilder("GSI")
    .orderBy({"GSI.lastUpdateTime": "DESC"})
    .where("GSI.status = 'true'")
    .getOne();
    return lastIp;
} 