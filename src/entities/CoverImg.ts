import { Column, Entity } from "typeorm";

@Entity("CoverImg", { schema: "gamedb" })
export class CoverImg {
  @Column("int", { primary: true, name: "idCoverImg" })
  idCoverImg: number;

  @Column("varchar", { name: "type", nullable: true, length: 45 })
  type: string | null;

  @Column("varchar", { name: "name", nullable: true, length: 45 })
  name: string | null;

  @Column("longblob", { name: "data", nullable: true })
  data: Buffer | null;
}
