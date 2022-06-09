export async function copyToClipboard(url: string) {
  if ("clipboard" in navigator) {
    return await navigator.clipboard.writeText(url);
  }
}