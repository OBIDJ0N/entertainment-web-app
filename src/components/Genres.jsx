import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Stack, Typography, Button, Menu, MenuItem, Skeleton } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ContentService from "../service/content";
import useFetchContent from "../hook/useFetchContent";
import { getListOfGenresStart, getListOfGenresSuccess, getListOfGenresFailure } from "../slice/content";
import { btnsArray } from "../constants/btns-array";

const Genres = () => {
    const { listOfGenres, isLoading } = useSelector(state => state.content);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedItem, setSelectedItem] = useState('');
    const [type, setType] = useState('movie');
    const navigate = useNavigate();

    useFetchContent(ContentService.getListOfGenres, getListOfGenresStart, getListOfGenresSuccess, getListOfGenresFailure, type);

    useEffect(() => {
        if (!selectedItem) {
            navigate(`/genre/${type}`);
        }
    }, [navigate, selectedItem, type]);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSelect = (item, type) => {
        setSelectedItem(item);
        setType(type);
        handleClose();
        navigate(`/genre/${type}`);
    };

    const genreHandler = (id) => {
        navigate(`/genre/${type}/${id}`)
    }

    return (
        <Stack ml={'10.25rem'} pb={'3.375rem'} className="max-tablet:mx-6 max-phone:mx-4">
            <Stack flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'} className="mb-8 mt-2 max-phone:mb-6 tablet:mr-[2.25rem]">
                <Typography className='text-white text-3xl max-phone:text-[1.25rem]'>
                    Genres
                </Typography>
                <Button endIcon={<KeyboardArrowDownIcon />} aria-controls="customized-menu" aria-haspopup="true" onClick={handleClick} className='bg-greyish-blue bg-opacity-50 p-3 max-phone:p-2 shadow-sm flex items-center justify-between text-white w-36 max-laptop:w-48 max-tablet:w-44 max-phone:w-36 normal-case' >
                    {selectedItem || 'Movie'}
                </Button>
                <Menu
                    id="customized-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    className='mt-1'
                    MenuListProps={{
                        'aria-labelledby': 'customized-button',
                    }}
                    PaperProps={{
                        className: 'w-36 max-laptop:w-48 max-tablet:w-44 max-phone:w-36 bg-greyish-blue text-white',
                    }}
                >
                    {btnsArray.map((item, idx) => (
                        <MenuItem className='' key={idx} onClick={() => handleSelect(item.name, item.type)}>{item.name}</MenuItem>
                    ))}
                </Menu>
            </Stack>
            {isLoading ? (
                <Stack className='grid grid-cols-6 max-laptop:grid-cols-4 max-phone:grid-cols-3 tablet:mr-[2.25rem]' gap={'1rem'}>
                    {Array.from({ length: 12 }).map((_, index) => (
                        <Skeleton key={index} animation="wave" className="normal-case py-[1.984rem] px-8 max-phone:py-[1.266rem] max-phone:px-4 bg-semi-dark-blue" variant="rectangular" />
                    ))}
                </Stack>
            ) : (
                <Stack className='grid grid-cols-6 max-laptop:grid-cols-4 max-phone:grid-cols-3 tablet:mr-[2.25rem]' gap={'1rem'}>
                    {(listOfGenres.genres && listOfGenres.genres.length > 0) && listOfGenres.genres.map(item => (
                        <Button onClick={() => genreHandler(item.id)} variant='contained' key={item.id} className='normal-case text-xl max-phone:text-base bg-greyish-blue bg-opacity-30 py-4 px-8 max-phone:py-2 max-phone:px-4'>{item.name}</Button>
                    ))}
                </Stack>
            )}
        </Stack>
    )
}

export default Genres;
