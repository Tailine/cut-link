import { ChangeEvent, useRef, useState } from "react";
import s from "./App.module.css";
import { LinkIcon } from "./components/LinkIcon";
import { IconColors } from "./types";
import copyIcon from "./assets/icon-copy.svg";
import { shortenUrl } from "./services/shortenUrl";
import { useCopy } from "./hooks/useCopy";
import { validateUrl } from "./utils/urlValidation";
import { BASE_URL } from "./utils/baseUrl";

const ERROR_MESSAGE = "Please provide a valid url. It must be an https url";

function App() {
  const [shortUrl, setShortUrl] = useState("");
  const [originalUrl, setOriginalUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { onCopy, displayCopyFeedback } = useCopy();
  const inputRef = useRef<HTMLInputElement>(null);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setOriginalUrl(e.target.value);
  }

  function focusInput() {
    inputRef.current?.focus();
  }

  async function handleShortenUrl() {
    setShortUrl("");
    if (!validateUrl(originalUrl)) {
      focusInput();
      return setError(ERROR_MESSAGE);
    }
    setLoading(true);

    const { hash, error } = await shortenUrl(originalUrl);
    if (error) {
      setError(error);
    } else {
      setShortUrl(`${BASE_URL}/${hash}`);
      setError("");
    }
    setLoading(false);
  }

  function handleCopy() {
    onCopy(shortUrl);
  }

  return (
    <main>
      <div className={s.container}>
        <h1>Tiny link</h1>
        <div className={s.originalUrlSection}>
          <label htmlFor="original-url" className={s.label}>
            Paste your link below
          </label>
          <div className={s.inputSection}>
            <div className={s.inputContainer}>
              <input
                ref={inputRef}
                aria-invalid={!!error}
                aria-required="true"
                autoFocus={!!error}
                placeholder="e.g. https://youtube.com"
                name="original-url"
                id="original-url"
                aria-describedby="error"
                className={s.input}
                onChange={handleChange}
              />
              {error && (
                <p aria-hidden className={s.errorMsg} id="error" tabIndex={-1}>
                  {error}
                </p>
              )}
              <div className={s.icon}>
                <LinkIcon color={IconColors.GRAY} />
              </div>
            </div>
            <button
              type="submit"
              className={s.button}
              onClick={handleShortenUrl}
            >
              Shorten
            </button>
          </div>
        </div>
        <section className={s.shortUrl}>
          <label htmlFor="short-url" className={s.label}>
            Short url
          </label>
          <div aria-hidden={!shortUrl} className={s.copyWrapper}>
            {loading && (
              <div className={s.overlay}>
                <p className={s.fade}>loading</p>
              </div>
            )}
            <div className={s.shortLinkWrapper}>
              <LinkIcon color={IconColors.BLUE} />
              <input
                name="short-url"
                id="short-url"
                aria-hidden
                value={shortUrl}
                readOnly
              />
            </div>
            <button
              aria-label="copy short url"
              aria-hidden={!shortUrl}
              className={s.copyBtn}
              onClick={handleCopy}
            >
              <img aria-hidden src={copyIcon} alt="copy icon" />
            </button>
          </div>
          {displayCopyFeedback && <p className={s.copyArea}>Copied!</p>}
        </section>
      </div>
    </main>
  );
}

export default App;
