import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = ({ arr }) => {
  //this will remove the duplicates based on pillarName and pillarId
  let pp = arr.filter(
    (ele, ind) =>
      ind ===
      arr.findIndex(
        (elem) =>
          elem.pillarId === ele.pillarId && elem.pillarName === ele.pillarName
      )
  );

  console.log("console here", pp);

  return (
    <div className="flex flex-col w-full flex-wrap ">
      <div className="xl:text-5xl xs:text-sm font-bold font-serif leading-none text-yellow-200">
        <Link to="/">The Guardian News</Link>
      </div>
      <div className="py-6 text-white font-hairline xs:text-xs md:text-md md:block">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </div>
      <div>
        <ul className="font-bold flex justify-between xl:text-xl sm:text-md  md:flex-col ">
          {pp.map((articles) => (
            <li key={articles.pillarId}>
              <NavLink
                activeStyle={{
                  fontWeight: "bold",
                  color: "white",
                  borderBottomWidth: 4,
                  borderColor: "#cc3333",
                }}
                className=" hover:text-white hover:border-b-4 hover:border-red-600"
                to={`/${articles.pillarName}`}
              >
                {articles.pillarName}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
