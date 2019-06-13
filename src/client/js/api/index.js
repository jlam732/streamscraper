const esc = encodeURIComponent;
const getQueryString = params =>
  Object.keys(params)
    .map(k => `${esc(k)}=${esc(params[k])}`)
    .join("&");

const Api = {
  async getGameLinks(url) {
    const query = `?${getQueryString({
      url
    })}`;
    let response = await fetch(`/api/games${query}`, {
      method: "GET"
    });
    return await response.json();
  }
};

export default Api;
