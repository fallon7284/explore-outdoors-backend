module.exports = (latStr, lonStr) => {
  const trim = str => {
    str = str.split(".");
    if (str.length === 2) {
      str[1] = str[1].slice(0, 6);
      return str.join(".");
    }
    return str;
  };
  return { lat: trim(latStr), lon: trim(lonStr) };
};
