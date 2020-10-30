import { Column, Entity } from "typeorm";

@Entity("config_template", { schema: "gamedb" })
export class ConfigTemplate {
  @Column("int", { primary: true, name: "id" })
  id: number;

  @Column("varchar", { name: "dictionary", nullable: true, length: 100 })
  dictionary: string | null;

  @Column("varchar", { name: "GAcolumn", nullable: true, length: 255 })
  gAcolumn: string | null;

  @Column("varchar", { name: "default_value", nullable: true, length: 255 })
  defaultValue: string | null;

  @Column("varchar", { name: "inpath", nullable: true, length: 255 })
  inpath: string | null;

  @Column("tinyint", { name: "option", nullable: true })
  option: number | null;
}
