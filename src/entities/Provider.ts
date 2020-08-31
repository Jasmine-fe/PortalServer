import { Column, Entity } from "typeorm";

@Entity("provider", { schema: "gamedb" })
export class Provider {
  @Column("int", { primary: true, name: "id" })
  id: number;

  @Column("text", { name: "companyName", nullable: true })
  companyName: string | null;

  @Column("text", { name: "companyTel", nullable: true })
  companyTel: string | null;

  @Column("text", { name: "companyLoc", nullable: true })
  companyLoc: string | null;

  @Column("text", { name: "providerId", nullable: true })
  providerId: string | null;
}
