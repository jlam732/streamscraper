const fs = require("fs");
const { URL } = require("url");
const request = require("request-promise");
const cheerio = require("cheerio");

const absoluteUrlRegex = new RegExp("^(?:[a-z]+:)?//", "i");
const isRelativeUrl = url => {
  return !absoluteUrlRegex.test(url);
};

// returns { [url text] : [url link]}
const getUrlLinks = async (websiteUrl, options = {}) => {
  return request({
    uri: websiteUrl,
    transform: body => cheerio.load(body)
  })
    .then($ => {
      const urlOrigin = new URL(websiteUrl).origin;
      // $('a[href*="game_thread"]')
      const links = {};
      $('a[data-click-id="body"]').each(function(index) {
        if (this.children.length === 1) {
          const title = $(this.children[0]).text();
          const urlLink = $(this).attr("href");
          links[title] = `${isRelativeUrl(urlLink) ? urlOrigin : ""}${urlLink}`;
        }
      }, {});
      return links;
    })
    .catch(err => {
      console.error(err);
      return Promise.reject(err);
    });
};

getUrlLinks("https://www.reddit.com/r/mlbstreams").then(links => {
  console.log(links);
});
