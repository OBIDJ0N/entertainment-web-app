import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules'
import { Box, Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { SmallCards } from '../components/';

const Swipers = ({ items, title }) => {
  return (
    <>
      <Typography className='text-2xl mt-4'>{title}</Typography>
      <Box width='100%' overflow='hidden'>
        <Swiper
          slidesPerView={'auto'}
          spaceBetween={20}
          className="mySwiper mt-4 h-64 max-tablet:h-56 max-phone:h-[11.5rem] custom-swiper"
          grabCursor={true}
          modules={[Navigation]}
          navigation={true}
        >
          {items.map(item => (
            <SwiperSlide key={uuidv4()} className='w-40'>
              <SmallCards item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </>
  )
}

export default Swipers