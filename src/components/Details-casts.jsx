import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules'
import { Card, CardContent, CardMedia, Typography, Skeleton } from '@mui/material';

const DetailsCasts = ({ casts }) => {
    return (
        <>
            {casts && casts.length > 0 && (
                <>
                    <Typography className='text-2xl mt-4'>Cast</Typography>
                    <Swiper
                        slidesPerView={'auto'}
                        spaceBetween={20}
                        navigation={true}
                        modules={[Navigation]}
                        className="mt-4 custom-swiper"
                        grabCursor={true}
                    >
                        {casts.map(item => (
                            <SwiperSlide key={item.id} className='w-max'>
                                <Card className='bg-transparent rounded-lg w-40 shadow-none'>
                                    {item.profile_path ? (
                                        <CardMedia
                                            component="img"
                                            height="100px"
                                            image={`http://image.tmdb.org/t/p/original${item.profile_path}`}
                                            alt={item.name}
                                            className='w-40 h-[10.875rem] object-cover rounded-lg'
                                        />
                                    ) : (
                                        <Skeleton animation="wave" className="h-[10.875rem] bg-semi-dark-blue" variant="rectangular" />
                                    )}
                                    <CardContent className='p-0 mt-2 w-full'>
                                        {item.name && <Typography color="white" className='text-xl'>{item.name}</Typography>}
                                        {item.character && <Typography color="white" className='text-base opacity-75'>{item.character.length > 35 ? item.character.slice(0, 30) : item.character}</Typography>}
                                    </CardContent>

                                </Card>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </>
            )}

        </>
    )
}

export default DetailsCasts