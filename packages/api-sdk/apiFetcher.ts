const apiFetcher = async <Type>({
  method,
  path,
  body,
}: {
  path: string;
  method: "GET" | "POST" | "PATCH" | "DELETE";
  body?: any;
}): Promise<Type> => {
  const options: any = {
    method,
    headers: {},
  };
  if (body && method !== "GET") {
    options.body = JSON.stringify(body);
    options.headers["Content-Type"] = "application/json";
  }

  const urlBase = "http://localhost:5001";

  const resp = await fetch(urlBase + path, {
    ...options,
    signal: AbortSignal.timeout(5000),
  });

  const data = (await resp.json()) as any;
  if (!resp.ok) {
    let message;
    try {
      message = JSON.parse(data.message);
    } catch {
      message = data.message;
    }
    throw new Error(
      data.paths ? data?.paths[0]?.path?.join(" ") + " invalid" : message
    );
  }
  return data;
};

export default apiFetcher;
