import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSinglePostApi } from '../Services/PostsServices';
import Post from './../Components/Post/index';

const PostDetailsPage = () => {
  const [post, setpost] = useState(null);
  const  {id}  = useParams();

  
  async function getSinglePost() {
    const response = await getSinglePostApi(id)

    if (response.message == 'success') {
      setpost(response.post)
    }
    
  }

  useEffect(() => {
    getSinglePost();
  }, [])

  return (
    <div className='my-10'>
      {post && <Post posts={post} />}
    </div>
  )
}

export default PostDetailsPage