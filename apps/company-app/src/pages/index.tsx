import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Inter } from "next/font/google";
import { Button, Input } from "components";
import { createCompany } from "api-sdk";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Company App</title>
      </Head>
      <main className={`flex min-h-screen ${inter.className}`}>
        <div className="max-w-md m-auto">
          <h1 className="pb-10 text-2xl font-semibold">Create Your Company</h1>
          {error && (
            <div className="font-bold pb-2 text-red-700 text-lg">{error}</div>
          )}
          <form
            onSubmit={async (e) => {
              try {
                e.preventDefault();
                setError("");
                setIsLoading(true);
                const fd = new FormData(e.target as HTMLFormElement);
                const name = fd.get("name") as string;
                const address1 = fd.get("address1") as string;
                const address2 = fd.get("address2") as string;
                const city = fd.get("city") as string;
                const stateId = fd.get("stateId") as string;
                const zipCode = fd.get("zipCode") as string;

                const { id } = await createCompany({
                  name,
                  address1,
                  address2,
                  city,
                  stateId,
                  zipCode,
                });
                router.push(`/${id}`);
                setIsLoading(false);
              } catch (e: any) {
                setError(e.message);
                setIsLoading(false);
              }
            }}
            className="grid gap-4 grid-cols-2"
          >
            <Input name="name" label="Name" />
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
            <Input name="zipCode" label="Zip Code" autoComplete="postal-code" />

            <Button isLoading={isLoading}>Submit</Button>
          </form>
        </div>
      </main>
    </>
  );
}
