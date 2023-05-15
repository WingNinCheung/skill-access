import { useEffect, useState } from "react";
import Stats from "./stats";

const InputForms = () => {
  const [candidateId, setCandidateId] = useState("");
  const [validationError, setValidationError] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    // error handling for candidate ID
    let errors = [];
    if (candidateId.trim() === "") {
      errors.push("ID cannot be empty");
    } else if (candidateId.length > 3) {
      errors.push("ID cannot have more than 3 digits");
    } else if (!/^\d+$/.test(candidateId)) {
      errors.push("Please enter only digits");
    }

    setValidationError(errors);
  }, [candidateId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
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
      <form onSubmit={handleSubmit}>
        <ul>{submitted && validationError.map((error) => <li>{error}</li>)}</ul>
        <label>
          Candidate ID:
          <input
            type="text"
            value={candidateId}
            onChange={(e) => setCandidateId(e.target.value)}
          />
        </label>
        <button disabled={validationError.length} type="submit">
          See the result
        </button>
      </form>
      <Stats data={data} />
    </div>
  );
};

export default InputForms;
