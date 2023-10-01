import React from 'react'
import './main.css'
import { useState } from 'react'
import Modal from '../Modal'
import { useMovieContext } from '../MovieContext'

export default function Header( { searchVal , handleInputChange, fetchMovies} ) {
    const [isOpen , setIsOpen] = useState(false)
    const [isWishOpen , setIsWishOpen] = useState(false)
    const [moviesObject , setMoviesObject] = useState({
        title: '',
        desc: '',
        imdbLink: '',
        imageLink: ''
    })
    const { wishList, setMovies, movies } = useMovieContext()
    
    const handleCloseModal = () => {
        document.body.classList.remove('modal-open');
        setIsOpen(false)
        setIsWishOpen(false)
    }

    const handleOpenModal = (openModal) => {
        document.body.classList.add('modal-open');
        openModal(true)
        // setIsWishOpen(true)
    }
    
    const postMovie = async (data) => {
        try {
            const response = await fetch(`http://localhost:3000/movies`,{
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                'Content-Type': 'application/json',
                },
            });
            if (response.status === 201) {
                fetchMovies()
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmitModal = (e) => {
        e.preventDefault();
        postMovie(moviesObject)
        setMoviesObject({
            title: '',
            desc: '',
            imdbLink: '',
            imageLink: ''
        })

        handleCloseModal();
    }

    const handleChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setMoviesObject((prev) => ({
            ...prev,
            [name] : value
        }))
    }

    // console.log(movies, movies.filter(el => wishList.includes(el.id)), wishList)
    
    return (
        <>
            <header className="header">
                <div className="container">
                    <div className="header_content">
                        <a href="/" className="header_logo">
                            Site <span>Logo</span>
                        </a>
                        <div className="search">
                            <div className="search_content">
                                <input  type="search" 
                                        className="input" 
                                        id="search" 
                                        placeholder="Search film..." 
                                        onChange={handleInputChange} 
                                        value={searchVal} />
                                <button className="search_btn">
                                    <svg xmlns="http://www.w3.org/2000/svg" id="Search" width="13" height="13" viewBox="0 0 13 13">
                                        <path id="Path_2" data-name="Path 2" d="M1.625,5.688A4.023,4.023,0,0,1,5.688,1.625,4.023,4.023,0,0,1,9.75,5.688,4.023,4.023,0,0,1,5.688,9.75,4.023,4.023,0,0,1,1.625,5.688Zm9.994,7.069a.8.8,0,0,0,1.137-1.137L10.238,9.1a5.563,5.563,0,0,0,1.137-3.413A5.652,5.652,0,0,0,5.688,0,5.652,5.652,0,0,0,0,5.688a5.652,5.652,0,0,0,5.688,5.688A5.563,5.563,0,0,0,9.1,10.238Z" fill="#000"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <ul className="navbar">
                            <li className="navbar_item">
                                <button className="btn create_btn" onClick={() => handleOpenModal(setIsWishOpen)}>
                                    ❤
                                    <span className='wishCount'>{wishList.length}</span>
                                </button>
                            </li>
                            <li className="navbar_item">
                                <button className="btn create_btn" onClick={() => handleOpenModal(setIsOpen)}>
                                    Create Film
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
            <Modal isOpen={isOpen} >
                <form onSubmit={handleSubmitModal} className="modal_form">
                    <div className="form_group">
                        <label htmlFor="title" className="form_group_label">Title:</label>
                        <input  type="text" 
                                className="form_group_input input" 
                                name="title" 
                                id="title" 
                                placeholder="Title" 
                                required="" 
                                value={moviesObject.title}
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
                                required="" 
                                value={moviesObject.desc}
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
                                required="" 
                                value={moviesObject.imdbLink}
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
                                required="" 
                                value={moviesObject.imageLink}
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
            <Modal isOpen={isWishOpen}>
                <div className='modal_content_closeBtn'>
                    <button className='btn create_btn' onClick={handleCloseModal}>
                        &#128473;
                    </button>
                </div>
                <div className="movies_content" id="movies_content">
                    {
                        movies.filter(el => wishList.includes(el.id)).map((favMovie) => {
                            return (
                                <div key={favMovie.id} className="movies_content_item">
                                    <div className="movies_content_item_cont">
                                        <div className="movies_content_item_image">
                                            <div className="box pd_t150">
                                                <div className="box_item">
                                                    <img className="movies_content_item_image--img" src={favMovie.imageLink} alt={favMovie.title} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='movies_content_item_cont_bottom'>
                                            <div className="movies_content_item_title">
                                                {favMovie.title}
                                            </div>
                                        </div>
                                        <div className="overlay"></div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </Modal>
        </>
    )
}
