import axios from "axios";

const accessKey = "joqfc39He21fPNU0tY4hV_tqY204moUTdN1omrY90sY";
const url = `https://api.unsplash.com/search/photos`;

export const imagesPerPage = 8;

export default async function fetchImages(query, page = 1) {
  try {
    const response = await axios.get(url, {
      params: {
        query: query,
        page: page,
        per_page: imagesPerPage,
      },
      headers: {
        Authorization: `Client-ID ${accessKey}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("error", error);
  }
}
