export const getIdVideoYoutube = (url) => {
  if (!url || url.trim().length === 0) return "";
  const indexBeginQuery = url.indexOf("?");
  const indexEndId = url.indexOf("&");
  return url.slice(indexBeginQuery + 3, indexEndId);
};
