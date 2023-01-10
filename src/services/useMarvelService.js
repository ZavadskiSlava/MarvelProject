import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
  const { loading, request, error, clearError } = useHttp();
  const _apiBase = "https://gateway.marvel.com:443/v1/public/";
  const _apiKey = "apikey=0b5960b3a92dc2ad5723d97f041010b0";
  const _baseCharOffset = 215;
  const _baseComicsOffset = 215;

  const getAllCharaters = async (offset = _baseCharOffset) => {
    const res = await request(
      `${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`
    );
    return res.data.results.map(_transformCharacter);
  };

  const getCharacter = async (id) => {
    const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
    return _transformCharacter(res.data.results[0]);
  };
  const _transformCharacter = (char) => {
    return {
      id: char.id,
      name: char.name,
      description: char.description,
      thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items,
    };
  };

  const getAllComics = async (offset = _baseComicsOffset) => {
    const res = await request(
      `${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`
    );
    return res.data.results.map(_transformComics);
  };

  const getComics = async (id) => {
    const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
    return _transformComics(res.data.results[0]);
  };

  const _transformComics = (com) => {
    return {
      id: com.id,
      title: com.title,
      price: com.prices[0].price ? `${com.prices[0].price}$` : "not available",
      thumbnail: `${com.thumbnail.path}.${com.thumbnail.extension}`,
      url: com.resourceURI,
      description: com.description || "There is no description",
      pageCount: com.pageCount
        ? `${com.pageCount} pages`
        : "No information about the number of pages",
      language: com.textObjects.language || "en-us",
    };
  };

  const getCharacterByName = async (name) => {
    const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
    return res.data.results.map(_transformCharacter);
  };

  return {
    loading,
    error,
    getAllCharaters,
    getCharacter,
    clearError,
    getAllComics,
    getComics,
    getCharacterByName,
  };
};

export default useMarvelService;
