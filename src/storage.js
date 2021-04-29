let storage = {
  apiKey: 'YOUR_TMDB_API_KEY',
  sessionId: localStorage.getItem('session_id') || null,
  userId: localStorage.getItem('user_id') || null,
  pageTitlePostfix: ' — ' + document.title,
  listTypes: [
    {
      title: 'Popular Books',
      shortTitle: 'Popular',
      query: 'popular',
      type: 'collection',
      isCategory: true
    },
    {
      title: 'Top Rated Books',
      shortTitle: 'Top Rated',
      query: 'top_rated',
      type: 'collection',
      isCategory: true
    },
    {
      title: 'Upcoming Books',
      shortTitle: 'Upcoming',
      query: 'upcoming',
      type: 'collection',
      isCategory: true
    },
    {
      title: 'Now Playing Books',
      shortTitle: 'Now Playing',
      query: 'now_playing',
      type: 'collection',
      isCategory: true
    },
    {
      title: 'Search Results',
      query: 'search',
      isCategory: false
    },
    {
      title: 'Your Favorite Books',
      query: 'favorite',
      isCategory: false
    }
  ],
  categories: {},
  // For Browser History
  backTitle: '',
  bookPath: '',
  createBookPopup: false,
  bookPopupOnHistory: false
};

// Create categories titles
storage.listTypes.forEach(function(listType){
  storage.categories[listType.query] = listType.title;
});

export default storage;
