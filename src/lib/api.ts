const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

export async function api<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
  });

  if (!response.ok) {
    const message = await response.text();
    let errorMessage = "Something went wrong. Please try again.";

    try {
      const payload = JSON.parse(message) as { error?: string };
      if (payload?.error) {
        errorMessage = payload.error;
      }
    } catch {
      // Ignore parse errors and use the default fallback message.
    }

    throw new Error(errorMessage);
  }

  const text = await response.text();
  if (!text) {
    return undefined as T;
  }

  return JSON.parse(text) as T;
}
