import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import Company from "../Company/CompanyEntity";
import User from "../User/UserEntity";

@Entity("matches")
class Match extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @CreateDateColumn({ name: "created_on" })
  createdOn: Date;

  @UpdateDateColumn({ name: "updated_on" })
  updatedOn: Date;

  @Column({ type: "uuid", name: "user_id" })
  userId: string;

  @ManyToOne(() => User, (u) => u.matches, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column({ type: "uuid", name: "company_id" })
  companyId: string;

  @ManyToOne(() => Company, (c) => c.matches, { onDelete: "CASCADE" })
  @JoinColumn({ name: "company_id" })
  company: Company;
}

export default Match;
