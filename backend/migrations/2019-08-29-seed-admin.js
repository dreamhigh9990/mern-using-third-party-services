const mongoose = require('mongoose');

const User = mongoose.model('User');

function up() {
  return new Promise((resolve, reject) => {
    User.register(
      {
        email: 'admin@admin.com',
        username: 'admin@admin.com',
        name: 'Super Admin',
        role: 'ADMIN',
        verificationToken: 'lkajsldfjaadf2df',
        verified: true
      },
      'test',
      err => {
        if (err) reject(err);
        else resolve();
      }
    );
  });
}

function down() {
  return User.deleteMany({
    username: 'admin@admin.com'
  });
}

module.exports = {
  up,
  down
};
