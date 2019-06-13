const { URL } = require("url");
const request = require("request-promise");
const cheerio = require("cheerio");
const CrawlSelectors = require("../constants/CrawlSelectors");

const absoluteUrlRegex = new RegExp("^(?:[a-z]+:)?//", "i");
const isRelativeUrl = url => {
  return !absoluteUrlRegex.test(url);
};

const loadPageFromUrl = (websiteUrl, requestOptions = {}) => {
  return request({
    uri: websiteUrl,
    transform: body => cheerio.load(body),
    ...requestOptions
  })
    .then(response => response)
    .catch(err => {
      console.error(err);
      return Promise.reject(err);
    });
};

const CrawlUtils = {
  // returns { [url text] : [url link]}
  getGameLinks: async websiteUrl => {
    if (!websiteUrl) {
      return Promise.reject("url must be provided");
    }

    return loadPageFromUrl(websiteUrl).then($ => {
      const urlOrigin = new URL(websiteUrl).origin;
      const links = {};
      $(CrawlSelectors.GAME_LINKS).each(function(index) {
        if (this.children.length === 1) {
          const title = $(this.children[0]).text();
          const urlLink = $(this).attr("href");
          links[title] = `${isRelativeUrl(urlLink) ? urlOrigin : ""}${urlLink}`;
        }
      }, {});
      return links;
    });
  },

  getStreamLinks: async websiteUrl => {
    if (!websiteUrl) {
      return Promise.reject("url must be provided");
    }

    return loadPageFromUrl(websiteUrl).then($ => {
      const urlOrigin = new URL(websiteUrl).origin;
      const links = {};
      $(CrawlSelectors.STREAM_LINKS)
        .not(CrawlSelectors.DISCORD_LINKS)
        .not(CrawlSelectors.REDDIT_LINKS)
        .each(function(index) {
          if (this.children.length === 1) {
            const title = $(this.children[0]).text();
            const urlLink = $(this).attr("href");
            links[title] = `${
              isRelativeUrl(urlLink) ? urlOrigin : ""
            }${urlLink}`;
          }
        }, {});
      return links;
    });
  }
};

module.exports = CrawlUtils;
