import React from "react";
import Head from "next/head";
import { Inter } from "next/font/google";
import { Button, Input } from "components";
import { createUser } from "api-sdk";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [userId, setUserId] = React.useState("");
  const [error, setError] = React.useState("");
  return (
    <>
      <Head>
        <title>User App</title>
      </Head>
      <main className={`flex min-h-screen ${inter.className}`}>
        <div className="max-w-md m-auto">
          <h1 className="text-2xl font-semibold">Create Your User</h1>
          <div className="max-w-md m-auto pt-10">
            {userId && (
              <div className="font-bold pb-2 text-lg">
                User: {userId} created
              </div>
            )}
            {error && (
              <div className="font-bold pb-2 text-red-700 text-lg">{error}</div>
            )}
            <form
              onSubmit={async (e) => {
                try {
                  setError("");
                  setIsLoading(true);
                  e.preventDefault();
                  const fd = new FormData(e.target as HTMLFormElement);
                  const firstName = fd.get("firstName") as string;
                  const lastName = fd.get("lastName") as string;
                  const address1 = fd.get("address1") as string;
                  const address2 = fd.get("address2") as string;
                  const city = fd.get("city") as string;
                  const stateId = fd.get("stateId") as string;
                  const zipCode = fd.get("zipCode") as string;

                  const { id } = await createUser({
                    firstName,
                    lastName,
                    address1,
                    address2,
                    city,
                    stateId,
                    zipCode,
                  });
                  setUserId(id);
                  setIsLoading(false);
                } catch (e: any) {
                  setError(e.message);
                  setIsLoading(false);
                }
              }}
              className="grid gap-4 grid-cols-2"
            >
              <Input
                name="firstName"
                label="First Name"
                autoComplete="given-name"
              />
              <Input
                name="lastName"
                label="Last Name"
                autoComplete="family-name"
              />
              <Input
                name="address1"
                label="Address Line 1"
                autoComplete="address-line1"
              />
              <Input
                name="address2"
                label="Address Line 2"
                autoComplete="address-line2"
              />
              <Input name="city" label="City" autoComplete="address-level2" />
              <Input
                name="stateId"
                label="State"
                autoComplete="address-level1"
                maxLength={2}
              />
              <Input
                name="zipCode"
                label="Zip Code"
                autoComplete="postal-code"
              />
              <div />
              <Button isLoading={isLoading}>Submit</Button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
