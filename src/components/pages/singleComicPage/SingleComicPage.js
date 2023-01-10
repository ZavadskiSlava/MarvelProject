import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Spiner from "../../spiner/Spiner";
import ErrorMessage from "../../errorMessage/ErrorMessage";
import AppBanner from "../../appBanner/AppBanner";
import useMarvelService from "../../../services/useMarvelService";
import "./singleComicPage.scss";

const SingleComicPage = () => {
  const { comicId } = useParams();
  const [comic, setComic] = useState(null);

  const { loading, error, clearError, getComics } = useMarvelService();

  useEffect(() => {
    updateComic();
  }, [comicId]);

  const updateComic = () => {
    clearError();
    getComics(comicId).then(onComLoaded);
  };

  const onComLoaded = (com) => {
    setComic(com);
  };
  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spiner /> : null;
  const content = !(loading || error || !comic) ? <Viev comic={comic} /> : null;
  return (
    <>
      <AppBanner />
      <div className="single-comic">
        {errorMessage}
        {spinner}
        {content}
        <Link to="/comics" className="single-comic__back">
          Back to all
        </Link>
      </div>
    </>
  );
};

const Viev = ({ comic }) => {
  return (
    <>
      <Helmet>
        <meta name="description" content={comic.title} />
        <title>{comic.title}</title>
      </Helmet>
      <img
        src={comic.thumbnail}
        alt={comic.title}
        className="single-comic__img"
      />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{comic.title}</h2>
        <p className="single-comic__descr">{comic.description}</p>
        <p className="single-comic__descr">{comic.pages}</p>
        <p className="single-comic__descr">Language: {comic.language}</p>
        <div className="single-comic__price">{comic.price}</div>
      </div>
    </>
  );
};

export default SingleComicPage;
