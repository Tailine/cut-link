import { ChangeEvent, useState } from "react";
import s from "./App.module.css";
import { LinkIcon } from "./components/LinkIcon";
import { IconColors } from "./types";
import copyIcon from "./assets/icon-copy.svg";
import { copyToClipboard } from "./utils/copyToClipboard";
import { shortenUrl } from "./services/shortenUrl";

const BASE_URL = "localhost:5000/";

function App() {
  const [shortUrl, setShortUrl] = useState("");
  const [originalUrl, setOriginalUrl] = useState("");
  const [error, setError] = useState("");

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setOriginalUrl(e.target.value);
  }

  async function handleShortenUrl() {
    const { hash, error } = await shortenUrl(originalUrl);
    if (error) {
      setError(error);
    } else {
      setShortUrl(`${BASE_URL}${hash}`);
      setError("");
    }
    console.log({ hash, error });
  }

  async function copy() {
    await copyToClipboard(shortUrl);
  }

  return (
    <main>
      <div className={s.container}>
        <h1>Tiny link</h1>
        <div className={s.originalUrlSection}>
          <label className={s.label}>Paste your link below</label>
          <div className={s.inputSection}>
            <div className={s.inputContainer}>
              <input
                placeholder="Ex: https://youtube.com"
                className={s.input}
                onChange={handleChange}
              />
              {error && <p className={s.errorMsg}>{error}</p>}
              <div className={s.icon}>
                <LinkIcon color={IconColors.GRAY} />
              </div>
            </div>
            <button className={s.button} onClick={handleShortenUrl}>
              Shorten
            </button>
          </div>
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
