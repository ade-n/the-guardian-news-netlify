import React from "react";
import { NavLink } from "react-router-dom";

class homeLink extends React.Component {
  state = {
    limit: 4,
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
      arr.slice(0, this.state.limit).map((article) => (
        <div
          background={"#fff"}
          className="flex flex-col justify-between p-4 xl:w-64 sm:w-full bg-white xl:h-64 md:h-24 mb-2 "
          key={article.id}
        >
          <div className="font-bold text-blue-900 text-lg">
            <a
              className="hover:text-red-600"
              href={article.webUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {article.webTitle}
            </a>
          </div>
          <div>{article.sectionName}</div>
        </div>
      ))
    ) : (
      <div>Loading...</div>
    );
    return (
      <div className="p-6 w-full ">
        <div className="flex flex-col">
          <div className="flex flex-col py-8">
            <div className="text-2xl font-hairline pb-2 flex">{name}</div>
            <hr className="border-gray-600  w-1/4" />

            <div className="flex  w-full pt-2 pb-4">
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

            <div className="flex flex-col ">
              <div className="flex flex-wrap justify-between">
                {articleNews}
              </div>
              <div className="pt-2">
                {this.state.limit < arr.length && (
                  <div onClick={this.onLoadMore} className=" cursor-pointer ">
                    Load More...
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default homeLink;
