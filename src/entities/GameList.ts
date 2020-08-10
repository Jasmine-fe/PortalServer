import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("GameList", { schema: "compal" })
export class GameList {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("varchar", { name: "name", nullable: true, length: 20 })
  name: string | null;

  @Column("varchar", { name: "imageURL", nullable: true, length: 200 })
  imageUrl: string | null;

  @Column("varchar", { name: "descp", nullable: true, length: 200 })
  descp: string | null;

  @Column("int", { name: "providerId", nullable: true, unsigned: true })
  providerId: number | null;

  @Column("datetime", { name: "LastUpdateTime", nullable: true })
  lastUpdateTime: Date | null;
}
