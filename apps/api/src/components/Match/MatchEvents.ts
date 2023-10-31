import { UserSchema } from "api-schemas";
import EventEmitter from "node:events";

import db from "../../lib/database";
import Company from "../Company/CompanyEntity";
import Match from "./MatchEntity";

const MatchEventEmitter = new EventEmitter();

MatchEventEmitter.on("user-located", async (user: UserSchema) => {
  if (!user.location) {
    return;
  }
  // Find the 3 nearest companies within 50 miles (80467 meters)
  const nearestCompanies = await db
    .getRepository(Company)
    .createQueryBuilder("company")
    .addSelect("location <-> ST_GeomFromGeoJSON(:origin) as distance")
    .where("ST_DWithin(ST_GeomFromGeoJSON(:origin), location, 80467)")
    .setParameters({ origin: JSON.stringify(user.location) })
    .orderBy("distance")
    .limit(3)
    .getMany();

  if (nearestCompanies.length === 0) {
    return;
  }

  const matches = nearestCompanies.map((c) => ({
    companyId: c.id,
    userId: user.id,
  }));

  await db
    .getRepository(Match)
    .createQueryBuilder()
    .insert()
    .into(Match)
    .values(matches)
    .execute();
});

export default MatchEventEmitter;
