

export class UserServiceCleint {


  findUserById(userId) {
    return fetch('http://localhost:4000/api/user/' + userId)
      .then(response => response.json());
  }

  profile() {
return fetch('http://localhost:4000/api/profile',{
  credentials: 'include', // include, same-origin, *omit
})
  .then(response => response.json());
  }

  createUser(username, password) {
    const user = {
      username: username,
      password: password
    };

    return fetch('http://localhost:4000/api/user',{
      body: JSON.stringify(user),
      credentials: 'include',
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      }
    });
  }

  logout() {
  return fetch('http://localhost:4000/api/logout',{
  method: 'POST',
    credentials: 'include',
});
}



  login(username, password) {
    const credentials ={
      username: username,
      password: password
    }
    return fetch('http://localhost:4000/api/login',{
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(credentials),
      headers: {
        'content-type': 'application/json'
      }
    });
  }

}
