import { useSelector } from "react-redux";
import 'swiper/css';
import 'swiper/css/pagination';
import ContentService from "../service/content";
import useFetchContent from "../hook/useFetchContent";
import { Skeleton, Stack, Box, Typography, Pagination } from "@mui/material";
import SmallCards from "./Small-cards";
import { useState } from "react";
import { searchAllFailure, searchAllStart, searchAllSuccess } from '../slice/search';
import { useParams } from "react-router-dom";

const Search = () => {
    const { query } = useParams();
    const { items, isLoading } = useSelector(state => state.search);
    const [page, setPage] = useState(1)

    useFetchContent(ContentService.searchFor, searchAllStart, searchAllSuccess, searchAllFailure, '', 'multi', page, query);

    const handleChange = (_, val) => {
        setPage(val)
    }
    return (
        <Stack ml={'10.25rem'} pb={'3.375rem'} className="max-tablet:mx-6 max-phone:mx-4">
            <Typography className='text-white text-3xl max-phone:text-[1.25rem] mb-8 mt-2'>
                Found {items?.total_results} result for '{query}'
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
                <>
                    <Stack className="grid grid-cols-5 gap-x-10 gap-y-8 max-desktop:grid-cols-4 max-laptop:grid-cols-3 mr-[2.25rem] max-tablet:mr-0 max-phone:grid-cols-2 max-tablet:gap-x-[1.875rem] max-tablet:gap-y-6 max-phone:gap-4">
                        {items.results && items.results.map(item => (
                            <SmallCards key={item.id} item={item} />
                        ))}
                    </Stack>
                    <Pagination
                        count={items?.total_pages}
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

export default Search;
