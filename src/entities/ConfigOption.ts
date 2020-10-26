import { Column, Entity } from "typeorm";

@Entity("config_option", { schema: "gamedb" })
export class ConfigOption {
  @Column("int", { primary: true, name: "id" })
  id: number;

  @Column("varchar", { name: "dictionary", nullable: true, length: 100 })
  dictionary: string | null;

  @Column("varchar", { name: "GAcolumn", nullable: true, length: 255 })
  gAcolumn: string | null;

  @Column("varchar", { name: "OPvalue", nullable: true, length: 255 })
  oPvalue: string | null;
}
