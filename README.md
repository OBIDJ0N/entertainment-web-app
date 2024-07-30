# Entertainment-web-app

Welcome to the Entertainment-web-app! This application allows users to browse, search, and bookmark movies and TV series. It is built with React and uses Firebase for authentication and Firestore for storing user data. The app leverages the TMDB API to fetch movie and TV series information.

## Features

- **User Authentication:** Users can sign up, log in, and log out using Firebase Authentication.
- **Browse Movies and TV Series:** Display a list of movies and TV series fetched from the TMDB API.
- **Search Functionality:** Search for movies, TV series, or both based on the current page.
- **Bookmark Movies:** Users can bookmark their favorite movies and TV series. Bookmarks are stored in Firestore.
- **User Profile:** Users can update their profile details.
- **Movie and TV Series Details:** View detailed information about a specific movie or TV series.
- **Similar Movies and TV Series:** Discover similar movies and TV series based on the current selection.
- **Cast Details:** Display cast information including their social media IDs (Facebook, Instagram, Twitter, TikTok and YouTube).
- **YouTube Trailers:** Watch trailers using `ReactPlayer` integrated with YouTube.
- **Genre Selection:** Browse movies and TV series by selecting specific genres.

## Tech Stack

- **Frontend:**
  - React
  - Redux (for state management)
  - React Router (for navigation)
  - MUI (Material-UI for UI components)
  - Tailwind CSS (for styling)
  - `react-top-loading-bar` (for displaying a loading bar)
  - `ReactPlayer` (for playing YouTube trailers)
  - Swiper JS (for creating carousels and sliders)

- **Backend:**
  - Firebase (Authentication and Firestore)

- **APIs:**
  - TMDB API (for fetching movie and TV series data)

## Setup and Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/OBIDJ0N/entertainment-web-app.git
