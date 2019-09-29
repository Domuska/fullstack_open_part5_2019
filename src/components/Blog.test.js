import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import Blog from './Blog';


// todo should fix the issues about error:
//  It looks like you're using a version of react-dom that supports the "act" function, but not an awaitable version of "act" which you will need. Please upgrade to at least react-dom@16.9.0 to remove this warning.
// https://github.com/testing-library/react-testing-library/issues/281



describe(`Blog tests`, () => {
  const testBlog = {
    likes: 1,
    title: `sepon seikkailut`,
    author: `mr. bean`,
    url: `www.google.fi`
  };

  afterEach(cleanup);

  test(`component initially only shows title and author`, () => {
    const component = render(
      <Blog
        blog={testBlog}
      />
    );

    const div = component.container.querySelector(`.blog-title-row`);
    expect(div).toHaveTextContent(testBlog.author);
    expect(div).toHaveTextContent(testBlog.title);
    expect(component.container).not.toHaveTextContent(testBlog.url);
    expect(component.container).not.toHaveTextContent(testBlog.likes);
    const expandedContent = component.container.querySelector(`.expanded-content`);
    expect(expandedContent).toBe(null);
  });

  test(`component shows all blog info when expanded`, () => {
    const component = render(
      <Blog
        blog={testBlog}
      />
    );

    const div = component.container.querySelector(`.blog-title-row`);
    fireEvent.click(div);
    const expandedContent = component.container.querySelector(`.expanded-content`);
    expect(expandedContent).not.toHaveStyle(`display: none`);
    expect(expandedContent).toHaveTextContent(testBlog.url);
    expect(expandedContent).toHaveTextContent(testBlog.likes);
  });
});