import React from 'react'

const PostBody = ({ caption, image}) => {
  return (
    <div>
        <p>{ caption }</p>
          { image  && <img src= { image } className="w-full h-100 object-cover mt-5" alt="" />}
    </div>
  )
}

export default PostBody