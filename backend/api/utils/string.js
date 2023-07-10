function cutString(str = '', maxLen = 100) {
  const text = str || '';

  if (text.length <= maxLen) return text;
  return `${text.substr(0, maxLen)}...`;
}

module.exports = {
  cutString
};
