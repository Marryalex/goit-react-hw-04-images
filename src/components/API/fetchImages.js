import axios from 'axios';

// export async function fetchImages(query, page) {
//   const BASE_URL = `https://pixabay.com/api/`;
//   const KEY = `30202801-bffdf6b9ad8f589dd6bf8dac5`;
//   const options = `image_type=photo&orientation=horizontal&per_page=12`;

//   try {
//     const resolve = await axios.get(
//       `${BASE_URL}?key=${KEY}&q=${query}&${options}&page=${page}`
//     );
//     return resolve.data;
//   } catch (error) {
//     console.log(error);
//   }
// }


const instance = axios.create({
    baseURL: 'https://pixabay.com/api/',
    params: {
        per_page: 12,
        key: '30202801-bffdf6b9ad8f589dd6bf8dac5',
        image_type: 'photo',
        orientation: 'horizontal',
    }
});

export const getPhoto = async(page = 1, q) => {
    const {data} = await instance.get("/", {
        params: {
            page,
            q,
        }
    });
    return data;
}