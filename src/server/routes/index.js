const express = require("express");
const router = express.Router();
const CrawlUtils = require("../utils/CrawlUtils");
const CrawlSelectors = require("../constants/CrawlSelectors");

router.get("/games", async (req, res) => {
  const { url } = req.query;
  const links = await CrawlUtils.getGameLinks(decodeURIComponent(url));
  res.send(links);
});

router.get("/streams", async (req, res) => {
  const { url } = req.query;
  const links = await CrawlUtils.getStreamLinks(decodeURIComponent(url));
  res.send(links);
});

// TODO: incorporate API routes for http://www.espn.com/apis/devcenter/overview.html

module.exports = router;
