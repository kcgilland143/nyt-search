import React from "react";
import { Link } from "react-router-dom"

const Article = props => {
  return (
  <div>
    <Link to={"/articles/" + props._id}>
      <strong>
        {props.headline}
        <br/> 
        {props.byline}
      </strong>
    </Link>
    <br/>
    {props.snippet}
    {props.children}
  </div>
)}

export default Article;