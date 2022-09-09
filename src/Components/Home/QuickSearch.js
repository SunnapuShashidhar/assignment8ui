import React from 'react'
import { Consumer } from '../../context'
import "../Styles/QuickSearch.css"
import Card from './Card';
import { v4 as uuid } from "uuid"
import { Link } from "react-router-dom"

function QuickSearch() {
  return (
    <Consumer>
      {(value) => {
        const { mealtype } = value;
        return (
          <div className='container QuickSearch my-5 '>
            <h1 className="">Quick Search</h1>
            <p className="description">Discover restarents by type of meal</p>
            <div className=''>
              <div className="row">


                {mealtype && mealtype.map((item) => {
                  return <Card item={item} />
                })
                }

              </div>
              <div className="d-flex justify-content-end">
                <Link to={`/filter`} className="text-dark filterLink">
                  Filter Page
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-2 h-2 svg">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>

                </Link>
              </div>
            </div>

          </div>
        )
      }}
    </Consumer>
  )

}

export default QuickSearch