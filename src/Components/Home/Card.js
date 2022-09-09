import React from 'react'
import { v4 as uuid } from "uuid"
import { Link } from "react-router-dom"


function Card(props) {
  const { item } = props;
  return (
    <div key={uuid()} className="col-md-6 col-lg-4 col-sm-12 mt-2">
      <div className="card rounded-0 shadow">
        <div className="card-body">
          <div className="row">
            <div className="col-4 ">
              {/* <img src={process.env.PUBLIC_URL+{image}} alt="" /> */}
              <img className='card-img img-fluid' src={item.image} />
            </div>

            <div className="col-8"><div className="card-title">{item.name}</div><div>{item.content}</div></div>
          </div>
          <Link to={`/filter/${item._id}`} key={uuid()} className="stretched-link">
          </Link>

        </div>
      </div>

    </div>
  )
}

export default Card