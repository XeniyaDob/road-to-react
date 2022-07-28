import * as React from "react";

const initialPlanets = [
  {
    objectID: 1,
    title: "Mercury",
    diameter: "3,031.67 mi",
    moons: "none",
    desc:
      "Mercury is the closest planet to the Sun. Due to its proximity, it's not easily seen except during twilight. For every two orbits of the Sun, Mercury completes three rotations about its axis. Up until 1965 it was thought that the same side of Mercury constantly faced the Sun.",
    img:
      "https://cdn.mos.cms.futurecdn.net/PFQ97KNjjTebMzenT3GeKd-1024-80.jpg.webp"
  },
  {
    objectID: 2,
    title: "Venus",
    diameter: "7,521 mi",
    moons: "none",
    desc:
      "Venus is the second planet from the Sun and is the second brightest object in the night sky after the Moon. Venus is the second largest terrestrial planet and is sometimes referred to as the Earth’s sister planet due the their similar size and mass.",
    img:
      "https://cdn.mos.cms.futurecdn.net/oFF43BjXYUyyMTTJLFpeDE-1024-80.jpg.webp"
  },
  {
    objectID: 3,
    title: "Earth",
    diameter: "7,917.5 mi",
    moons: "1",
    desc:
      "Earth is the third planet from the Sun and is the largest of the terrestrial planets. The Earth is the only planet in our solar system not to be named after a Greek or Roman deity. The Earth was formed approximately 4.54 billion years ago and is the only known planet to support life.",
    img:
      "https://cdn.mos.cms.futurecdn.net/CSa5v4sqMRom94tfjr5scf-1024-80.jpg.webp"
  },
  {
    objectID: 4,
    title: "Mars",
    diameter: "4,212 mi",
    moons: "2",
    desc:
      'The fourth planet from the Sun and the second smallest planet in the solar system. Mars is often described as the "Red Planet" due to its reddish appearance. It\'s a terrestrial planet with a thin atmosphere composed primarily of carbon dioxide.',
    img:
      "https://cdn.mos.cms.futurecdn.net/E95ZSoxdCKyWZWzkm2EyNe-1024-80.jpg.webp"
  }
];

const getAsyncPlanets = () =>
  new Promise((resolve) =>
    setTimeout(() => resolve({ data: { planets: initialPlanets } }), 2000)
  );

const useSemiPersistentState = (key, initialState) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  );

  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};

const planetsReducer = (state, action)=>{
  switch(action.type){
    case 'SET_PLANETS':
    return action.payload;
  case 'REMOVE_PLANET':
    return state.filter(
      (planet)=>action.payload.objectID!==planet.objectID);
  
  default:throw new Error()
    }
}

const App = () => {
  const [searchTerm, setSearchTerm] = useSemiPersistentState("search", "R");


  //const [planets, setPlanets] = React.useState([]);
  const[planets,dispatchPlanets]=React.useReducer(
    planetsReducer,
    []
  )
  const [isLoading, setIsLoading]=React.useState(false)
  const[isError, setIsError]=React.useState(false)

  React.useEffect(() => {
    setIsLoading(true)

    getAsyncPlanets().then((result) => {
      //setPlanets(result.data.planets);
      dispatchPlanets({
        type:'SET_PLANETS',
        payload:result.data.planets
      });
      setIsLoading(false)
    })
    .catch(()=>setIsError(true))
  }, []);

  const handleRemovePlanet = (item) => {
    // const newPlanets = planets.filter(
    //   (planet) => item.objectID !== planet.objectID
    // );
    dispatchPlanets({
      type:'REMOVE_PLANET',
      payload:item
    })

    //setPlanets(newPlanets);
    
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const searchedPlanets = planets.filter((planet) =>
    planet.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Universe</h1>

      <InputWithLabel
        id="search"
        value={searchTerm}
        isFocused
        onInputChange={handleSearch}
      >
        <strong>Search:</strong>
      </InputWithLabel>

      <hr />
      {isError && <p>Something went wrong...</p>}
      {isLoading?(
        <p>Loading...</p>
        ):(
          <List list={searchedPlanets} 
          onRemoveItem={handleRemovePlanet} 
          />
          )}

      
    </div>
  );
};

const InputWithLabel = ({
  id,
  value,
  type = "text",
  onInputChange,
  isFocused,
  children
}) => {
  const inputRef = React.useRef();

  React.useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <>
      <label htmlFor={id}>{children}</label>
      &nbsp;
      <input
        id={id}
        ref={inputRef}
        type={type}
        value={value}
        onChange={onInputChange}
      />
    </>
  );
};

const List = ({ list, onRemoveItem }) => (
  <ul>
    {list.map((item) => (
      <Item key={item.objectID} item={item} onRemoveItem={onRemoveItem} />
    ))}
  </ul>
);

const Item = ({ item, onRemoveItem }) => (
  <li key={item.objectID}>
    <span>
      <img src={item.img} alt={item.name} />
    </span>
    <h2>{item.title}</h2>
    <p>{item.moons}</p>
    <p>{item.diameter}</p>
    <p>{item.desc}</p>
    <span>
      <button type="button" onClick={() => onRemoveItem(item)}>
        Remove
      </button>
    </span>
  </li>
);

export default App;
