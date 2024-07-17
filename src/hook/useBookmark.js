import { useEffect, useState } from 'react';
import BookmarkService from '../service/bookmark';
import { useDispatch } from 'react-redux';
import useAuth from './useAuth';
import { fetchBookmarks } from '../slice/bookmark';

const useBookmark = (item) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchInitialBookmarks = async () => {
      try {
        if (!isAuthenticated || !item?.id) return;

        const bookmarks = await BookmarkService.getBookmarks();
        const isAlreadyBookmarked = bookmarks.some(bookmark => bookmark.id === item.id);
        setIsBookmarked(isAlreadyBookmarked);
      } catch (error) {
        console.error("Error fetching bookmarks:", error.message);
      }
    };

    fetchInitialBookmarks();
  }, [item?.id, isAuthenticated]);

  const handleBookmark = async () => {
    try {
      if (!isAuthenticated) {
        console.error("User is not authenticated.");
        return;
      }
      if (!item?.id) {
        console.error("Item ID is undefined.");
        return;
      }

      if (isBookmarked) {
        await BookmarkService.removeBookmark(item.id);
      } else {
        await BookmarkService.addBookmark(item);
      }
      setIsBookmarked(prev => !prev);
      dispatch(fetchBookmarks());
    } catch (error) {
      console.error("Error updating bookmark:", error.message);
    }
  };

  return {
    isBookmarked,
    handleBookmark,
  };
};

export default useBookmark;
