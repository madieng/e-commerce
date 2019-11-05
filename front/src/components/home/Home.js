import React, { useEffect, useState } from "react";
import moment from "moment";

const Home = props => {
  const [horloge, setHorloge] = useState(moment());
  useEffect(() => {
    setTimeout(() => {
      setHorloge(moment().add(1, "second"));
    }, 1000);
  }, [horloge]);

  return (
    <div className="jumbotron jumbotron-fluid">
      <div className="container">
        <h1 className="display-4">{horloge.format("HH:mm:ss")}</h1>
        <p className="lead">
          This is a modified jumbotron that occupies the entire horizontal space
          of its parent.
        </p>
      </div>
    </div>
  );
};

export default Home;
