import { useEffect } from "react";
import InputForms from "./components/InputForm";
import "./styles/index.css";

function App() {
  // Read both csv files
  useEffect(() => {
    const readFile = async () => {
      try {
        const res = await fetch("/read_data");
        if (!res.ok) {
          throw new Error("Failed to read the files");
        }
      } catch (error) {
        console.error(error);
      }
    };
    readFile();
  }, []);

  return (
    <div className="App">
      <h1>Skill Access</h1>
      <div className="app-description">
        Simply enter a candidate id to access the percentile for the coding and
        commmunication score compared to other candidates with the same title
        and at similar companies.
      </div>
      <InputForms />
    </div>
  );
}

export default App;
