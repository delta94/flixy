import { Genre } from "./Genre";
import { ProductionCompany } from "./ProductionCompany";

export default interface Movie {
  adult?: boolean;
  backdrop_path?: string;
  id: number | string;
  original_language?: string;
  original_title?: string;
  original_name?: string;
  overview?: string;
  popularity?: number;
  poster_path?: string;
  release_date?: string;
  first_air_date?: string;
  title?: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
  genres?: Genre[];
  selected?: boolean;
  hide?: boolean;
  loadingCard?: boolean;
  runtime?: number;
  imdb_id?: string;
  production_companies?: ProductionCompany[];
}