const express = require("express");
const router = express.Router();
const CrawlUtils = require("../utils/CrawlUtils");
const CrawlSelectors = require("../constants/CrawlSelectors");

router.get("/games", async (req, res) => {
  const { url } = req.query;
  const links = await CrawlUtils.getUrlLinks(
    decodeURIComponent(url),
    CrawlSelectors.GAME_LINKS
  );
  res.send(links);
});

module.exports = router;
