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

    return (
      <div className="flex justify-between w-full flex-col">
        <div className="flex flex-col ">
          <div className="flex flex-wrap items-stretch">{articleNews}</div>
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
