import { useEffect } from "react";
import "./App.css";

function App() {
  useEffect(() => {
    const readFile = async () => {
      const res = await fetch("/read_data");
      const data = await res.text();
      console.log(data);
    };
    readFile();
  }, []);

  return (
    <div className="App">
      <div>ok</div>
    </div>
  );
}
// "proxy": "http://127.0.0.1:5000/"

export default App;
