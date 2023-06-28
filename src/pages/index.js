import { useEffect, useState } from "react";

export default function App() {
  return (
    <>
      <h1>The 3 Most Important React Hooks</h1>
      <h4>1. useState</h4>
      <FirstUseStateHook />
      <SecondUseStateHook />
      <h4>2. useEffect</h4>
      <p>
        useEffect takes two arguments: function (what function is called) &
        dependency array (when is it triggered)
      </p>
      <FirstUseEffectHook />
      <SecondUseEffectHook />
    </>
  );
}

function FirstUseStateHook() {
  const [scream, setScream] = useState("A");
  function screamMore() {
    setScream(scream + "a");
  }

  return (
    <>
      <button onClick={screamMore}>Scream!</button>
      <p>{scream}</p>
    </>
  );
}

function SecondUseStateHook() {
  const [fruits, setFruits] = useState([]);
  const [currentFruit, setCurrentFruit] = useState("");

  function updateCurrentFruit(text) {
    setCurrentFruit(text);
  }

  function addFruitToArray() {
    const newFruits = [...fruits, currentFruit];
    setFruits(newFruits);
  }

  return (
    <>
      <p>
        useState can also be used for more complex types like arrays and
        objects, but to set the state we'll have to create a separate updated
        variable and then reassign the value of the useState variable.
      </p>
      <input type="text" onChange={(e) => updateCurrentFruit(e.target.value)} />
      <button onClick={addFruitToArray}>Add Fruit</button>

      <ul>
        {fruits.map((fruit, index) => (
          <li key={index}>{fruit}</li>
        ))}
      </ul>
    </>
  );
}

function FirstUseEffectHook() {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);

  async function loadData() {
    setLoading(true);
    const data = await apiCall();
    setData(data);
    setLoading(false);
  }

  async function apiCall() {
    return new Promise((resolve) => {
      setTimeout(() => resolve("ABCDEF"), 5000);
    });
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <p>
        One use case is to get data from an API. Use an empty dependancy array
        to run when the page first loads. Our fake API call takes 5 seconds to
        load.
      </p>
      <div>{loading ? "Loading..." : data}</div>
    </>
  );
}

function SecondUseEffectHook() {
  const names = ["Alice", "Bob", "Charlie", "David", "Emily"];
  const [recommendations, setRecommendations] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (searchText.length === 0) {
      setRecommendations([]);
    } else if (searchText.length > 0) {
      const newRecs = names.filter((name) =>
        name.toLowerCase().includes(searchText.toLowerCase())
      );
      setRecommendations(newRecs);
    }
  }, [searchText]);

  return (
    <>
      <p>
        Another use case is to automatically run some code when a certain state
        variable changes (so we're also using the useState hook). Here our
        dependency array is [searchText], so useEffect is triggered any time
        searchText changes.
      </p>

      <p>
        <input type="text" onChange={(e) => setSearchText(e.target.value)} />
        Recommendations:
      </p>
      <ul>
        {recommendations.map((rec, index) => (
          <li key={index}>{rec}</li>
        ))}
      </ul>
    </>
  );
}
