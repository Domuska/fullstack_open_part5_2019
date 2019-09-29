import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, cleanup, fireEvent } from '@testing-library/react';
import SimpleBlog from './SimpleBlog';



describe(`SimpleBlog`, () => {
  const testBlog = {
    likes: 1,
    title: `sepon seikkailut`,
    author: `mr. bean`
  };

  afterEach(cleanup);

  test(`component renders properly`, () => {
    const component = render(
      <SimpleBlog blog={testBlog} />
    );
    expect(component.container).toHaveTextContent(testBlog.title);
    expect(component.container).toHaveTextContent(testBlog.author);
    expect(component.container).toHaveTextContent(testBlog.likes);
  });

  test(`component calls click handler`, () => {
    const mockOnClick = jest.fn();

    const { getByText } = render(
      <SimpleBlog blog={testBlog} onClick={mockOnClick} />
    );
    const button = getByText(`like`);
    fireEvent.click(button);
    fireEvent.click(button);

    expect(mockOnClick.mock.calls.length).toBe(2);
  });

});