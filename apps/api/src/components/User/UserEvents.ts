import EventEmitter from "node:events";
import type { UserSchema } from "api-schemas";

import User from "./UserEntity";
import { getCoordinates } from "../../lib/geocoder";
import MatchEventEmitter from "../Match/MatchEvents";

const UserEventEmitter = new EventEmitter();

UserEventEmitter.on("user-created", async (user: UserSchema) => {
  if (user.address1 && user.zipCode && user.city && user.stateId) {
    // Get user coordinates and store them in the database
    const coordinates = await getCoordinates(
      `${user.address1} ${user.address2} ${user.city} ${user.stateId} ${user.zipCode}`
    );
    if (!coordinates) {
      return;
    }

    await User.update(
      { id: user.id },
      {
        location: {
          type: "Point",
          coordinates: [coordinates.lng, coordinates.lat],
        },
      }
    );

    user.location = {
      type: "Point",
      coordinates: [coordinates.lng, coordinates.lat],
    };
    MatchEventEmitter.emit("user-located", user);
  }
});

export default UserEventEmitter;
