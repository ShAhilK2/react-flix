export type Movies = {
    id: number;
    title: string;
    poster_path : string
}
export type MovieListPros = {
    
    movies: Movies[];
    level : number
}

export type Number = {
    number : number
}