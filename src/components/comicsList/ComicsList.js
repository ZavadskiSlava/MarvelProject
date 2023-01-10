import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useMarvelService from "../../services/useMarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spiner from "../spiner/Spiner";
import "./comicsList.scss";

const ComicsList = () => {
  const [coms, setComs] = useState([]);
  const [newComsLoading, setNewComsLoading] = useState(false);
  const [offset, setOffset] = useState(215);
  const [comEnded, setComEnded] = useState(false);

  const { loading, error, getAllComics } = useMarvelService();

  useEffect(() => {
    onRequest(offset, true);
  }, []);

  const onRequest = (offset, initial) => {
    initial ? setNewComsLoading(false) : setNewComsLoading(true);

    getAllComics(offset).then(onComsLoaded);
  };

  const onComsLoaded = (newComs) => {
    let ended = false;
    if (newComs.length < 8) {
      ended = true;
    }
    setComs([...coms, ...newComs]);
    setNewComsLoading(false);
    setOffset((offset) => offset + 8);
    setComEnded(ended);
  };

  function renderComs(coms) {
    let items = coms.map((com, i) => {
      return (
        <li className="comics__item" key={i}>
          <Link to={`/comics/${com.id}`}>
            <img
              src={com.thumbnail}
              alt={com.title}
              className="comics__item-img"
            />
            <div className="comics__item-name">{com.title}</div>
            <div className="comics__item-price">{com.price}</div>
          </Link>
        </li>
      );
    });
    return <ul className="comics__grid">{items}</ul>;
  }

  const items = renderComs(coms);
  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading && !newComsLoading ? <Spiner /> : null;

  return (
    <div className="comics__list">
      {errorMessage}
      {spinner}
      {items}
      <button
        className="button button__main button__long"
        disabled={newComsLoading}
        style={{ display: comEnded ? "none" : "block" }}
        onClick={() => onRequest(offset)}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default ComicsList;
