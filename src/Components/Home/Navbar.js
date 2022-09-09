import React from 'react'
import "../Styles/navbar.css"
import { Link } from 'react-router-dom'
export default function Navbar() {

  return (
    <nav>
      <div className="container-fluid bg-danger fixed-top gridapply">
        <div className='main-icon'>
          <h1 className="text-center rounded-circle bg-light text-danger px-2 my-auto my-2">e!</h1>
        </div>
        <div className='buttongroup my-auto'>
          <button>
            <Link className='link text-light' to="/login">sign in</Link>
          </button>
          <button>
            <Link className='link text-light' to="/signup">Create account</Link>
          </button>
        </div>
      </div>
    </nav>

  )

}
