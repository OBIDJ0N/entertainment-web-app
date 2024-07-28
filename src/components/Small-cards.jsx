import { CardContent, CardCover } from "@mui/joy";
import { Card, Box, IconButton, Typography, Stack, Skeleton } from "@mui/material";
import { play } from '../constants/';
import { useNavigate } from "react-router-dom";
import useBookmark from "../hook/useBookmark";

const SmallCards = ({ item }) => {
  const navigate = useNavigate()
  const date = new Date(item?.release_date ? item.release_date : item.first_air_date).getFullYear().toString();
  const { isBookmarked, handleBookmark } = useBookmark(item);

  const playHandler = () => {
    const type = item.video === false ? 'movie' : 'tv'
    navigate(`/detail/${type}/${item.id}`)
  }

  return (
    <Card key={item.id} className="bg-transparent rounded-lg text-white shadow-none">
      <Box className='w-full h-[10.875rem] max-tablet:h-[8.75rem] max-phone:h-[6.875rem] group relative'>
        <CardCover className="-z-10 h-[10.875rem] max-tablet:h-[8.75rem] max-phone:h-[6.875rem]">
          {item?.backdrop_path ? <img src={`http://image.tmdb.org/t/p/original${item.backdrop_path}`} alt="movie-img" className="rounded-lg w-full h-full object-cover" /> : <Skeleton animation="wave" className="h-[10.875rem] bg-semi-dark-blue max-tablet:h-[8.75rem] max-phone:h-[6.875rem]" variant="rectangular" />}
        </CardCover>
        <CardCover className="group-hover:bg-dark-blue group-hover:bg-opacity-50 transition-all max-tablet:h-[8.75rem] max-phone:h-[6.875rem]" />
        <CardContent>
          <IconButton className="group/bookmark ms-auto py-[9px] px-[10px] bg-dark-blue bg-opacity-50 rounded-full mr-6 mt-4 max-laptop:mr-4 hover:bg-white transition-all" onClick={handleBookmark}>
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
                className={`group-hover/bookmark:stroke-dark-blue transition-all ${isBookmarked && 'fill-white'}`}
              />
            </svg>
          </IconButton>
          <Box onClick={playHandler} className="cursor-pointer absolute top-[40%] left-1/2 transform -translate-x-1/2 bg-white bg-opacity-25 mx-auto p-[9px] pr-6 gap-5 rounded-[1.75rem] group-hover:flex items-center hidden max-desktop:gap-3 max-laptop:gap-3 max-tablet:gap-2 custom-play">
            <img src={play} alt="play" className="max-desktop:w-7 max-laptop:w-[26px] max-tablet:w-6" />
            <span className="text-xl max-desktop:text-[1rem] ">Play</span>
          </Box>
        </CardContent>
      </Box>
      <Box className="mt-2">
        <Stack display={'flex'} flexDirection={'row'} alignItems={'center'} fontSize={'13px'}>
          <Typography className="text-sm opacity-75 max-phone:text-[11px]">{date}</Typography>
          <span className="mx-2 opacity-75">·</span>
          {item.video === false ? (
            <svg width="12" height="12" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M16.9556 0H3.04444C1.36304 0 0 1.36304 0 3.04444V16.9556C0 18.637 1.36304 20 3.04444 20H16.9556C17.763 20 18.5374 19.6792 19.1083 19.1083C19.6792 18.5374 20 17.763 20 16.9556V3.04444C20 2.23701 19.6792 1.46264 19.1083 0.891697C18.5374 0.320753 17.763 0 16.9556 0ZM4 9H2V7H4V9ZM4 11H2V13H4V11ZM18 9H16V7H18V9ZM18 11H16V13H18V11ZM18 2.74V4H16V2H17.26C17.4563 2 17.6445 2.07796 17.7833 2.21674C17.922 2.35552 18 2.54374 18 2.74ZM4 2H2.74C2.54374 2 2.35552 2.07796 2.21674 2.21674C2.07796 2.35552 2 2.54374 2 2.74V4H4V2ZM2 17.26V16H4V18H2.74C2.54374 18 2.35552 17.922 2.21674 17.7833C2.07796 17.6445 2 17.4563 2 17.26ZM17.26 18C17.6687 18 18 17.6687 18 17.26V16H16V18H17.26Z" fill="#fff" opacity={'.75'} />
            </svg>
          ) :
            <svg width="12" height="12" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M9.08 4.48109H20V20H0V4.48109H4.92L2.22 1.20272L3.78 0.029098L7 3.90883L10.22 0L11.78 1.20272L9.08 4.48109ZM2 6.42095V18.0601H12V6.42095H2ZM17 14.1804H15V12.2405H17V14.1804ZM15 10.3007H17V8.36082H15V10.3007Z" fill="#fff" opacity={'.75'} />
            </svg>
          }
          <span className="mx-2 opacity-75">·</span>
          <Typography className="opacity-75 text-sm max-phone:text-[11px]">{item.video === false ? 'Movie' : 'TV Series '}</Typography>
        </Stack>
        <Typography className="text-xl max-phone:text-base max-phone:font-bold">{(item.title || item.name).length >= 30 ? (item.title || item.name).slice(0,25) + '...' : (item.title || item.name)}</Typography>
      </Box>
    </Card>
  );
};

export default SmallCards;
