import axios from "axios";
import  Cookies  from 'js-cookie';

const baseUrl = 'https://linked-posts.routemisr.com/';

export async function addComment(commentContent, postId){
    try {
        const { data } = await axios.post(baseUrl + 'comments', {
            content: commentContent,
            post:postId
        },
        {
            headers: {
                token: Cookies.get('token')
            }
        })
        return data;
    } catch (error) 
    {
        return error.response ? error.response.data.error : error.message;
    }
}


export async function deleteCommentApi(postId) {
  try {
    const { data  } = await axios.delete(baseUrl + "comments/" + postId, {
      headers: {
        token: Cookies.get("token"),
      },
    });
    return data ;
  } catch (error) {
    return error.response ? error.response.data.error : error.message;
  }
}

export async function updateCommentApi(postId, editedContent) {
  try {
    const { data  } = await axios.put(baseUrl + "comments/" + postId, {
      content: editedContent
    }, {
      headers: {
        token: Cookies.get("token"),
      },
    });
    return data ;
  } catch (error) {
    return error.response ? error.response.data.error : error.message;
  }
}