import * as React from 'react';
import { useApolloClient, DocumentNode } from '@apollo/client';
import Slider from '../../components/media-slider';
import { popular, topRated, upcoming, nowPlaying } from '../../gqls/movies';
import Movie from '../../models/Media';
import { LoadingState, SliderType } from '../../models/Slider';
import { nanoid } from 'nanoid';
import { Category, MediaContainer } from '../models';
const dedupe = require('dedupe');

const getQuery: (c: Category) => DocumentNode = (category) => {
  switch (category) {
    case Category.POPULAR:
      return popular;
    case Category.TOP_RATED:
      return topRated;
    case Category.UP_COMING:
      return upcoming;
    case Category.NOW_PLAYING:
      return nowPlaying;
  }
};

const MovieContainer: React.FunctionComponent<MediaContainer> = ({
  category,
  title,
}) => {
  const client = useApolloClient();
  const [movieData, setMovieData] = React.useState<{
    results: Movie[];
    total_results?: number;
  }>({
    results: [],
    total_results: 0,
  });
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    getMovies(1);
  }, []);

  const getMovies = async (page: number) => {
    setLoading(true);
    const { data } = await client.query({
      query: getQuery(category),
      variables: {
        lang: 'en-US',
        page,
      },
      fetchPolicy: 'cache-first',
    });

    if (data) {
      let newData = [] as Movie[];
      if (movieData.results) {
        let newResults = [];
        if (category === Category.POPULAR) {
          newResults = data.getPopular;
        } else if (category === Category.TOP_RATED) {
          newResults = data.getTopRated;
        } else if (category === Category.UP_COMING) {
          newResults = data.getUpcoming;
        } else if (category === Category.NOW_PLAYING) {
          newResults = data.getNowPlaying;
        }
        newData = [...movieData.results, ...newResults.results];
        const dedupedData = dedupe(
          newData,
          (value: Movie) => value.id
        ) as Movie[];
        setMovieData({
          results: dedupedData,
          total_results: newResults.total_results,
        });
      }
    }

    setLoading(false);
  };

  const handleFetchMore = (page: number) => getMovies(page);

  let view = null;

  if (loading) {
    view = (
      <Slider
        movies={[]}
        title={title}
        fetchMore={handleFetchMore}
        sliderType={SliderType.movies}
        totalResults={0}
        loadingState={LoadingState.LOADING}
        id={nanoid()}
      ></Slider>
    );
  } else if (movieData.results.length) {
    view = (
      <Slider
        movies={
          movieData
            ? movieData.results.map((item: any) =>
                Object.assign({}, item, {
                  hide: false,
                  selected: false,
                })
              )
            : []
        }
        title={title}
        fetchMore={handleFetchMore}
        totalResults={movieData.total_results ? movieData.total_results : 0}
        loadingState={LoadingState.LOADED}
        id={nanoid()}
        sliderType={SliderType.movies}
      ></Slider>
    );
  }

  return view;
};

export default MovieContainer;
