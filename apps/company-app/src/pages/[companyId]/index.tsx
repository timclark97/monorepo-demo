import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { getCompany, listMatches } from "api-sdk";
import {
  GetCompanyResponseSchema,
  ListMatchesResponseSchema,
} from "api-schemas";

export default function CompanyPage() {
  const router = useRouter();
  const [error, setError] = React.useState("");
  const [company, setCompany] = React.useState<GetCompanyResponseSchema>();
  const [matches, setMatches] = React.useState<ListMatchesResponseSchema>();

  const loadData = async () => {
    try {
      const id = router.query.companyId as string;
      const c = await getCompany({ id });
      const m = await listMatches({ companyId: id });
      setCompany(c);
      setMatches(m);
    } catch (e: any) {
      console.error(e);
      setError(e.message);
    }
  };

  React.useEffect(() => {
    if (router.query.companyId) {
      loadData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);

  return (
    <>
      <Head>
        <title>{company?.name}</title>
      </Head>
      <div className="max-w-md m-auto pt-10">
        {error}
        <h1 className="text-2xl font-semibold">{company?.name}</h1>
        <div className="pb-10">
          {company?.address1} {company?.address2} {company?.city},{" "}
          {company?.stateId} {company?.zipCode}
        </div>
        <h2 className="text-lg font-medium">Matches</h2>
        {matches?.map((m) => (
          <div
            className="bg-green-700 rounded-md flex items-center justify-between text-white p-4 mb-4"
            key={m.id}
          >
            <div className="text-lg font-medium">
              {m.user.firstName} {m.user.lastName}
            </div>
            <div>
              {m.user.city}, {m.user.stateId}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
