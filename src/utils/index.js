import axios from "axios";
import useAxiosSecure from "../hooks/useAxiosSecure";

export const imageUpload = async (imageData) => {
  const formData = new FormData();
  formData.append("image", imageData);

  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
    formData
  );
  return data?.data?.display_url;
};

// export const saveOrUpdateUser = async (userData) => {
//   const { data } = await useAxiosSecure.post(
//     `${import.meta.env.VITE_API_URL}/users`,
//     userData
//   );
//   return data;
// };
export const useSaveOrUpdateUser = () => {
  const axiosSecure = useAxiosSecure();

  const saveOrUpdateUser = async (userData) => {
    const { data } = await axiosSecure.post(
      `${import.meta.env.VITE_API_URL}/users`,
      userData
    );
    return data;
  };

  return saveOrUpdateUser;
};
