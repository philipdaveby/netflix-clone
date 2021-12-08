import React, { useState, useEffect } from 'react';
import './Row.css'
import axios from '../../axios'
import YouTube from 'react-youtube';
import { MovieType } from '../../../types/types';
const movieTrailer = require('movie-trailer');

interface Props {
    title: string,
    fetchUrl: string,
    isLargeRow?: boolean
}

const baseUrl = 'https://image.tmdb.org/t/p/original/'

export const Row = ({ title, fetchUrl, isLargeRow }: Props) => {
    const [movies, setMovies] = useState<Array<MovieType>>([]);
    const [trailerUrl, setTrailerUrl] = useState<string>('')

    useEffect(() => {
        const fetchData = async () => {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl]);

    const handleClick = (movie: MovieType) => {
        if (trailerUrl) {
            setTrailerUrl('');
        } else {
            movieTrailer(movie?.name || movie?.title || movie?.original_name || '')
                .then((url: string) => {
                    const urlParams = new URLSearchParams(new URL(url).search)
                    const urlParamsTrailer = urlParams.get('v');
                    if (urlParamsTrailer === null) return
                    setTrailerUrl(urlParamsTrailer)
                })
                .catch((err:any) => console.log(err))
        }
    }

    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row__posters">
                {movies.map(movie => (
                     <img 
                        className={`row__poster ${isLargeRow ? 'row__posterLarge' : ''}`}
                        onClick={() => handleClick(movie)}
                        key={movie.id} 
                        src={`${baseUrl}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} 
                        alt={movie.name}
                    />
                ))}
            </div>
                    {trailerUrl && <YouTube videoId={trailerUrl} opts={{height: '390', width: '100%', playerVars: {autoplay: 1}}}/>}
        </div>
    )
}
