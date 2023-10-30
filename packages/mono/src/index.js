import inquirer from "inquirer";
import { exec } from "child_process";

const appList = ["api", "user-app", "company-app"];
const makeBuildCommand = (app) =>
  `npx turbo build --filter=${app}... --no-cache`;

const recursiveRunner = (cmd) => {
  return new Promise((resolve, reject) => {
    const p = exec(cmd);
    p.stdout.pipe(process.stdout);
    p.on("exit", async (c) => {
      if (c == 1) {
        const { retry } = await inquirer.prompt({
          name: `retry`,
          message: `${cmd} failed. Want to retry?`,
          type: "confirm",
        });
        if (retry) {
          return recursiveRunner(cmd);
        }
        reject(`Command "${cmd}" failed.`);
      }
      resolve();
    });
  });
};

const main = async () => {
  console.clear();
  const { q1 } = await inquirer.prompt({
    name: "q1",
    type: "list",
    message: "What do you want to do",
    choices: ["run app(s) in dev mode", "build app(s)"],
  });
  const { apps } = await inquirer.prompt({
    name: "apps",
    type: "checkbox",
    message: "Select apps",
    choices: appList,
    validate: (apps) => {
      if (apps.length === 0) {
        return "You must select at least one app";
      }
      return true;
    },
  });

  if (q1.split(" ")[0] === "run") {
    const command = apps.map((a) => `--filter=${a}...`).join(" ");
    const p = exec(`npx turbo dev ${command}`);
    p.stdout.pipe(process.stdout);
  }

  try {
    if (q1.split(" ")[0] === "build") {
      for (let index = 0; index < apps.length; index++) {
        const app = apps[index];
        await recursiveRunner(makeBuildCommand(app));
      }
    }
  } catch (e) {
    console.error(e);
  }
};

await main();
