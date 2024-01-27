import EventEmitter from "node:events";
import type { UserSchema } from "api-schemas";

const UserEventEmitter = new EventEmitter();

UserEventEmitter.on("user-created", (user: UserSchema) => {
  console.log(JSON.stringify(user), " was created");
});

export default UserEventEmitter;
