export const getIdVideoYoutube = (url) => {
  const indexBeginQuery = url.indexOf("?");
  const indexEndId = url.indexOf("&");
  return url.slice(indexBeginQuery + 3, indexEndId);
};
