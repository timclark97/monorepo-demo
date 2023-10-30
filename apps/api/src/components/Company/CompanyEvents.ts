import EventEmitter from "node:events";
import type { CompanySchema } from "api-schemas";

import Company from "./CompanyEntity";
import { getCoordinates } from "../../lib/geocoder";

const CompanyEventEmitter = new EventEmitter();

CompanyEventEmitter.on("company-created", async (company: CompanySchema) => {
  if (company.address1 && company.zipCode && company.city && company.stateId) {
    const coordinates = await getCoordinates(
      `${company.address1} ${company.address2} ${company.city} ${company.stateId} ${company.zipCode}`
    );
    if (!coordinates) {
      return;
    }
    await Company.update(
      { id: company.id },
      {
        location: {
          type: "Point",
          coordinates: [coordinates.lng, coordinates.lat],
        },
      }
    );
  }
});

export default CompanyEventEmitter;
