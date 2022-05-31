import s from "./styles.module.css";

export function Input() {
  return (
    <div className={s.wrapper}>
      <div className={s.inputContainer}>
        <input placeholder="Paste link here" className={s.input} />
        <img className={s.icon} />
      </div>
      <button className={s.button}>Shorten</button>
    </div>
  );
}
