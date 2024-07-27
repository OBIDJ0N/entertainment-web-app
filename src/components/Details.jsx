import React from 'react'
import ContentService from '../service/content'
import { useNavigate, useParams } from 'react-router-dom'
import useFetchContent from '../hook/useFetchContent'
import { getDetailsFailure, getDetailsStart, getDetailsSuccess } from '../slice/content'
import { useSelector } from 'react-redux'
import { Box, Button, Card, CardContent, IconButton, Skeleton, Stack, Typography } from '@mui/material'
import { CardCover } from '@mui/joy'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import StarIcon from '@mui/icons-material/Star';
import moment from 'moment/moment'
import ReactPlayer from 'react-player'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules'
import { DetailsCasts, DetailsSmilars } from './'
import useBookmark from '../hook/useBookmark'

const Details = () => {
  const { type, id } = useParams()
  const { details, isLoading } = useSelector(state => state.content)
  const { isBookmarked, handleBookmark } = useBookmark(details);
  const navigate = useNavigate()

  useFetchContent(ContentService.getDetail, getDetailsStart, getDetailsSuccess, getDetailsFailure, type, id)
  console.log(details);

  return (
    isLoading ? (
      <Stack>
        <Skeleton animation="wave" className="w-full relative h-[40rem] max-laptop:h-[35rem] max-tablet:h-[30rem] bg-semi-dark-blue" variant="rectangular" />
        <Stack mx={'2.5rem'} display={'flex'} flexDirection={'row'} gap={'2.5rem'} className='max-laptop:flex-col max-laptop:gap-0'>
          <Skeleton animation="wave" className="w-56 h-80 border -mt-28 z-10 bg-semi-dark-blue rounded-3xl max-laptop:mx-auto max-tablet:w-48 max-tablet:h-72 max-phone:w-40 max-phone:h-56" variant="rectangular" />
          <Stack mt={'2.5rem'} className='w-full' gap={'.5rem'}>
            <Skeleton animation="wave" className="w-2/4 h-8 bg-semi-dark-blue" variant="rectangular" />
            <Skeleton animation="wave" className="w-full h-6 bg-semi-dark-blue" variant="rectangular" />
            <Skeleton animation="wave" className="w-1/4 h-4 bg-semi-dark-blue" variant="rectangular" />
            <Skeleton animation="wave" className="w-full h-16 bg-semi-dark-blue" variant="rectangular" />
          </Stack>
        </Stack>
        <Skeleton animation="wave" className="relative h-8 bg-semi-dark-blue mx-10 mt-4" variant="rectangular" />
      </Stack>
    ) : (
      details && (
        <>
          <Card className="bg-transparent pb-10">
            <Box className='group relative h-[40rem] max-laptop:h-[35rem] max-tablet:h-[30rem]'>
              <CardCover>
                {details.backdrop_path ? <img src={`http://image.tmdb.org/t/p/original${details.backdrop_path}`} alt="movie-img" className="w-full h-full object-cover" /> : <Skeleton animation="wave" className="h-full bg-semi-dark-blue" variant="rectangular" />}
              </CardCover>
              <CardCover className="group absolute bg-dark-blue bg-opacity-50 transition-all" />
              <CardContent className='pl-8 pt-5 max-tablet:pl-4 max-phone:px-0'>
                <Button onClick={() => navigate(-1)} className='rounded-full text-white min-w-max' startIcon={<ArrowBackIosNewIcon className='text-3xl' />} />
              </CardContent>
            </Box>
            <Box className='mx-10 flex text-white max-laptop:flex-col max-tablet:mx-6 max-phone:mx-4'>
              <Box className='w-56 h-80 -mt-28 z-10 max-laptop:mx-auto max-tablet:w-48 max-tablet:h-72 max-phone:w-40 max-phone:h-56'>
                {details.poster_path ? <img src={`http://image.tmdb.org/t/p/original${details.poster_path}`} alt="img" className='w-full h-full object-cover rounded-3xl' /> : <Skeleton animation="wave" className='h-80 bg-semi-dark-blue rounded-3xl' />}
              </Box>
              <Box className='mt-10 ml-10 max-laptop:ml-0'>
                <Typography className='text-white text-3xl max-phone:text-[1.25rem] font-bold max-phone:text-2xl'>{details.title || details.name}</Typography>
                <Stack display={'flex'} flexDirection={'row'} flexWrap={'wrap'} gap={'.5rem'} mt={'.5rem'}>
                  {details.genres.map(item => (
                    <Button className='rounded-3xl bg-greyish-blue bg-opacity-40 px-3 normal-case' variant='contained' key={item.id}>{item.name}</Button>
                  ))}
                </Stack>
                <Stack display={'flex'} flexDirection={'row'} mt={'.7rem'} alignItems={'center'}>
                  {details?.runtime && <Typography className='text-base mr-2'>{Math.floor(details.runtime / 60) + "h " + (details.runtime % 60) + ' mins'}</Typography>}
                  <Typography display={'flex'} alignItems={'center'}>
                    <StarIcon className='text-[#FFFF00] w-5 mr-[2px]' />
                    {details.vote_average.toFixed(1)} (IMDb)
                  </Typography>
                  <IconButton className={`group/bookmark mt-1 ms-4 py-[9px] px-[10px] bg-dark-blue bg-opacity-50 rounded-full hover:bg-white transition-all max-phone:mt-2 max-phone:mr-2 ${isBookmarked ? 'fill-white' : ''}`} onClick={handleBookmark}>
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
                </Stack>
                <Stack borderTop={'1px solid rgba(255, 255, 255, .2)'} my={'.5rem'} display={'flex'} flexDirection={'row'} gap={'2rem'} flexWrap={'wrap'} className='max-phone:gap-6 max-phone:gap-y-2'>
                  <Box className='mt-2'>
                    <Typography className='text-xl'>Release date</Typography>
                    <Typography className='text-base opacity-75'>{moment(details.release_date || details.first_air_date).format('MMMM Do, YYYY')}</Typography>
                  </Box>
                  <Box className='mt-2'>
                    <Typography className='text-xl'>Language</Typography>
                    {details.spoken_languages.map(item => (
                      <Typography className='text-base opacity-75' key={item.name}>{item.name}</Typography>
                    ))}
                  </Box>
                  <Box className='mt-2'>
                    <Typography className='text-xl'>Status</Typography>
                    <Typography className='text-base opacity-75'>{details.status || 'Not Released'}</Typography>
                  </Box>
                  {details?.number_of_seasons && (
                    <Box className='mt-2'>
                      <Typography className='text-xl'>Seasons</Typography>
                      <Typography className='text-base opacity-75'>{details.number_of_seasons}</Typography>
                    </Box>
                  )}
                  {details?.number_of_episodes && (
                    <Box className='mt-2'>
                      <Typography className='text-xl'>Episodes</Typography>
                      <Typography className='text-base opacity-75'>{details.number_of_episodes}</Typography>
                    </Box>
                  )}
                </Stack>
              </Box>
            </Box>
            <Box className='mx-10 text-white max-tablet:mx-6 mt-4 max-phone:mx-4'>
              <Typography className='text-2xl'>Synopsis</Typography>
              {details?.overview && <Typography className='opacity-75 mt-2'>{details.overview}</Typography>}
              <Typography className='text-2xl mt-4'>Trailers</Typography>
              {details.videos?.results && details.videos?.results.length > 0 ? (
                <Swiper
                  slidesPerView={1}
                  spaceBetween={30}
                  navigation={true}
                  modules={[Navigation,]}
                  className="video-player"
                >
                  {details.videos?.results.map(item => (
                    <SwiperSlide key={item.id}>
                      <ReactPlayer
                        width={'full'}
                        height={'50rem'}
                        url={`https://www.youtube.com/watch?v=${item?.key}`}
                        controls
                        className='react-player mt-4 max-laptop:h-[40rem] max-tablet:h-[30rem] max-phone:h-96' />
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <Typography>No trailers</Typography>
              )}
              <DetailsCasts casts={details?.credits.cast} />
              <DetailsSmilars similars={details?.similar} />
            </Box>
          </Card >
        </>
      )
    )
  )
}

export default Details