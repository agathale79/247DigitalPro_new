import { getApiBase } from "@/lib/config";

export type ApiError = {
  message: string;
  details?: unknown;
};

export async function apiFetch<T = unknown>(
  path: string,
  options: {
    token?: string | null;
    method?: string;
    body?: unknown;
  } = {}
): Promise<{ data: T; response: Response }> {
  const { token, method = "GET", body } = options;
  const headers: Record<string, string> = {};
  if (body !== undefined) {
    headers["Content-Type"] = "application/json";
  }
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${getApiBase()}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const data = (await response.json().catch(() => ({}))) as T & {
    error?: string;
    message?: string;
    details?: unknown;
  };

  if (!response.ok) {
    const message =
      (data as { error?: string }).error ??
      (data as { message?: string }).message ??
      `Request failed (${response.status})`;
    const err = new Error(message) as Error & ApiError;
    err.details = (data as { details?: unknown }).details;
    throw err;
  }

  return { data, response };
}
