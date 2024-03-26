import type { AccessTokenResponse } from "../types/types";
import { API_URL } from "./constans";

export default async function requestNewAccessToken(refreshToken: string) {
  const response = await fetch(`${API_URL}/auth-token/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken }),
  });

  if (response.ok) {
    const json = (await response.json()) as AccessTokenResponse;

    if (json.error) {
      throw new Error('Aquillego al refresh '+json.error);
    }
    return json.body.accessToken;
  } else {
    throw new Error("Unable to refresh access token.");
  }
}