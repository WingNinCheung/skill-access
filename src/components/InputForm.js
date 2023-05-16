import { useEffect, useState } from "react";
import Stats from "./stats";
import Chart from "./chart";
import "../styles/inputForm.css";

const InputForms = () => {
  const [candidateId, setCandidateId] = useState("");
  const [validationError, setValidationError] = useState([]);
  const [data, setData] = useState({});

  useEffect(() => {
    // error handling for candidate ID

    let errors = [];
    if (candidateId.length > 3) {
      errors.push("ID cannot have more than 3 digits");
    } else if (parseInt(candidateId) < 889 || parseInt(candidateId) > 947) {
      errors.push("ID must between 889 to 947");
    } else if (!/^\d+$/.test(candidateId)) {
      errors.push("Please enter a valid ID");
    }
    setValidationError(errors);
  }, [candidateId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`/percentile/${candidateId}`);
    if (res.ok) {
      const data = await res.json();
      setData(data);
    } else {
      const errorData = await res.json();
      console.log("Error:", errorData.error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
        <ul>
          {validationError.map((error) => (
            <li className="error">{error}</li>
          ))}
        </ul>
        <div className="label-container">
          <label id="label">Candidate ID:</label>
          <input
            type="text"
            value={candidateId}
            onChange={(e) => setCandidateId(e.target.value)}
          />

          <button
            disabled={candidateId.trim() === "" || validationError.length > 0}
            type="submit"
          >
            See the result
          </button>
        </div>
      </form>
      <Stats data={data} />
      <Chart data={data} />
    </div>
  );
};

export default InputForms;
