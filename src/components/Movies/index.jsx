import React, { createContext } from 'react';
import './main.css';
import { useState, useEffect } from 'react';
import Modal from '../Modal';
import ReactPaginate from "react-paginate";
import { useMovieContext } from '../MovieContext';
import Header from '../Header';


export default function Movies() {
    const [isOpen , setIsOpen] = useState(false);
    const [isEditOpen , setIsEditOpen] = useState(false);
    const [selectedItemID , setSelectedItemID] = useState(null);
    const [page, setPage] = useState(0);
    const n = 4;
    const { wishList , toggleMovieToWishList, setMovies, movies } = useMovieContext();

    const handleToggleToWishList = (movie) => {
        toggleMovieToWishList(movie.id)
    }

    const [searchVal , setSearchVal] = useState('')

    const handleInputChange = (e) => {
        const inputVal = e.target.value ;
        setSearchVal(inputVal)
    }

    const [moviesObject , setMoviesObject] = useState({
        title: '',
        desc: '',
        imdbLink: '',
        imageLink: ''
    })
    const handleChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setMoviesObject((prev) => ({
            ...prev,
            [name] : value
        }))
    }

    const fetchMovies = async () => {
        try {
            const response = await fetch(`http://localhost:3000/movies?q=${searchVal}`);
            const moviesData = await response.json();
            if(moviesData?.length){
                setMovies(moviesData);
            }
            if (Math.ceil(moviesData.length / n) - 1 < page) {
                setPage(Math.ceil(moviesData.length / n) - 1)
            }
            else {
                setPage(page)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchMovies()
    }, [searchVal])
  
    const handleCloseModal = () =>{
        setSelectedItemID(null)
        setIsOpen(false)
        setIsEditOpen(false)
    }

    const handleOpenModal = (id , openModal) =>{
        setSelectedItemID(id)
        openModal(true)
    }

    const handleDeleteMovie = async() => {
        handleCloseModal();
        try {
            await fetch(`http://localhost:3000/movies/${selectedItemID}`,{
                method: 'DELETE',
            })
        } catch (error) {
            console.log(error);
        }
        finally {
            fetchMovies()
        }
    }

    const handleEdit = async(e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/movies/${selectedItemID}`,{
                method: 'PUT',
                body: JSON.stringify(moviesObject),
                headers: {
                'Content-Type': 'application/json',
                },
            });
            const postMovieData = await response.json();
            if(postMovieData?.length){
                setMoviesObject(postMovieData)
            }
        } catch (error) {
            console.log(error);
        }
        finally {
            fetchMovies()
            setIsEditOpen(false)
        }
    }
    
    useEffect(() => {
        const fetchMovie = async() => {
            try {
                const response = await fetch(`http://localhost:3000/movies/${selectedItemID}`);
                const movieData = await response.json();
                // console.log(movieData);
                setMoviesObject(movieData)
                
            } catch (error) {
                console.log(error);
            }
        }
        fetchMovie()
    } , [isEditOpen])

    return (
        <>
            <Header searchVal={searchVal} handleInputChange={handleInputChange} fetchMovies={fetchMovies} />
            <section className="movies">
                <div className="container">
                    <div className="section_header">
                        <h1 className="section_header_head">
                            Movies
                        </h1>
                    </div>
                    <div className="movies_content" id="movies_content">
                        {
                            movies && movies.filter((el, index) => (index >= page * n) & (index < (page + 1) * n)).map((movie) => (
                                <div key={movie.id} className="movies_content_item">
                                    <div className="movies_content_item_cont">
                                        <div className="movies_content_item_image">
                                            <div className="box pd_t150">
                                                <div className="box_item">
                                                    <img className="movies_content_item_image--img" src={movie.imageLink} alt="ddddf" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='movies_content_item_cont_bottom'>
                                            <div className="movies_content_item_title">
                                                {movie.title}
                                            </div>
                                            <div className='movies_content_item_cont_bottom_buttons'>
                                                <button className='btn' onClick={() => handleOpenModal(movie.id , setIsOpen)}>Delete</button>
                                                <button className='btn' onClick={() => handleOpenModal(movie.id , setIsEditOpen)}>Edit</button>
                                                <button className='btn' onClick={() => handleToggleToWishList(movie)}>{wishList.includes(movie.id) ? '-wish' : '+wish'}</button>
                                            </div>
                                        </div>
                                        <div className="overlay"></div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <ReactPaginate
                        containerClassName={"pagination"}
                        pageClassName={"page-item"}
                        activeClassName={"active"}
                        onPageChange={(e) => setPage(e.selected)}
                        pageCount={Math.ceil(movies.length / n)}
                        breakLabel="..."
                        previousLabel="< previous"
                        nextLabel="next >"
                    />
                </div>
            </section>
            <Modal isOpen={isOpen} >
                <div className="modal_form">
                    <h2 className='modal_form_title'>
                        Are you sure to delete it?
                    </h2>
                    <div className="form_group form_button">
                        <button
                            className="btn cancel_btn" 
                            onClick={handleCloseModal}
                        >
                            Cancel
                        </button>
                        <button 
                            className="btn seeMore_btn" 
                            onClick={handleDeleteMovie}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </Modal>
            <Modal isOpen={isEditOpen} >
                <form onSubmit={handleEdit} className="modal_form">
                    <div className="form_group">
                        <label htmlFor="title" className="form_group_label">Title:</label>
                        <input  type="text" 
                                className="form_group_input input" 
                                name="title" 
                                id="title" 
                                placeholder="Title" 
                                required
                                defaultValue={moviesObject.title}
                                onChange={handleChange}
                        />
                    </div>
                    <div className="form_group">
                        <label htmlFor="desc" className="form_group_label">Description:</label>
                        <input  type="text" 
                                className="form_group_input input" 
                                name="desc" 
                                id="desc" 
                                placeholder="Description" 
                                required 
                                defaultValue={moviesObject.desc}
                                onChange={handleChange}
                        />
                    </div>
                    <div className="form_group">
                        <label htmlFor="imdbLink" className="form_group_label">IMDB link:</label>
                        <input  type="text" 
                                className="form_group_input input" 
                                name="imdbLink" 
                                id="imdbLink" 
                                placeholder="IMDB link" 
                                required
                                defaultValue={moviesObject.imdbLink}
                                onChange={handleChange}
                        />
                    </div>
                    <div className="form_group">
                        <label htmlFor="imageLink" className="form_group_label">Image link:</label>
                        <input  type="text" 
                                className="form_group_input input" 
                                name="imageLink" 
                                id="imageLink" 
                                placeholder="Image link" 
                                required
                                defaultValue={moviesObject.imageLink}
                                onChange={handleChange}
                        />
                    </div>
                    <div className="form_group form_button">
                        <button
                            className="btn cancel_btn" 
                            onClick={handleCloseModal}
                        >
                            Cancel
                        </button>
                        <button type='submit'
                            className="btn seeMore_btn" 
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    )
}
