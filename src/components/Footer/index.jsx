import React from 'react'
import './main.css'
// import { useState , useEffect } from 'react'

export default function Footer() {
  // const [date,setDate] = useState(new Date())
  // useEffect(() => {
  //   const id = setInterval(() => {
  //     setDate(new Date())
  //   }, 1000);
  //   return () => {
  //     clearInterval(id)
  //   }
  // }, [])
  
  return (
    <footer className="footer">
        <div className="container">
            <div className="footer_content">
                <p className="footer_content_text">
                    Created by @Farid
                    {/* {date.toString()} */}
                </p>
            </div>
        </div>
    </footer>
  )
}
