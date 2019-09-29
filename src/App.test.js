import React from 'react';
import { render,  waitForElement } from '@testing-library/react';
import App from './App';

import blogsMock from './services/__mocks__/blogs';
const { dummyBlogs } = blogsMock;

describe(`App tests`, () => {
  test(`if no user logged, notes are not rendered`, async () => {
    const component = render(
      <App />
    );
    component.rerender(<App />);

    await waitForElement(
      () => component.getByText(`login`)
    );

    // component.debug();
    expect(component.container).toHaveTextContent(`login`);
    expect(component.container).toHaveTextContent(`username`);
    expect(component.container).toHaveTextContent(`password`);


    const blogElements = component.container.querySelector(`.blog`);
    expect(blogElements).toBe(null);
  });

  test(`if user is logged in, expect blogs to have been rendered after received from backend`, async () => {
    const user = {
      username: `tester`,
      token: `1231231214`,
      name: `Donald Tester`
    };

    localStorage.setItem(`loggedInBlogsUser`, JSON.stringify(user));

    const component = render(
      <App />
    );
    component.rerender(<App />);
    await waitForElement(
      () => component.getByText(`Blogs`)
    );

    // component.debug();
    const blogs = component.container.querySelectorAll(`.blog`);
    // mocked blogs can be found in <project_root>/src/services/__mocks__/blogs.js
    expect(blogs.length).toBe(dummyBlogs.length);
    expect(component.container).toHaveTextContent(dummyBlogs[0].title);
    expect(component.container).toHaveTextContent(dummyBlogs[1].title);
    expect(component.container).toHaveTextContent(dummyBlogs[2].title);

  });
});