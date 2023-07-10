function generateToken(len = 16) {
  const possible = `ABCDEFHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_`;

  let text = ``;

  for (let i = 0; i < len; i += 1) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}

module.exports = generateToken;
