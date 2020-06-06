import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import NavBar from "../NavBar/NavBar";
import Dashboard from "../Pages/Dashboard";
import Home from "../Pages/Home";

const App = class App extends React.Component {
  state = {
    articles: [],
  };

  componentDidMount() {
    axios
      .get(
        "https://content.guardianapis.com/search?api-key=b0e6548b-b042-46c6-821e-94aa7b68ede0"
      )
      .then((res) => {
        const urls = [];
        const pages = 16;
        //let pages = res.data.response.pages;
        for (let i = 1; i < pages; i++) {
          urls.push(
            "https://content.guardianapis.com/search?api-key=b0e6548b-b042-46c6-821e-94aa7b68ede0&page=" +
              i
          );
        }

        const getAllData = (urls) => {
          return Promise.all(urls.map(fetchData));
        };

        const fetchData = (url) => {
          return axios
            .get(url)
            .then((res) => {
              return {
                data: res.data,
              };
            })
            .catch((err) => {
              console.log(err);
            });
        };

        getAllData(urls)
          .then((res) => {
            let article = [];
            for (let rs in res) {
              article = [...article, ...res[rs].data.response.results];
            }
            //console.log("++ articles: ", article.slice(0, 10));
            this.setState({
              articles: article,
            });
          })
          .catch((e) => {
            console.log(e);
          });
      });
  }
  render() {
    const { articles } = this.state;

    const news = articles.filter((article) => article.pillarName === "News");
    const arts = articles.filter((article) => article.pillarName === "Arts");
    const sport = articles.filter((article) => article.pillarName === "Sport");
    const opinion = articles.filter(
      (article) => article.pillarName === "Opinion"
    );
    const lifestyle = articles.filter(
      (article) => article.pillarName === "Lifestyle"
    );

    return (
      <Router>
        <div className="md:flex w-full justify-between xs:flex xs:flex-col h-full">
          <div className="flex flex-wrap bg-blue-800 md:w-1/4 p-6 md:h-full fixed xs:w-full xs:h-12 ">
            <NavBar arr={articles} />
          </div>
          <hr />
          <div className="flex flex-wrap h-full md:w-3/4 xs:w-full md:mt-0 mt-48 ">
            <Route
              exact
              path="/"
              render={(props) => (
                <Home
                  {...props}
                  news={news}
                  arts={arts}
                  sport={sport}
                  opinion={opinion}
                  lifestyle={lifestyle}
                />
              )}
            />
            <Route
              path="/:articlesPillarName"
              render={(props) => <Dashboard {...props} arr={articles} />}
            />
            <Redirect to="/" />
          </div>
        </div>
      </Router>
    );
  }
};

export default App;
