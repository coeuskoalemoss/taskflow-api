const { v4: uuidv4 } = require('uuid');

class User {
  constructor(name, email, passwordHash) {
    this.id = uuidv4();
    this.name = name;
    this.email = email;
    this.passwordHash = passwordHash;
    this.createdAt = new Date().toISOString();
  }
}

module.exports = User;