import React from "react";

import { NavLink, Route, Switch } from "react-router-dom";
import News from "./DashboardLink/News";
import WorldNews from "./DashboardLink/WorldNews";

const Dashboard = ({ match, arr }) => {
  // console.log(" match pillarName", match);

  //filter and elemitates all the duplicates. Incerca sa il intelegi
  let pp = arr.filter(
    (ele, ind) =>
      ind ===
      arr.findIndex(
        (elem) =>
          elem.sectionId === ele.sectionId &&
          elem.sectionName === ele.sectionName
      )
  );

  //macth the path param with its equvalent  article.pillarName
  const section = pp.filter(
    (article) => article.pillarName === match.params.articlesPillarName
  );

  return (
    <div className="p-6 w-full ">
      <div className="flex flex-col">
        <div className="flex flex-col py-8">
          <div className="text-2xl font-hairline pb-2 flex ">
            {match.params.articlesPillarName}
          </div>
          <hr className="border-gray-600  w-1/4" />

          <div className="flex  w-full pt-2 pb-4 flex-wrap ">
            {section.map((info) => (
              <div key={info.sectionId}>
                <NavLink
                  activeStyle={{
                    fontWeight: "bold",
                    color: "#cc3333",
                  }}
                  className="hover:text-red-600 hover:font-bold pr-4"
                  to={`${match.url}/${info.sectionName}`}
                >
                  {info.sectionName}
                </NavLink>
              </div>
            ))}
          </div>

          <hr />
          <Switch>
            <Route
              exact
              path="/:articlesPillarName"
              render={(props) => <News {...props} arr={arr} />}
            />
            <Route
              path={`${match.path}/:infoSectionName`}
              render={(props) => <WorldNews {...props} arr={arr} />}
            />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
