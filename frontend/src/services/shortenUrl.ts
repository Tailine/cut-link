import { BASE_URL } from "../utils/baseUrl";

export async function shortenUrl(url: string) {
  const resp = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url,
      }),
    });
    const { hash, error }= await resp.json();
    return {
      hash,
      error
    }
}