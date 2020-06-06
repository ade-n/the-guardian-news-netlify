import React from "react";
import axios from "axios";

import { BrowserRouter as Router, Route } from "react-router-dom";

import NavBar from "../NavBar/NavBar";
import Dashboard from "../Pages/Dashboard";
import News from "../Pages/DashboardLink/News";

class MainPage extends React.Component {
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
        const pages = 5;
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
    const news = articles
      .filter((article) => article.pillarName === "News")
      .slice(0, 8);

    const worldNews = articles
      .filter((article) => article.sectionName === "World news")
      .slice(0, 8);

    const arts = articles.filter((article) => article.pillarName === "Arts");
    /*
    const articleNews = articles.length ? (
      news.map((article) => <News article={article} />)
    ) : (
      <div>Loading...</div>
    );

    const worldNews = articles.length ? (
      world.map((article) => <WorldNews article={article} />)
    ) : (
      <div>Loading...</div>
    );*/

    return (
      <Router>
        <div className="flex w-full justify-between">
          <div className="flex flex-wrap bg-blue-800 md:w-1/4 p-6 md:h-full fixed xs:w-full xs:h-12">
            <NavBar arr={articles} />
          </div>
          <hr />
          <div className="flex flex-wrap h-screen bg-gray-300 w-3/4 static">
            <Route
              path="/:articlesPillarName"
              render={(props) => <Dashboard {...props} arr={articles} />}
            />
          </div>
        </div>
      </Router>
    );
  }
}

export default MainPage;
