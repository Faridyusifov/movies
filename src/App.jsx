
import { useState } from 'react';
import Header from "./components/Header"
import Footer from "./components/Footer"
import Movies from "./components/Movies"
import MovieProvider from './components/MovieContext';
// import Reducer from './components/Reducer';
function App() {


  return (
    <>
      <MovieProvider>
        <Movies />
      </MovieProvider>
      <Footer />
      {/* <Reducer /> */}
    </>
  )
}

export default App
