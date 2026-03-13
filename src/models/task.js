const { v4: uuidv4 } = require('uuid');

class Task {
  constructor(title, description, userId) {
    this.id = uuidv4();
    this.title = title;
    this.description = description || '';
    this.completed = false;
    this.userId = userId;
    this.createdAt = new Date().toISOString();
  }
}

module.exports = Task;