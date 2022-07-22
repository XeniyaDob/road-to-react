import React, { useState, useEffect, useRef } from "react";

const App = () => {
  const initialPlanets = [
    {
      objectID: 1,
      name: "Mercury",
      diameter: "3,031.67 mi",
      moons: "none",
      desc: "Mercury is the closest planet to the Sun. Due to its proximity, it's not easily seen except during twilight. For every two orbits of the Sun, Mercury completes three rotations about its axis. Up until 1965 it was thought that the same side of Mercury constantly faced the Sun.",
      img: "https://cdn.mos.cms.futurecdn.net/PFQ97KNjjTebMzenT3GeKd-1024-80.jpg.webp",
    },
    {
      objectID: 2,
      name: "Venus",
      diameter: "7,521 mi",
      moons: "none",
      desc: "Venus is the second planet from the Sun and is the second brightest object in the night sky after the Moon. Venus is the second largest terrestrial planet and is sometimes referred to as the Earth’s sister planet due the their similar size and mass.",
      img: "https://cdn.mos.cms.futurecdn.net/oFF43BjXYUyyMTTJLFpeDE-1024-80.jpg.webp",
    },
    {
      objectID: 3,
      name: "Earth",
      diameter: "7,917.5 mi",
      moons: "1",
      desc: "Earth is the third planet from the Sun and is the largest of the terrestrial planets. The Earth is the only planet in our solar system not to be named after a Greek or Roman deity. The Earth was formed approximately 4.54 billion years ago and is the only known planet to support life.",
      img: "https://cdn.mos.cms.futurecdn.net/CSa5v4sqMRom94tfjr5scf-1024-80.jpg.webp",
    },
    {
      objectID: 4,
      name: "Mars",
      diameter: "4,212 mi",
      moons: "2",
      desc: 'The fourth planet from the Sun and the second smallest planet in the solar system. Mars is often described as the "Red Planet" due to its reddish appearance. It\'s a terrestrial planet with a thin atmosphere composed primarily of carbon dioxide.',
      img: "https://cdn.mos.cms.futurecdn.net/E95ZSoxdCKyWZWzkm2EyNe-1024-80.jpg.webp",
    },
  ];

  const useSemiPersistentState = (key, initialState) => {
    const [value, setValue] = useState(
      localStorage.getItem(key) || initialState
    );
    useEffect(() => {
      localStorage.setItem(key, value);
    }, [value, key]);

    return [value, setValue];
  };

  const [searchTerm, setSearchTerm] = useSemiPersistentState(
    "search",
    "Planet"
  );

  const [planets, setPlanets] = useState(initialPlanets);

  const handleRemovePlanet = (item) => {
    const newPlanets = planets.filter(
      (planet) => item.objectID !== planet.objectID
    );

    setPlanets(newPlanets);
  };

  const handleSearch = (event) => {
    console.log(event.target.value);
    setSearchTerm(event.target.value);
  };

  const searchedPlanets = planets.filter((planet) =>
    planet.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <h1>Hello {getTitle("Universe")}</h1>
      <InputWithLabel
        id="search"
        value={searchTerm}
        isFocused
        onInputChange={handleSearch}
      >
        <strong>Search: </strong>
      </InputWithLabel>

      <hr />
      <List list={searchedPlanets} onRemoveItem={handleRemovePlanet} />
    </>
  );
};

const InputWithLabel = ({
  id,
  value,
  type = "text",
  onInputChange,
  isFocused,
  children,
}) => {
  const inputRef = useRef();

  useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <>
      <label htmlFor={id}>{children}</label>
      &nbsp;
      <input
        ref={inputRef}
        id={id}
        type={type}
        value={value}
        onChange={onInputChange}
      />
    </>
  );
};

const getTitle = (title) => {
  return title;
};

const List = ({ list, onRemoveItem }) => {
  //console.log("List renders");
  return (
    <ul>
      {list.map(function (item) {
        return (
          <Item key={item.objectID} item={item} onRemoveItem={onRemoveItem} />
        );
      })}
    </ul>
  );
};

const Item = ({ item, onRemoveItem }) => {
  return (
    <li key={item.objectID}>
      <h2>{item.name}</h2>
      <span>
        <img src={item.img} alt={item.name} />
      </span>
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
};
export default App;
