
import React from 'react'

const Newsitem =(props)=> {
 
  
   
    let {title,description,imageurl,newsurl,date,author,source} = props;
    return (
      <div className='my-3'>
        <div class="card" >
          <div style={{
            display:'flex',
            justifyContent:'flex-end',
            position:'absolute',
            right:'0'
          }}>
        <span class="badge rounded-pill bg-danger" > {source} </span>
  </div>
      <img src={!imageurl?"https://images.indianexpress.com/2022/03/hijab-ban-1.jpeg":imageurl} class="card-img-top" alt="..."/>
      <div class="card-body">
        <h5 class="card-title">{title} </h5>
        <p class="card-text">{description} </p>
        <p class="card-text"><small className="text-muted">By {author?author:"Unknown"} on {new Date(date).toGMTString()}</small></p>
        <a href={newsurl} target="_blank" class="btn btn-sm btn-dark">Read More</a>
      </div>
    </div>
    </div>
    )
  
}

export default Newsitem