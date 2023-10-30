import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  OneToMany,
} from "typeorm";
import { Point } from "geojson";

import Match from "../Match/MatchEntity";

@Entity("users")
class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @CreateDateColumn({ name: "created_on" })
  createdOn: Date;

  @UpdateDateColumn({ name: "updated_on" })
  updatedOn: Date;

  @Column({ type: "text", name: "first_name", default: "" })
  firstName: string;

  @Column({ type: "text", name: "last_name", default: "" })
  lastName: string;

  @Column({ type: "text", name: "address_1", default: "" })
  address1: string;

  @Column({ type: "text", name: "address_2", default: "" })
  address2: string;

  @Column({ type: "text", default: "" })
  city: string;

  @Column({ type: "text", name: "zip_code", default: "" })
  zipCode: string;

  @Column({ type: "text", name: "sate_id", default: "" })
  stateId: string;

  @Index({ spatial: true })
  @Column({
    type: "geography",
    spatialFeatureType: "Point",
    srid: 4326,
    nullable: true,
  })
  location: Point;

  @OneToMany(() => Match, (m) => m.user)
  matches: Match[];
}

export default User;
