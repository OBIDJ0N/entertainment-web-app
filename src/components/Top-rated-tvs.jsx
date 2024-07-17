import { useSelector } from "react-redux";
import 'swiper/css';
import 'swiper/css/pagination';
import ContentService from "../service/content";
import useFetchContent from "../hook/useFetchContent";
import { Button, Skeleton, Stack, Box, Typography } from "@mui/material";
import { getTopRatedTvsStart, getTopRatedTvsSuccess, getTopRatedTvsFailure } from "../slice/content";
import SmallCards from "./Small-cards";

const TopRatedTvs = () => {
    const { topRatedTvs, isLoading } = useSelector(state => state.content);
    useFetchContent(ContentService.getContent, getTopRatedTvsStart, getTopRatedTvsSuccess, getTopRatedTvsFailure, 'tv', 'top_rated')

    return (
        <>
            <Typography className='text-white text-3xl max-phone:text-[1.25rem] mb-8 mt-10'>
                Top Rated  <Button variant="outlined" disableTouchRipple className="border-red text-red cursor-auto hover:bg-transparent max-tablet:px-4 max-tablet:text-sm">TV Series</Button>
            </Typography>
            {isLoading ? (
                <Stack className="grid grid-cols-5 gap-x-10 gap-y-8 max-desktop:grid-cols-4 max-laptop:grid-cols-3 mr-[2.25rem] max-tablet:mr-0 max-phone:grid-cols-2 max-tablet:gap-x-[1.875rem] max-tablet:gap-y-6 max-phone:gap-4">
                    {Array.from({ length: 10 }).map((_, index) => (
                        <Box className="" key={index}>
                            <Skeleton animation="wave" className="h-[10.875rem] bg-semi-dark-blue" variant="rectangular" />
                            <Skeleton animation="wave" className="w-2/4 bg-semi-dark-blue" variant="text" />
                            <Skeleton animation="wave" className="w-3/4 bg-semi-dark-blue" variant="text" />
                        </Box>
                    ))}
                </Stack>
            ) : (
                <Stack className="grid grid-cols-5 gap-x-10 gap-y-8 max-desktop:grid-cols-4 max-laptop:grid-cols-3 mr-[2.25rem] max-tablet:mr-0 max-phone:grid-cols-2 max-tablet:gap-x-[1.875rem] max-tablet:gap-y-6 max-phone:gap-4">
                    {topRatedTvs.results && topRatedTvs.results.slice(0, 15).map(item => (
                        <SmallCards key={item.id} item={item} />
                    ))}
                </Stack>
            )}
        </>
    );
};

export default TopRatedTvs;
