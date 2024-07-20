import React from 'react';
import { CardContent, CardCover } from "@mui/joy";
import { Card, Box, IconButton, Typography, Stack } from "@mui/material";
import { play } from '../constants/';
import { useNavigate } from "react-router-dom";
import useBookmark from '../hook/useBookmark';

const Cards = ({ item }) => {
  const navigate = useNavigate()
  const date = new Date(item?.release_date ? item.release_date : item.first_air_date).getFullYear().toString();
  const { isBookmarked, handleBookmark } = useBookmark(item);
  const playHandler = () => {
    const type = item.media_type === 'movie' ? 'movie' : 'tv'
    navigate(`/detail/${type}/${item.id}`)
  }
  return (
    <>
      <Card key={item.id} className="bg-transparent rounded-lg w-[29.375rem] h-[14.375rem] max-phone:w-60 max-phone:h-[8.75rem] group text-white relative">
        <CardCover className="-z-10">
          <img src={`http://image.tmdb.org/t/p/original${item.backdrop_path}`} alt="movie-img" className="rounded-lg" />
        </CardCover>
        <CardCover className="group-hover:bg-dark-blue group-hover:bg-opacity-50 transition-all" />
        <CardContent>
          <IconButton className={`group/bookmark ms-auto py-[9px] px-[10px] bg-dark-blue bg-opacity-50 rounded-full mr-6 mt-4 hover:bg-white transition-all max-phone:mt-2 max-phone:mr-2 ${isBookmarked ? 'fill-white' : ''}`} onClick={handleBookmark}>
            <svg
              width="12"
              height="14"
              viewBox="0 0 12 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="transition-all"
            >
              <path
                d="M10.7112 0.771005L10.7215 0.775484L10.7319 0.779653C10.7992 0.806575 10.8386 0.840492 10.8705 0.886923C10.9032 0.934576 10.9167 0.977859 10.9167 1.03635V12.9636C10.9167 13.0221 10.9032 13.0654 10.8705 13.1131C10.8386 13.1595 10.7992 13.1934 10.7319 13.2203L10.7237 13.2236L10.7156 13.2271C10.7107 13.2292 10.6807 13.2407 10.6094 13.2407C10.5085 13.2407 10.4397 13.2142 10.3686 13.15L6.3572 9.2346L5.83333 8.72327L5.30946 9.2346L1.29754 13.1505C1.21287 13.2276 1.14206 13.25 1.05729 13.25C1.02004 13.25 0.988249 13.2433 0.955471 13.229L0.945175 13.2245L0.934749 13.2203C0.867434 13.1934 0.828051 13.1595 0.796199 13.1131C0.763509 13.0654 0.75 13.0221 0.75 12.9636V1.03635C0.75 0.977859 0.763509 0.934576 0.796198 0.886924C0.828051 0.840491 0.867435 0.806574 0.93475 0.779653L0.945175 0.775484L0.95547 0.771004C0.988248 0.756743 1.02004 0.75 1.05729 0.75H10.6094C10.6466 0.75 10.6784 0.756743 10.7112 0.771005Z"
                stroke="white"
                strokeWidth="1.5"
                className={`group-hover/bookmark:stroke-dark-blue transition-all ${isBookmarked ? 'fill-white' : ''}`}
              />
            </svg>
          </IconButton>
          <Box onClick={playHandler} className="cursor-pointer absolute top-[40%] left-1/2 transform -translate-x-1/2 bg-white bg-opacity-25 mx-auto  p-[9px] pr-6 gap-5 rounded-[1.75rem] group-hover:flex hidden max-phone:p-[6px] max-phone:gap-2 max-phone:top-[30%]">
            <img src={play} alt="play" className='max-phone:w-5' />
            <span className="text-xl max-phone:text-sm">Play</span>
          </Box>
          <Box className="mt-[6.625rem] ms-6 max-phone:mt-8 max-phone:ml-4">
            <Stack display={'flex'} flexDirection={'row'} alignItems={'baseline'}>
              <Typography className="text-base opacity-75 max-phone:text-sm">{date}</Typography>
              <span className="mx-2 opacity-75">·</span>
              <Typography className='max-phone:text-sm opacity-75'>{item.media_type === 'movie' ? item.media_type[0].toUpperCase() + item.media_type.slice(1) : item.media_type.toUpperCase() + ' Series'}</Typography>
            </Stack>
            <Typography className="text-2xl max-phone:text-base">{(item.title || item.name).length >= 30 ? (item.title || item.name).slice(0, 30) + '...' : (item.title || item.name)}</Typography>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default Cards;
