import React from "react";

class WorldNews extends React.Component {
  state = {
    limit: 8,
  };
  onLoadMore = () => {
    this.setState({ limit: this.state.limit + 4 });
  };

  render() {
    const { match, arr } = this.props;
    const section1 = arr.filter(
      (article) => article.sectionName === match.params.infoSectionName
    );

    /* const section1 = arr.map(
    (article) => article.sectionName === match.params.infoSectionName
  );*/

    const articleNews = arr.length ? (
      section1.slice(0, this.state.limit).map((article) => (
        <div
          background={"#fff"}
          className="flex flex-col justify-between p-4 xl:w-64  w-full bg-white xl:h-64 md:h-24 mb-2 mr-2"
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
      <div className="flex flex-wrap ">
        <div className="flex flex-col ">
          <div className="flex flex-wrap">{articleNews}</div>
          <div className="pt-2">
            {this.state.limit < section1.length && (
              <div onClick={this.onLoadMore} className=" cursor-pointer ">
                Load More...
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default WorldNews;
