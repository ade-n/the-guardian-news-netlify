import React from "react";

class News extends React.Component {
  state = {
    limit: 8,
  };
  onLoadMore = () => {
    this.setState({ limit: this.state.limit + 4 });
  };

  render() {
    const { match, arr } = this.props;
    const articles = arr.filter(
      (article) => article.pillarName === match.params.articlesPillarName
    );

    const articleNews = arr.length ? (
      articles.slice(0, this.state.limit).map((article) => (
        <div
          background={"#fff"}
          className="flex flex-col justify-between p-4 xl:w-64  sm:w-full bg-white xl:h-64 md:h-24 mb-2 mr-2"
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
      <div className="flex justify-between w-full flex-col">
        <div className="flex flex-col ">
          <div className="flex flex-wrap justify-start">{articleNews}</div>
          <div className="pt-2">
            {this.state.limit < articles.length && (
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

export default News;
