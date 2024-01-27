import type { ApiError } from "api-schemas";

type ApiResponse<T> =
  | {
      ok: true;
      data: T;
      error: undefined;
      statusCode: number;
      rawResponse: Response;
    }
  | {
      ok: false;
      error: ApiError;
      data: undefined;
      statusCode: number;
      rawResponse: Response;
    };

type BaseApiFetcherArgs = {
  path: string;
  sessionId?: string;
};

type GetRequestArgs = BaseApiFetcherArgs & {
  method: "GET" | "DELETE";
};

type MutateRequestArgs = BaseApiFetcherArgs & {
  method: "POST" | "PUT" | "PATCH";
  body: unknown;
};

export const apiFetcher = async <T>(
  args: GetRequestArgs | MutateRequestArgs
): Promise<ApiResponse<T>> => {
  const options: RequestInit = {
    method: args.method,
    headers: {
      Accept: "application/json"
    }
  };

  if (
    args.method === "POST" ||
    args.method === "PUT" ||
    args.method === "PATCH"
  ) {
    options.body = JSON.stringify(args.body);
    options.headers = {
      ...options.headers,
      "Content-Type": "application/json"
    };
  }

  if (args.sessionId) {
    options.headers = {
      ...options.headers,
      authentication: args.sessionId
    };
  }

  const resp = await fetch(
    process.env.NEXT_PUBLIC_API_URL + args.path,
    options
  );
  const data = (await resp.json()) as T | ApiError;

  if (!resp.ok) {
    return {
      ok: false,
      error: data as ApiError,
      data: undefined,
      statusCode: resp.status,
      rawResponse: resp
    };
  }

  return {
    ok: true,
    data: data as T,
    error: undefined,
    statusCode: resp.status,
    rawResponse: resp
  };
};
