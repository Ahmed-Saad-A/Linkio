import axios from "axios";
import Cookies from "js-cookie";

const baseUrl = "https://linked-posts.routemisr.com/";

export function getAllPostsApi() {
  return axios.get(baseUrl + "posts", {
      headers: {
        token: Cookies.get("token"),
      },
      params: {
        sort: '-createdAt'
      }
    });

  // try {
  //   const { data } = await axios.get(baseUrl + "posts", {
  //     headers: {
  //       token: Cookies.get("token"),
  //     },
  //     params: {
  //       sort: '-createdAt'
  //     }
  //   });

  //   return data;
  // } catch (error) {
  //   return error.response ? error.response.data.error : error.message;
  // }
}

export async function addPostApi (formData){
  try {
    const { data } = await axios.post(baseUrl + 'posts', formData, {
      headers: {
        token: Cookies.get('token')
      }
    });

    return data;
  } catch (error) {
     return error.response ? error.response.data.error : error.message;
  }
}

export async function getSinglePostApi(postId) {
  try {
    const { data  } = await axios.get(baseUrl + "posts/" + postId, {
      headers: {
        token: Cookies.get("token"),
      },
    });
    return data ;
  } catch (error) {
    return error.response ? error.response.data.error : error.message;
  }
}

export async function deletePostApi(postId) {
  try {
    const { data  } = await axios.delete(baseUrl + "posts/" + postId, {
      headers: {
        token: Cookies.get("token"),
      },
    });
    return data ;
  } catch (error) {
    return error.response ? error.response.data.error : error.message;
  }
}

export async function updatePostApi (formData,postId){
  try {
    const { data } = await axios.put(baseUrl + 'posts/' + postId, formData, {
      headers: {
        token: Cookies.get('token')
      }
    });

    return data;
  } catch (error) {
     return error.response ? error.response.data.error : error.message;
  }
}