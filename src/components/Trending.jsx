import { useSelector } from "react-redux";
import Cards from "./Cards";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import ContentService from "../service/content";
import useFetchContent from "../hook/useFetchContent";
import { Typography } from "@mui/joy";
import { Skeleton } from "@mui/material";
import { getTrendingStart, getTrendingSuccess, getTrendingFailure } from "../slice/content";

const Trending = () => {
    const { items, isLoading } = useSelector(state => state.content);
    useFetchContent(ContentService.getTrendingAll, getTrendingStart, getTrendingSuccess, getTrendingFailure);

    return (
        <>
            <Typography className='text-white text-3xl mb-6 max-phone:text-[1.25rem]'>
                Trending
            </Typography>
            {isLoading ? (
                <Swiper slidesPerView={'auto'} spaceBetween={40} grabCursor={true}>
                    {Array.from({ length: 10 }).map((_, index) => (
                        <SwiperSlide className="w-max max-phone:mr-4" key={index}>
                            <Skeleton animation="wave" className="w-[29.375rem] h-[14.375rem] max-phone:w-60 max-phone:h-[8.75rem] bg-semi-dark-blue" variant="rectangular" />
                        </SwiperSlide>
                    ))}
                </Swiper>
            ) : (
                <Swiper slidesPerView={'auto'} spaceBetween={40} grabCursor={true}>
                    {items.results && items.results.map(item => (
                        <SwiperSlide className="w-max max-phone:mr-4" key={item.id}>
                            <Cards item={item} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </>
    );
};

export default Trending;
