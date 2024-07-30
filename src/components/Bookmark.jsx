import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookmarks } from '../slice/bookmark';
import { Stack, Typography } from "@mui/material";
import SmallCards from './Small-cards';
import { Skeletons } from '../ui'

const Bookmark = () => {
  const dispatch = useDispatch();
  const { bookmarks, isLoading } = useSelector(state => state.bookmark);

  useEffect(() => {
    dispatch(fetchBookmarks());
  }, [dispatch]);

  return (
    <div>
      <Stack ml={'10.25rem'} pb={'3.375rem'} className="max-tablet:mx-6 max-phone:mx-4">
        <Typography className='text-white text-3xl max-phone:text-[1.25rem] mb-8 mt-2 max-phone:mt-2 max-phone:mb-6'>
          Bookmarked
        </Typography>
        {isLoading ? (
          <Skeletons />
        ) : (
          <>
            <Stack className="grid grid-cols-5 gap-x-10 gap-y-8 max-desktop:grid-cols-4 max-laptop:grid-cols-3 mr-[2.25rem] max-tablet:mr-0 max-phone:grid-cols-2 max-tablet:gap-x-[1.875rem] max-tablet:gap-y-6 max-phone:gap-4">
              {bookmarks && bookmarks.length > 0 ? (
                bookmarks.map(item => (
                  <SmallCards key={item.id} item={item} />
                ))
              ) : (
                <Typography className='text-base text-white'>No bookmarks available</Typography>
              )}
            </Stack>
          </>
        )}
      </Stack>
    </div>
  );
};

export default Bookmark;
