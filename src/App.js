import React, { useState, useEffect } from 'react'

import Blogs from './components/Blogs';
import Login from './components/Login';
import NewBlogForm from './components/NewBlogForm';
import Notification from './components/Notification';

import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {

  const [blogs, setBlogs] = useState([]);
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    async function fetchBlogs() {
      const blogs = await blogService.getAll();
      console.log(blogs);
      setBlogs(blogs);
    }
    fetchBlogs()
  }, []);

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedInBlogsUser');
    if (loggedUserJson) {
      const parsedUser = JSON.parse(loggedUserJson);
      setUser(parsedUser);
      blogService.setToken(parsedUser.token);
    }
  }, []);

  const onLogoutClick = () => {
    window.localStorage.clear();
    setUser(null);
  }

  const onSubmitBlogHandler = async ({title, author, url}) => {
    console.log('onSubmitFormHandler', title, author, url);
    try {
      const response = await blogService.create({title, author, url});
      setBlogs(blogs.concat(response));
      setNotification(`Blog added: "${response.title}" by ${response.author}`);
      setTimeout(() => {
        setNotification('');
      }, 5000);
    } catch (error) {
      console.error(error);
      setNotification(`Error while adding blog, see console output`);
      setTimeout(() => {
        setNotification('');
      }, 5000);
    }
    
  }

  const handleUsernameChange = (event) => {
    setUserName(event.target.value);
  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }
  const onLoginClick = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({username, password});
      console.log('user:', user);

      setUser(user);
      setPassword('');
      setUserName('');
      window.localStorage.setItem('loggedInBlogsUser', JSON.stringify(user));
      blogService.setToken(user.token);
      
    } catch (error) {
      console.error(error);
      setNotification(`Failed to log in`);
      setTimeout(() => {
        setNotification('');
      }, 5000);
    }
  }

  const loginForm = () => (
    <Login 
      username={username}
      password={password}
      handleUserNameChange={handleUsernameChange}
      handlePasswordChange={handlePasswordChange}
      onLoginClick={onLoginClick}
    />
  )

  const notificationElement = () => {
    if (notification !== '') {
      return (
        <Notification message={notification} />
      )
    }
    return null;
  }

  const mainContent = () => (
    <div>
      <div>
        <p>{user.name} logged in</p>
        <button onClick={onLogoutClick}>logout</button>
      </div>
      <NewBlogForm onSubmitFormHandler={onSubmitBlogHandler}></NewBlogForm>
      <Blogs blogs={blogs}/> 
    </div>
  )




  return (
    <div className="App">
      {notificationElement()}
      {
        user === null ?
        loginForm() :
        mainContent()
      }
    </div>
  )
}

export default App;
