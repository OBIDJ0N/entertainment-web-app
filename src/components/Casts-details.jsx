import { Box, Button, Skeleton, Stack, Typography } from '@mui/material';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import useFetchContent from '../hook/useFetchContent';
import ContentService from '../service/content';
import { getCastsDetailsStart, getCastsDetailsSuccess } from '../slice/content';
import { useSelector } from 'react-redux';
import { iconsArray } from '../constants/Icons';
import moment from 'moment/moment';
import { v4 as uuidv4 } from 'uuid';
import { Swipers, SwipersSkeletons } from '../ui';

const CastsDetails = () => {
    const { castsDetails, isLoading } = useSelector(state => state.content);
    const { id } = useParams();
    const navigate = useNavigate();
    useFetchContent(ContentService.getCastsDetail, getCastsDetailsStart, getCastsDetailsSuccess, getCastsDetailsSuccess, 'person', id);
    const gender = castsDetails?.gender === 1 ? 'Female' : castsDetails?.gender === 2 ? 'Male' : castsDetails?.gender === 3 ? 'Non-binary' : '';
    const knownCredits = castsDetails?.combined_credits?.cast?.length ? castsDetails.combined_credits.cast.length - 1 : 'N/A';
    const age = castsDetails?.birthday ? moment().year() - moment(castsDetails.birthday).year() : 'Unknown';

    return (
        <Stack className='mx-10 text-white max-tablet:mx-6 max-phone:mx-4 pb-10'>
            <Stack mt={'1.25rem'} flexDirection={'row'} justifyContent={'center'} alignItems={'center'}>
                <Button onClick={() => navigate(-1)} className='rounded-full text-white w-max mr-auto' startIcon={<ArrowBackIosNewIcon className='text-3xl' />} />
                <Typography className='text-3xl mr-auto max-tablet:text-2xl'>Cast's details</Typography>
            </Stack>
            <Stack mt={'2.5rem'} flexDirection={'row'} gap={'2.5rem'} className='max-laptop:flex-col'>
                <Box>
                    {isLoading ? (
                        <Skeleton variant='rectangular' animation="wave" className='w-80 h-[28.125rem] bg-semi-dark-blue rounded-xl max-laptop:mx-auto max-tablet:w-60 max-tablet:h-80' />
                    ) : (
                        <Box className='w-80 h-[28.125rem] max-laptop:mx-auto max-tablet:w-60 max-tablet:h-80'>
                            {castsDetails?.profile_path ?
                                <img src={`http://image.tmdb.org/t/p/original${castsDetails.profile_path}`} alt="img" className='w-full h-full object-cover rounded-xl' /> :
                                <Skeleton variant='rectangular' animation="wave" className='w-80 h-[28.125rem] bg-semi-dark-blue rounded-xl max-laptop:mx-auto max-tablet:w-60 max-tablet:h-80' />}
                        </Box>
                    )}
                    <Stack flexDirection={'row'} gap={'.5rem'} mt={'1rem'} className='max-laptop:justify-center'>
                        {isLoading ? (
                            <Skeleton variant='text' animation="wave" className='bg-semi-dark-blue rounded-xl w-3/4 h-12' />
                        ) : (
                            iconsArray.map(item => (
                                castsDetails?.external_ids[item.id] && (
                                    <Button
                                        size='small'
                                        key={item.id}
                                        href={`${item.baseUrl}${castsDetails.external_ids[item.id]}`}
                                        target="_blank"
                                        className='bg-semi-dark-blue rounded-full p-2 min-w-max text-white'>
                                        {item.icon}
                                    </Button>
                                )
                            ))
                        )}
                    </Stack>
                    {isLoading ? (
                        <>
                            <Skeleton variant='text' animation="wave" className='bg-semi-dark-blue w-1/3 h-12' />
                            <Stack className='max-laptop:flex-row max-laptop:gap-4 max-laptop:flex-wrap mt-5'>
                                {Array.from({ length: 5 }).map(() => (
                                    <Box key={uuidv4()}>
                                        <Skeleton variant='text' animation="wave" className='bg-semi-dark-blue w-2/3 h-8 max-laptop:w-36' />
                                        <Skeleton variant='text' animation="wave" className='bg-semi-dark-blue w-2/4 h-8 max-laptop:w-36' />
                                    </Box>
                                ))}
                            </Stack>
                        </>
                    ) : (
                        <>
                            <Typography className='text-2xl mt-5'>Personal Info</Typography>
                            <Stack className='max-laptop:flex-row max-laptop:gap-4 max-laptop:flex-wrap'>
                                <Box mt={'1rem'}>
                                    <Typography className='text-base font-bold'>Known For</Typography>
                                    <Typography className='text-base'>{castsDetails?.known_for_department}</Typography>
                                </Box>
                                <Box mt={'1rem'}>
                                    <Typography className='text-base font-bold'>Known Credits</Typography>
                                    <Typography className='text-base'>{knownCredits}</Typography>
                                </Box>
                                <Box mt={'1rem'}>
                                    <Typography className='text-base font-bold'>Gender</Typography>
                                    <Typography className='text-base'>{gender}</Typography>
                                </Box>
                                <Box mt={'1rem'}>
                                    <Typography className='text-base font-bold'>Birthday</Typography>
                                    <Typography className='text-base'>{moment(castsDetails?.birthday).format('MMMM Do, YYYY')} ({age} years old)</Typography>
                                </Box>
                                <Box mt={'1rem'}>
                                    <Typography className='text-base font-bold'>Place of Birth</Typography>
                                    <Typography className='text-base'>{castsDetails?.place_of_birth}</Typography>
                                </Box>
                            </Stack>
                        </>
                    )}
                </Box>
                <Box flex={1} overflow={'hidden'}>
                    {isLoading ? (
                        <>
                            <Skeleton variant='text' animation="wave" className='bg-semi-dark-blue w-2/5 h-16' />
                            <Skeleton variant='text' animation="wave" className='bg-semi-dark-blue w-1/3 h-12 mt-5' />
                            <Skeleton variant='rectangular' animation="wave" className='bg-semi-dark-blue w-full h-40 ' />
                        </>
                    ) : (
                        <>
                            <Typography className='text-3xl'>{castsDetails?.name}</Typography>
                            <Box mt={'1.5rem'}>
                                <Typography className='text-2xl-light'>Biography</Typography>
                                <Typography className='text-base mt-1'>{castsDetails?.biography}</Typography>
                            </Box>
                        </>
                    )}
                    <Box width={'100%'}>
                        {isLoading ? (
                            <SwipersSkeletons />
                        ) : (
                            castsDetails?.combined_credits && castsDetails?.combined_credits.cast.length > 0 && (
                                <Swipers items={castsDetails?.combined_credits.cast.filter(item => item.vote_average > 7)} title={'Known For'} />
                            )
                        )}
                    </Box>
                    <Box width={'100%'}>
                        {isLoading ? (
                            <SwipersSkeletons />
                        ) : (
                            castsDetails?.combined_credits && castsDetails?.combined_credits.cast.length > 0 && (
                                <Swipers items={castsDetails?.combined_credits.cast} title={'Acting'} />
                            )
                        )}
                    </Box>
                </Box>
            </Stack>
        </Stack>
    );
};

export default CastsDetails;
