import { Trending, PopularMovies, PopularTvs, TopRatedMovies, TopRatedTvs } from './'

const Home = () => {
  return (
    <div className='ms-[2.25rem] pb-[3.375rem] max-tablet:ml-0'>
      <Trending />
      <PopularMovies />
      <PopularTvs />
      <TopRatedMovies />
      <TopRatedTvs />
    </div>
  )
}

export default Home