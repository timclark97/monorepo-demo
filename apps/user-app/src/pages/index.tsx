import { useState } from "react";
import Head from "next/head";
import { Inter } from "next/font/google";
import { createUser } from "api-sdk";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<number>();
  const [error, setError] = useState("");

  return (
    <>
      <Head>
        <title>User App</title>
      </Head>
      <main className={`flex min-h-screen ${inter.className}`}>
        <div className="m-auto max-w-md">
          <h1 className="text-2xl font-semibold">Create Your User</h1>
          <div className="m-auto max-w-md pt-10">
            {userId && (
              <div className="pb-2 text-lg font-bold">
                User: {userId} created
              </div>
            )}
            {error && (
              <div className="pb-2 text-lg font-bold text-red-700">{error}</div>
            )}
            <form
              onSubmit={async (e) => {
                setError("");
                setIsLoading(true);
                e.preventDefault();
                const fd = new FormData(e.target as HTMLFormElement);
                const firstName = fd.get("firstName") as string;
                const lastName = fd.get("lastName") as string;

                const { data, error } = await createUser({
                  firstName,
                  lastName
                });
                if (error) {
                  setError(error.message);
                  setIsLoading(false);
                  return;
                }

                setUserId(data.id);
                setIsLoading(false);
              }}
              className="grid grid-cols-2 gap-4"
            >
              <input name="firstName" autoComplete="given-name" required />
              <input name="lastName" autoComplete="family-name" required />
              <button disabled={isLoading} type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
