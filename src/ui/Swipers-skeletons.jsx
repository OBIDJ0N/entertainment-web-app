import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Box, Skeleton } from '@mui/material';

const SwipersSkeletons = () => {
    return (
        <>
            <Skeleton variant='text' animation="wave" className='bg-semi-dark-blue w-1/3 h-12 mt-5' />
            <Box width='100%' overflow='hidden'>
                <Swiper
                    slidesPerView={'auto'}
                    spaceBetween={20}
                    className="mySwiper mt-4 h-64 max-tablet:h-56 max-phone:h-[11.5rem]"
                    grabCursor={true}
                >
                    {Array.from({ length: 10 }).map((_, index) => (
                        <SwiperSlide className='w-40' key={index}>
                            <Skeleton animation="wave" className="h-[10.875rem] max-tablet:h-[8.75rem] max-phone:h-[6.875rem] bg-semi-dark-blue" variant="rectangular" />
                            <Skeleton animation="wave" className="w-2/4 bg-semi-dark-blue" variant="text" />
                            <Skeleton animation="wave" className="w-3/4 bg-semi-dark-blue" variant="text" />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Box>
        </>
    )
}

export default SwipersSkeletons