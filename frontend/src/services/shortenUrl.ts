export async function shortenUrl(url: string) {
  const resp = await fetch("http://localhost:5000", {
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