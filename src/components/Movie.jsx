import { useSelector } from "react-redux";
import 'swiper/css';
import 'swiper/css/pagination';
import ContentService from "../service/content";
import useFetchContent from "../hook/useFetchContent";
import { Stack, Typography, Pagination } from "@mui/material";
import { getMoviesStart, getMoviesSucces, getMoviesFailure } from "../slice/content";
import SmallCards from "./Small-cards";
import { useState } from "react";
import { Skeletons } from "../ui";

const Movies = () => {
  const { movies, isLoading } = useSelector(state => state.content);
  const [page, setPage] = useState(1)
  useFetchContent(ContentService.getDiscover, getMoviesStart, getMoviesSucces, getMoviesFailure, 'movie', 'include_video=false', page)
  const handleChange = (_, val) => {
    setPage(val)
  }

  return (
    <Stack ml={'10.25rem'} pb={'3.375rem'} className="max-tablet:mx-6 max-phone:mx-4">
      <Typography className='text-white text-3xl max-phone:text-[1.25rem] mb-8 mt-2 max-phone:mb-6'>
        Movies
      </Typography>
      {isLoading ? (
        <Skeletons />
      ) : (
        <>
          <Stack className="grid grid-cols-5 gap-x-10 gap-y-8 max-desktop:grid-cols-4 max-laptop:grid-cols-3 mr-[2.25rem] max-tablet:mr-0 max-phone:grid-cols-2 max-tablet:gap-x-[1.875rem] max-tablet:gap-y-6 max-phone:gap-4">
            {movies.results && movies.results.map(item => (
              <SmallCards key={item.id} item={item} />
            ))}
          </Stack>
          <Pagination
            count={movies?.total_pages}
            page={page}
            onChange={handleChange}
            color="primary"
            className="mt-10 flex justify-center text-white"
          />
        </>
      )}
    </Stack>
  );
};

export default Movies;
