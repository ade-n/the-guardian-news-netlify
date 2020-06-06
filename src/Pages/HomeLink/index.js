import React from "react";
import { NavLink } from "react-router-dom";

class homeLink extends React.Component {
  state = {
    limit: 4,
    show: true,
  };
  onLoadMore = () => {
    this.setState({ limit: this.state.limit + 4 });
  };

  onHide = () => {
    this.setState({ show: !this.state.show });
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
    const toggle = this.state.show && (
      <div>
        <div className="flex w-full pt-2 pb-4">
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
          <div className="flex flex-wrap items-stretch">{articleNews}</div>
          <div className="pt-2">
            {this.state.limit < arr.length && (
              <div onClick={this.onLoadMore} className=" cursor-pointer ">
                Load More...
              </div>
            )}
          </div>
        </div>
      </div>
    );

    return (
      <div className="px-6 w-full ">
        <div className="flex flex-col">
          <div className="flex flex-col py-4">
            <div className="flex justify-between">
              <div className="text-2xl font-hairline pb-2 flex">{name}</div>
              <div
                className="text-gray-600 hover:text-gray-800 cursor-pointer"
                onClick={this.onHide}
              >
                Hide
              </div>
            </div>

            <hr className="border-gray-600  w-1/4" />
          </div>

          {toggle}
        </div>
      </div>
    );
  }
}

export default homeLink;
