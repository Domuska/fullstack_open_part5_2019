const dummyBlogs = [
  {
    author: `Piippolan vaari`,
    title: `Talonrakennus 1`,
    likes: 1,
    url: `www.piippolanvaari.fi/blogs/tra1`,
    id: `abc`,
    user: [
      {
        username: `piippo123`,
        name: `Piippolan vaari`,
        id: `piippo_dasd1242`
      }
    ]
  },
  {
    author: `Piippolan vaari`,
    title: `Talonrakennus 2`,
    likes: 24,
    url: `www.piippolanvaari.fi/blogs/tra2`,
    id: `dee`,
    user: [
      {
        username: `piippo123`,
        name: `Piippolan vaari`,
        id: `piippo_dasd1242`
      }
    ]
  },
  {
    author: `Tomi Lämsä`,
    title: `How to create a Vue component`,
    likes: 1,
    url: `www.lamsa.me/vuecomponents`,
    id: `1337`,
    user: [
      {
        username: `lamsatom`,
        name: `Tomi Lämsä`,
        id: `tomilamsa`
      }
    ]
  }
];

const getAll = () => {
  return Promise.resolve(dummyBlogs);
};

const setToken = (token) => {};

export default { getAll, setToken, dummyBlogs };