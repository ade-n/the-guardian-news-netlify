import React from "react";
import { NavLink } from "react-router-dom";

class News extends React.Component {
  state = {
    limit: 11,
  };
  onLoadMore = () => {
    this.setState({ limit: this.state.limit + 4 });
  };

  render() {
    const { arr, name } = this.props;
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
    const articleNews = arr.length ? (
      arr.slice(3, this.state.limit).map((article) => (
        <div className="flex-auto text-gray-700 bg-white px-4 py-2 w-64  border border-gray-300">
          <div
            className="flex flex-col justify-between sm:h-64"
            key={article.id}
          >
            <div>
              <a
                className="hover:text-red-600 font-bold text-blue-900 text-lg"
                href={article.webUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {article.webTitle}
              </a>
            </div>

            <div>{article.sectionName}</div>
          </div>
        </div>
      ))
    ) : (
      <div>Loading...</div>
    );

    const latestArticles = arr.length ? (
      arr
        .map((article) => (
          <div>
            <hr />
            <div
              background={"#fff"}
              className="flex px-4 py-2 bg-red-600 "
              key={article.id}
            >
              <div className="font-bold text-white text-md w-full ">
                <a
                  href={article.webUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {article.webTitle}
                </a>
              </div>
            </div>
          </div>
        ))
        .slice(0, 3)
    ) : (
      <div>Loading...</div>
    );

    return (
      <div className="p-6 w-full ">
        <div className="flex flex-col">
          <div className="flex flex-col py-8">
            <div className="text-2xl font-hairline pb-2 flex">{name}</div>
            <hr className="border-gray-600  w-1/4" />

            <div className="flex  w-full pt-2 pb-4 flex-wrap ">
              {pp.map((info) => (
                <div key={info.sectionId}>
                  <NavLink
                    className="hover:text-red-600 hover:font-bold pr-4 "
                    to={`${info.pillarName}/${info.sectionName}`}
                  >
                    {info.sectionName}
                  </NavLink>
                </div>
              ))}
            </div>

            <div className="mb-4 ">{latestArticles}</div>
            <div className="flex flex-wrap items-stretch">{articleNews}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default News;
