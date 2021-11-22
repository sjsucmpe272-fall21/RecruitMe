const { Client } = require('@elastic/elasticsearch');

var client = new Client({  
  cloud: {
    id: 'RecruitMe:dXMtY2VudHJhbDEuZ2NwLmNsb3VkLmVzLmlvJGY1ZTM0MGI3ODMzNTQ5N2U5ZTViYjhiYmY5NGRjNWUwJDA2MTgxNzgzYjczYjQ3Mzg4MjI2ZGM5YTI4NTk3OWM5'
  },
  auth: {
    username: 'elastic',
    password: 'YuAlhnN0KqgdodfYDb24i49u'
  }
});  
  
module.exports = client;  