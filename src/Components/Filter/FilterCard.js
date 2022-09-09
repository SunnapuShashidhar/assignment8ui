import React from 'react'
import { v4 as uuid } from "uuid"
import { Link } from "react-router-dom"
import "./filterCard.css"

function FilterCard(props) {
  const { item } = props;
  return (
    <div key={uuid()} className="card rounded-0 shadow w-100 mt-3 py-2">
      <div className="card-body">
        <div className="row">
          <div className="col-4">
            <img className='card-img img-fluid' src={item.image} />
          </div>
          <div className="col-8"><div className="card-title">{item.name}</div>
            <div className="item">FORT</div>
            <div className='dy-item text-secondary'>{`${item.locality},${item.city}`}</div></div>
        </div>
        <hr />
        <div className="">
          <div className="items">
            <span className='item'>CUISINES :</span><span className='dy-item text-secondary'>{item.cuisine}</span>
          </div>
          <div className="items">
            <span className='item'>COST FOR TWO:</span><span className='dy-item text-secondary'>{`₹${item.min_price}`}</span>
          </div>
        </div>
        <Link to={`/details/${item._id}`} key={item._id} className="stretched-link">
        </Link>
      </div>
    </div>

  )
}

export default FilterCard