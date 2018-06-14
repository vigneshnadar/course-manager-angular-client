

export class UserServiceCleint {
  createUser(username, password) {
    const user = {
      username: username,
      password: password
    };

    return fetch('http://localhost:4000/api/user',{
      body: JSON.stringify(user),
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      }
    });
  }
}
