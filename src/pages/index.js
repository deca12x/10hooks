import { useState, useEffect, useRef } from "react";

export default function App() {
  return (
    <>
      <h1>The 3 Most Important React Hooks</h1>
      <h4>1. useState</h4>
      <p>
        useState is used to update a state variable and re-render it. It happens
        asynchonously, so remember to await if needed.
      </p>
      <FirstUseStateHook />
      <SecondUseStateHook />
      <ThirdUseStateHook />
      <h4>2. useEffect</h4>
      <p>
        useEffect takes two arguments: function (what function is called) &
        dependency array (when is it triggered)
      </p>
      <FirstUseEffectHook />
      <SecondUseEffectHook />
      <h4>3. useRef</h4>
      <p>
        useRef is similar to useState but has 3 differences: No re-rendering,
        Synchronous updates and Referencing DOM elements.
      </p>
      <FirstUseRefHook />
      <SecondUseRefHook />
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

function ThirdUseStateHook() {
  const [number, setNumber] = useState(0);

  function increment() {
    setNumber(number + 1);
    console.log(number);
  }

  return (
    <>
      <p>
        Demonstration of the asynchronicity of usState. console.log always
        prints the old value because it runs before the variable has finished
        updating.
      </p>
      <p>
        <button onClick={increment}>Increment</button>
        {number}
      </p>
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

function FirstUseRefHook() {
  const myNumber = useRef();
  myNumber.current = 42;

  function increment() {
    myNumber.current += 1;
    console.log(myNumber.current);
  }
  return (
    <>
      <p>
        The HTML will display the original render for myNumber, even as it
        increases (see conole.log).
      </p>
      <button onClick={increment}>Increment!</button>
      <p>{myNumber.current}</p>
    </>
  );
}

function SecondUseRefHook() {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <>
      <input ref={inputRef} type="text" />
      <p>
        When this page loads, this input element is already in focus (you can
        type without clicking on it). This is because we hold a reference to the
        input element, and have a useEffect that runs on page load due to having
        an empty dependency array, that focuses on the input element.
      </p>
    </>
  );
}
