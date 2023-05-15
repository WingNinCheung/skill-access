import "./App.css";
import { useEffect, useState } from "react";
import InputForms from "./components/InputForm";

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
      <h1>Skill Access</h1>
      <div>
        Simply enter a candidate id to access the percentile for the coding and
        commmunication score compared to other candidates with the same title
        and at similar companies.
      </div>
      <InputForms />
    </div>
  );
}

export default App;
