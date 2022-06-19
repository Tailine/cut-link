import { useEffect, useState } from "react";
import { copyToClipboard } from "../utils/copyToClipboard";

export function useCopy() {
  const [displayCopyFeedback, setDisplayCopyFeedback] = useState(false);

  useEffect(() => {
    const feedbackDisplay = setTimeout(() => {
      setDisplayCopyFeedback(false)
    }, 800)

    return () => clearInterval(feedbackDisplay)
  })

  function handleFeedback() {
    setDisplayCopyFeedback(true);
  }

  async function onCopy(url: string) {
    await copyToClipboard(url);
    handleFeedback()
  }

  return { onCopy, displayCopyFeedback }
}