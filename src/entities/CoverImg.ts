import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("coverimg", { schema: "gamedb" })
export class Coverimg {
  @PrimaryGeneratedColumn({ type: "int", name: "idCoverImg" })
  idCoverImg: number;

  @Column("text", { name: "type", nullable: true })
  type: string | null;

  @Column("text", { name: "name", nullable: true })
  name: string | null;

  @Column("longblob", { name: "data", nullable: true })
  data: Buffer | null;
}
