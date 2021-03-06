import { Resolver, Query, Arg } from "type-graphql";
import fetch from "node-fetch";
import MovieResult from './../types/MovieResult';
import { MovieDetail } from "../types/MovieDetail";
import { Credits } from "../types/Credits";
import ReviewResult from "../types/ReviewResult";
import Images from "../types/Images";
import VideoResult from "../types/VideoResult";

@Resolver(MovieResult)
export default class MovieResolver {

  url: string;
  key: string;

  constructor() {
    this.url = process.env.api_url as string;
    this.key = process.env.api_key as string;
  }

  @Query(returns => MovieResult)
  async getPopular(
    @Arg("lang") lang: string,
    @Arg("page") page: number
  ) {
    try {
      const { key, url } = this;
      const response = await fetch(`${url}movie/popular?api_key=${key}&language=${lang}&page=${page}`);

      const data = await response.json();

      return data;

    } catch (error) {
      console.log(error);
    }
  }

  @Query(returns => MovieResult)
  async getTopRated(
    @Arg("lang") lang: string,
    @Arg("page") page: number
  ) {
    try {
      const { key, url } = this;
      const response = await fetch(`${url}movie/top_rated?api_key=${key}&language=${lang}&page=${page}`);

      const data = await response.json();

      return data;

    } catch (error) {
      console.log(error);
    }
  }

  @Query(returns => MovieResult)
  async getUpcoming(
    @Arg("lang") lang: string,
    @Arg("page") page: number
  ) {
    try {
      const { key, url } = this;
      const response = await fetch(`${url}movie/upcoming?api_key=${key}&language=${lang}&page=${page}`);

      const data = await response.json();

      return data;

    } catch (error) {
      console.log(error);
    }
  }

  @Query(returns => MovieResult)
  async getNowPlaying(
    @Arg("lang") lang: string,
    @Arg("page") page: number
  ) {
    try {
      const { key, url } = this;
      const response = await fetch(`${url}movie/now_playing?api_key=${key}&language=${lang}&page=${page}`);

      const data = await response.json();

      return data;

    } catch (error) {
      console.log(error);
    }
  }

  @Query(returns => MovieResult)
  async getRecommendations(
    @Arg("id") id: number,
    @Arg("lang") lang: string,
    @Arg("page") page: number
  ) {
    try {
      const { key, url } = this;
      const response = await fetch(`${url}movie/${id}/recommendations?api_key=${key}&language=${lang}&page=${page}`);

      const data = await response.json();

      return data;

    } catch (error) {
      console.log(error);
    }
  }


  @Query(returns => MovieResult)
  async getSimilar(
    @Arg("id") id: number,
    @Arg("lang") lang: string,
    @Arg("page") page: number
  ) {
    try {
      const { key, url } = this;
      const response = await fetch(`${url}movie/${id}/similar?api_key=${key}&language=${lang}&page=${page}`);

      const data = await response.json();

      return data;

    } catch (error) {
      console.log(error);
    }
  }

  @Query(returns => MovieDetail)
  async getDetails(
    @Arg("movie_id") movie_id: number,
    @Arg("lang") lang: string
  ) {
    try {
      const { key, url } = this;
      const response = await fetch(`${url}movie/${movie_id}?api_key=${key}&language=${lang}`);
      const data = await response.json();

      return data;

    } catch (error) {
      console.log(error);
    }
  }

  @Query(returns => Credits)
  async getCredits(
    @Arg("movie_id") movie_id: number,
  ) {
    try {
      const { key, url } = this;
      const response = await fetch(`${url}movie/${movie_id}/credits?api_key=${key}`);

      const data = await response.json();
      return data;

    } catch (error) {
      console.log(error);
    }
  }

  @Query(returns => ReviewResult)
  async getReviews(
    @Arg("movie_id") movie_id: number,
    @Arg("page") page: number
  ) {
    try {
      const { key, url } = this;
      const response = await fetch(`${url}movie/${movie_id}/reviews?api_key=${key}&page=${page}`);
      const data = await response.json();

      return data;

    } catch (error) {
      console.log(error);
    }
  }

  @Query(returns => Images)
  async getImages(
    @Arg("movie_id") movie_id: number,
    @Arg("lang") lang: string
  ) {
    try {
      const { key, url } = this;
      const response = await fetch(`${url}movie/${movie_id}/images?api_key=${key}`);
      const data = await response.json();

      return data;

    } catch (error) {
      console.log(error);
    }
  }

  @Query(returns => MovieResult)
  async searchMovies(
    @Arg("query") query: string,
    @Arg("lang") lang: string,
    @Arg("page") page: number
  ) {
    try {
      const { key, url } = this;
      const response = await fetch(`${url}search/movie?query=${query}&api_key=${key}&language=${lang}&page=${page}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  @Query(returns => VideoResult)
  async getVideos(
    @Arg("movie_id") movie_id: number,
    @Arg("lang") lang: string
  ) {
    try {
      const { key, url } = this;
      const response = await fetch(`${url}movie/${movie_id}/videos?api_key=${key}`);
      const data = await response.json();

      return data;

    } catch (error) {
      console.log(error);
    }
  }



}
