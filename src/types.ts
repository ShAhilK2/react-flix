export type Movies = {
    id: number;
    title: string;
    poster_path : string | null | undefined
}
export type MovieListPros = {
    
    movies: Movies[];
   
}

export type Number = {
    number : number
}

export type TMBDRESPONSE = {
    page: number;
    results: Movies[];
    total_pages: number;
    total_results: number;
}