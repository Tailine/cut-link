import s from "./styles.module.css";
import { LinkIcon } from "../LinkIcon";
import { IconColors } from "../../types";

export function Input() {
  return (
    <div className={s.wrapper}>
      <div className={s.inputContainer}>
        <input placeholder="Paste link here" className={s.input} />
        {/* <img className={s.icon} src={linkIcon} /> */}
        <div className={s.icon}>
          <LinkIcon color={IconColors.GRAY} />
        </div>
      </div>
      <button className={s.button}>Shorten</button>
    </div>
  );
}
