import React, { createContext, useContext, useState } from 'react';

const MovieContext = createContext();


export default function MovieProvider({children}) {

    const [wishList , setWishList] = useState([]);
    const [movies , setMovies] = useState([]);

    const toggleMovieToWishList = (id) => {
        let array = [...wishList]
        if (array.includes(id)) {
            array.splice(array.indexOf(id), 1)
        }
        else {
            array.push(id)
        }
        setWishList(array)
    }

    return (
        <>
            <MovieContext.Provider value={{wishList , toggleMovieToWishList, setMovies, movies}}>
                {children}
            </MovieContext.Provider>
        </>
    )
}


export function useMovieContext() {
    return useContext(MovieContext)
}