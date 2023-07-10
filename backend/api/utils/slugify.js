const limax = require('limax');

function generateSlug(model, value, slugField = 'slug') {
  const slug = limax(value);
  return model
    .count({ [slugField]: new RegExp(`^${slug}`, 'i') })
    .then(count => (count ? `${slug}-${count}` : slug));
}

module.exports = generateSlug;
