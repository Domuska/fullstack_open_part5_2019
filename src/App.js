import React, { useState, useEffect } from 'react';

import Blog from './components/Blog';
import Login from './components/Login';
import NewBlogForm from './components/NewBlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';

import blogService from './services/blogs';
import loginService from './services/login';


const App = () => {

  const [blogs, setBlogs] = useState([]);
  const [username, setUserName] = useState(``);
  const [password, setPassword] = useState(``);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(``);


  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem(`loggedInBlogsUser`);
    if (loggedUserJson) {
      const parsedUser = JSON.parse(loggedUserJson);
      setUser(parsedUser);
      blogService.setToken(parsedUser.token);
    }
  }, []);

  useEffect(() => {
    async function fetchBlogs() {
      const blogs = await blogService.getAll();
      // console.log(blogs);
      sortAndSetBlogs(blogs);
    }
    fetchBlogs();
  }, []);

  const onLogoutClick = () => {
    window.localStorage.clear();
    setUser(null);
  };

  // setting blogs should be done through this function, handles sorting
  const sortAndSetBlogs = (blogs) => {
    const sortFunction = (firstBlog, secondBlog) => {
      if (firstBlog.likes === secondBlog.likes) return 0;
      return firstBlog.likes > secondBlog.likes ? -1 : 1;
    };
    setBlogs(blogs.sort(sortFunction));
  };

  const onBlogLike = async (blog) => {
    try {
      console.log(`onBlogLike`, blog);
      const responseBlog = await blogService.putLikes(blog.id, blog.likes + 1);
      sortAndSetBlogs(blogs.map(blogObject => blogObject.id !== blog.id ? blogObject : responseBlog));
      console.log(responseBlog);
    } catch (error) {
      console.error(error);
      setNotification(`Error while liking blog, see console output`);
      setTimeout(() => {
        setNotification(``);
      }, 5000);
    }
  };

  const onBlogDelete = async (blog) => {
    try {
      console.log(`onBlogDelete`);
      const shouldDelete = window.confirm(`Are you sure you want to delete blog ${blog.title}?`);
      if (shouldDelete) {
        await blogService.deleteBlog(blog.id);
        sortAndSetBlogs(blogs.filter(blogObject => blogObject.id !== blog.id));
      }
    } catch (error) {
      console.error(error);
      setNotification(`Error while deleting blog, see console output`);
      setTimeout(() => {
        setNotification(``);
      }, 5000);
    }

  };

  const onSubmitBlogHandler = async ({ title, author, url }) => {
    console.log(`onSubmitFormHandler`, title, author, url);
    try {
      const response = await blogService.create({ title, author, url });
      sortAndSetBlogs(blogs.concat(response));
      setNotification(`Blog added: "${response.title}" by ${response.author}`);
      setTimeout(() => {
        setNotification(``);
      }, 5000);
    } catch (error) {
      console.error(error);
      setNotification(`Error while adding blog, see console output`);
      setTimeout(() => {
        setNotification(``);
      }, 5000);
    }

  };

  const handleUsernameChange = (event) => {
    setUserName(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const onLoginClick = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      // console.log(`user:`, user);

      setUser(user);
      setPassword(``);
      setUserName(``);
      window.localStorage.setItem(`loggedInBlogsUser`, JSON.stringify(user));
      blogService.setToken(user.token);

    } catch (error) {
      console.error(error);
      setNotification(`Failed to log in`);
      setTimeout(() => {
        setNotification(``);
      }, 5000);
    }
  };

  const loginForm = () => (
    <Login
      username={username}
      password={password}
      handleUserNameChange={handleUsernameChange}
      handlePasswordChange={handlePasswordChange}
      onLoginClick={onLoginClick}
    />
  );

  const notificationElement = () => {
    if (notification !== ``) {
      return (
        <Notification message={notification} />
      );
    }
    return null;
  };


  const getBlogRows = () => {
    return blogs.map(blog => {
      const deleteButton = () => (
        <button onClick={() => onBlogDelete(blog)}>delete</button>
      );

      const isUserAuthor = !!blog.user.find(element => element.id === user.id);

      return (
        <Blog
          blog={blog}
          key={blog.id}
          onBlogLike={onBlogLike}
          onBlogDelete={onBlogDelete}>
          {isUserAuthor && deleteButton()}
        </Blog>
      );
    }
    );
  };

  const mainContent = () => (
    <div>
      <div>
        <p>{user.name} logged in</p>
        <button onClick={onLogoutClick}>logout</button>
      </div>
      <Togglable toggleButtonLabel="Create new">
        <NewBlogForm onSubmitFormHandler={onSubmitBlogHandler}></NewBlogForm>
      </Togglable>
      <h2>Blogs</h2>
      <ul>
        {getBlogRows()}
      </ul>
    </div>

  );

  return (
    <div className="App">
      {notificationElement()}
      {
        user === null ?
          loginForm() :
          mainContent()
      }
    </div>
  );
};

export default App;
