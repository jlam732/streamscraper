const { URL } = require("url");
const request = require("request-promise");
const cheerio = require("cheerio");

const absoluteUrlRegex = new RegExp("^(?:[a-z]+:)?//", "i");
const isRelativeUrl = url => {
  return !absoluteUrlRegex.test(url);
};

const CrawlUtils = {
  // returns { [url text] : [url link]}
  getUrlLinks: async (websiteUrl, selector, requestOptions = {}) => {
    if (!websiteUrl || !selector)
      return Promise.reject("url or selector must be provided");
    return request({
      uri: websiteUrl,
      transform: body => cheerio.load(body),
      ...requestOptions
    })
      .then($ => {
        const urlOrigin = new URL(websiteUrl).origin;
        const links = {};
        $(selector)
          // $('a[data-click-id="body"]')
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
      })
      .catch(err => {
        console.error(err);
        return Promise.reject(err);
      });
  }
};

module.exports = CrawlUtils;
