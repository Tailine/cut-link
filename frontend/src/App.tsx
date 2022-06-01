import { ChangeEvent, useState } from "react";
import s from "./App.module.css";
import { Input } from "./components/Input";
import { LinkIcon } from "./components/LinkIcon";
import { IconColors } from "./types";

function App() {
  const [shortUrl, setShortUrl] = useState("");
  const [originalUrl, setOriginalUrl] = useState("");

  async function copyTextToClipboard() {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(shortUrl);
    }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setOriginalUrl(e.target.value);
  }

  async function shortenUrl() {
    const resp = await fetch("http://localhost:5000", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        url: originalUrl,
      }),
    });
    const data = await resp.json();
    console.log({ data });
  }

  return (
    <main>
      <div className={s.container}>
        <h1>Mini link</h1>
        <div className={s.wrapper}>
          <div className={s.inputContainer}>
            <input
              placeholder="Paste link here"
              className={s.input}
              onChange={handleChange}
            />
            <div className={s.icon}>
              <LinkIcon color={IconColors.GRAY} />
            </div>
          </div>
          <button className={s.button} onClick={shortenUrl}>
            Shorten
          </button>
        </div>
        <section>
          <label className={s.label}>Short url</label>
          <div className={s.shortLinkContainer}>
            <LinkIcon color={IconColors.BLUE} />
            <p>{shortUrl}</p>
          </div>
          <button onClick={copyTextToClipboard}>copy</button>
        </section>
      </div>
    </main>
  );
}

export default App;
