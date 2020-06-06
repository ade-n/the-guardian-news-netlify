import React from "react";
import { useSpring, animated } from "react-spring";
import { Link, NavLink } from "react-router-dom";

const HoverButton = ({ linkName, linkURL }) => {
  const [{ x, color }, set] = useSpring(() => ({ x: 100, color: "#000" }));
  return (
    <div>
      <li
        className="overflow-hidden relative py-2"
        onMouseEnter={() => set({ x: 0, color: "#fff" })}
        onMouseLeave={() => set({ x: 100, color: "#000" })}
      >
        <NavLink
          activeStyle={{
            fontWeight: "bold",
            color: "white",
          }}
          to={linkURL}
        >
          <animated.div
            className="relative z-20 cursor-pointer "
            style={{ color }}
          >
            {linkName}
          </animated.div>
          <animated.div
            style={{ transform: x.interpolate((x) => `translateY(${x}%`) }}
            className="bg-red-600 h-2 w-full z-10 absolute active:bg-red-600"
          />
        </NavLink>
      </li>
    </div>
  );
};

export default HoverButton;
