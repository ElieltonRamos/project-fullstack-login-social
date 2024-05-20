export const mockPosts = [
  {
    id: 1,
    title: 'Hello World',
    content: 'This is my first blog post!',
    userId: 1,
    created: new Date('2024-05-13T08:00:00Z'),
    updated: new Date('2024-05-13T08:00:00Z')
  },
  {
    id: 2,
    title: 'Hello World 2',
    content: 'This is my second blog post!',
    userId: 1,
    created: new Date('2024-05-13T09:00:00Z'),
    updated: new Date('2024-05-13T09:00:00Z'),
  },
  {
    id: 3,
    title: 'Hello World 3',
    content: 'This is my third blog post!',
    userId: 2,
    created: new Date('2024-05-13T10:00:00Z'),
    updated: new Date('2024-05-13T10:00:00Z'),
  },
];

export const mockPostDateString = mockPosts.map((post) => ({
  ...post,
  created: post.created.toISOString(),
  updated: post.updated.toISOString(),
}));
