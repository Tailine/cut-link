import { ChangeEvent, useState } from "react";
import s from "./App.module.css";
import { LinkIcon } from "./components/LinkIcon";
import { IconColors, LinkHashResponse } from "./types";
import copyIcon from "./assets/icon-copy.svg";
import { copyToClipboard } from "./utils/copyToClipboard";

const BASE_URL = "localhost:5000/";

function App() {
  const [shortUrl, setShortUrl] = useState("");
  const [originalUrl, setOriginalUrl] = useState("");

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setOriginalUrl(e.target.value);
  }

  async function shortenUrl() {
    const resp = await fetch("http://localhost:5000", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: originalUrl,
      }),
    });
    const data: LinkHashResponse = await resp.json();
    setShortUrl(`${BASE_URL}${data.hash}`);
    console.log({ data });
  }

  async function copy() {
    await copyToClipboard(shortUrl);
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
          <div className={s.copyWrapper}>
            <div className={s.shortLinkWrapper}>
              <LinkIcon color={IconColors.BLUE} />
              <p>{shortUrl}</p>
            </div>
            <button className={s.copyBtn} onClick={copy}>
              <img src={copyIcon} alt="copy icon" />
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}

export default App;
