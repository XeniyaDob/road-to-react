import * as React from "react";

function getTitle(title) {
  return title;
}

let List = (props) => {
  return (
    <ul>
      {props.list.map(function (item) {
        return <Item key={item.objectID} item={item} />;
      })}
    </ul>
  );
};

const Item = (props) => {
  return (
    <li key={props.item.objectID}>
      <h2>{props.item.name}</h2>
      <span>
        <img src={props.item.url} alt={props.item.name} />
      </span>
      <p>{props.item.diameter}</p>
      <p>{props.item.desc}</p>
    </li>
  );
};
function Search() {
  const handleChange = (event) => {
    console.log(event.target.value);
  };

  const handleMouseOver = (event) => {
    console.log(event.target.value);
  };

  return (
    <div>
      <label htmlFor="search">Search: </label>
      <input
        id="search"
        type="text"
        onChange={handleChange}
        onMouseOver={handleMouseOver}
      />
    </div>
  );
}

function App() {
  const planets = [
    {
      objectID: 1,
      name: "Mercury",
      diameter: "3,031.67 mi",
      moons: "none",
      desc: "Mercury is the closest planet to the Sun. Due to its proximity, it's not easily seen except during twilight. For every two orbits of the Sun, Mercury completes three rotations about its axis. Up until 1965 it was thought that the same side of Mercury constantly faced the Sun.",
      url: "mercury.jpg",
    },
    {
      objectID: 2,
      name: "Venus",
      diameter: "7,521 mi",
      moons: "none",
      desc: "Venus is the second planet from the Sun and is the second brightest object in the night sky after the Moon. Venus is the second largest terrestrial planet and is sometimes referred to as the Earth’s sister planet due the their similar size and mass.",
      url: "img/venus.jpg",
    },
    {
      objectID: 3,
      name: "Earth",
      diameter: "7,917.5 mi",
      moons: "1",
      desc: "Earth is the third planet from the Sun and is the largest of the terrestrial planets. The Earth is the only planet in our solar system not to be named after a Greek or Roman deity. The Earth was formed approximately 4.54 billion years ago and is the only known planet to support life.",
      url: "img/earth.jpg",
    },
    {
      objectID: 4,
      name: "Mars",
      diameter: "4,212 mi",
      moons: "2",
      desc: 'The fourth planet from the Sun and the second smallest planet in the solar system. Mars is often described as the "Red Planet" due to its reddish appearance. It\'s a terrestrial planet with a thin atmosphere composed primarily of carbon dioxide.',
      url: "img/mars.jpg",
    },
  ];

  return (
    <div>
      <h1>Hello {getTitle("React")}</h1>
      <Search />
      <hr />
      <List list={planets} />
    </div>
  );
}

export default App;
