import { ChangeEvent, useEffect, useState } from "react";
import s from "./App.module.css";
import { LinkIcon } from "./components/LinkIcon";
import { IconColors } from "./types";
import copyIcon from "./assets/icon-copy.svg";
import { shortenUrl } from "./services/shortenUrl";
import { useCopy } from "./hooks/useCopy";

const BASE_URL = "localhost:5000/";

function App() {
  const [shortUrl, setShortUrl] = useState("");
  const [originalUrl, setOriginalUrl] = useState("");
  const [error, setError] = useState("");
  const { onCopy, displayCopyFeedback } = useCopy();

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
  }

  function handleCopy() {
    onCopy(shortUrl);
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
        <section className={s.shortUrl}>
          <label className={s.label}>Short url</label>
          <div className={s.copyWrapper}>
            <div className={s.shortLinkWrapper}>
              <LinkIcon color={IconColors.BLUE} />
              <p>{shortUrl}</p>
            </div>
            <button className={s.copyBtn} onClick={handleCopy}>
              <img src={copyIcon} alt="copy icon" />
            </button>
          </div>
          {displayCopyFeedback && <p className={s.copyArea}>Copied!</p>}
        </section>
      </div>
    </main>
  );
}

export default App;
