import axios from "axios";
import Cookies from "js-cookie";
const baseUrl = "https://linked-posts.routemisr.com/";

export async function uploadUserPhoto(formData) {
  try {
    const { data } = await axios.put(baseUrl + "users/upload-photo", formData, {
      headers: {
        token: Cookies.get("token"),
      },
    });
    return data;
  } catch (error) {
    return error.response ? error.response.data.error : error.message;
  }
}

export async function changePassword(password, newPassword) {
  try {
    const { data } = await axios.patch(
      baseUrl + "users/change-password",
      { password, newPassword },
      {
        headers: {
          token: Cookies.get("token"),
        },
      }
    );
    return data;
  } catch (error) {
    return error.response ? error.response.data.error : error.message;
  }
}


export async function getUserPostsApi(userId) {
  try {
    const { data } = await axios.get(baseUrl + "users/" + userId + "/posts", {
      headers: {
        token: Cookies.get("token"),
      },
    });
    return data;
  } catch (error) {
    console.error("Error fetching user posts:", error);
    return { posts: [] };
  }
}