import React from "react";
import HomeLink from "./HomeLink";
import News from "./HomeLink/News";

const Home = ({ news, arts, sport, opinion, lifestyle }) => {
  return (
    <div>
      <News arr={news} name="News" />
      <HomeLink arr={arts} name="Arts" />
      <HomeLink arr={opinion} name="Opinion" />
      <HomeLink arr={lifestyle} name="Lifestyle" />
      <HomeLink arr={sport} name="Sport" />
    </div>
  );
};

export default Home;
