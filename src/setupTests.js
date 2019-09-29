
jest.mock(`./services/blogs`);
import '@testing-library/jest-dom/extend-expect';

// setup local storage mock
let savedItems = {};

const localStorageMock = {
  setItem: (key, item) => {
    savedItems[key] = item;
  },
  getItem: (key) => savedItems[key],
  clear: savedItems = {}
};

Object.defineProperty(window, `localStorage`, { value: localStorageMock });


// suppress errors about not wrapped in act...
// https://github.com/facebook/react/issues/14769
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (/Warning.*not wrapped in act/.test(args[0])) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});