import s from "./App.module.css";
import { Input } from "./components/Input";

function App() {
  return (
    <main>
      <div className={s.container}>
        <h1>Mini link</h1>
        <Input />
        {/* <Input /> */}
      </div>
    </main>
  );
}

export default App;
