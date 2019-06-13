const CrawlSelectors = {
  // GAME_LINKS: 'a[href*="game_thread"][data-click-id="body"]',
  GAME_LINKS: 'a[data-click-id="body"]',
  STREAM_LINKS: "a[target='_blank']",
  REDDIT_LINKS: "[href*='/r/']",
  DISCORD_LINKS: "[href*='discord.gg']"
};

module.exports = CrawlSelectors;
