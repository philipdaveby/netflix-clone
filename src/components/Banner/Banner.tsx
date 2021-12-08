import React, { useState, useEffect } from 'react'
import axios from '../../axios'
import requests from '../../requests'
import { MovieType } from '../../../types/types'
import './Banner.css'

interface Props {
    
}

export const Banner = (props: Props) => {
    const [movie, setMovie] = useState<MovieType>();

    useEffect(() => {
        const fetchData = async () => {
            const request = await axios.get(requests.fetchNetflixOriginals);
            setMovie(request.data.results[Math.floor(Math.random() * request.data.results.length)])
            return request;
        }
        fetchData();
    }, []);

    const truncate = (string: string, number: number) => {
        return string?.length > number ? string.substr(0, number - 1) + '...' : string;
    }

    return (
        <header className='banner'
            style={{
                backgroundSize: 'cover',
                backgroundImage: `url(
                    "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
                )`,
                backgroundPosition: 'center center'
            }}
        >
            <div className='banner__contents'>
                <h1 className='banner__title'>{movie?.title || movie?.name || movie?.original_name}</h1>

                <div className="banner__buttons">
                    <button className="banner__button">Play</button>
                    <button className="banner__button">My List</button>
                </div>

                <h1 className="banner__description">{movie && truncate(movie.overview, 150)}</h1>
            </div>

            <div className='banner__fadeBottom'></div>
        </header>
    )
}
