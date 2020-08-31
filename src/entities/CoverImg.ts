import { Column, Entity } from "typeorm";

@Entity("coverimg", { schema: "gamedb" })
export class Coverimg {
  @Column("bigint", { primary: true, name: "idCoverImg" })
  idCoverImg: string;

  @Column("text", { name: "type", nullable: true })
  type: string | null;

  @Column("text", { name: "name", nullable: true })
  name: string | null;

  @Column("text", { name: "data", nullable: true })
  data: string | null;
}
