import { useState, useEffect, useRef } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import PropTypes from "prop-types";
import useMarvelService from "../../services/useMarvelService";
import Spiner from "../spiner/Spiner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import "./charList.scss";

const CharList = (props) => {
  const [chars, setChars] = useState([]);
  const [newCharLoading, setNewCharLoading] = useState(false);
  const [offset, setOffset] = useState(215);
  const [charEnd, setCharEnd] = useState(false);
  const [inProp, setInProp] = useState(false);

  const { loading, error, getAllCharaters, clearError } = useMarvelService();

  useEffect(
    () => {
      onRequest(offset, true);
    },
    // eslint-disable-next-line
    []
  );

  const onRequest = (offset, initial) => {
    initial ? setNewCharLoading(false) : setNewCharLoading(true);
    clearError();
    getAllCharaters(offset).then(onCharLoaded);
  };

  const onCharLoaded = (newChars) => {
    let ended = false;
    if (newChars.length < 9) {
      ended = true;
    }

    setChars([...chars, ...newChars]);

    setNewCharLoading(false);
    setOffset((offset) => offset + 9);
    setCharEnd(ended);
  };

  const itemRefs = useRef([]);

  const focusOnItem = (id) => {
    itemRefs.current.forEach((item) =>
      item.classList.remove("char__item_selected")
    );
    itemRefs.current[id].classList.add("char__item_selected");
    itemRefs.current[id].focus();
  };

  function renderChars(chars) {
    let items = chars.map((char, i) => {
      let imgStyle = { objectFit: "cover" };
      if (
        char.thumbnail ===
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
      ) {
        imgStyle = { objectFit: "unset" };
      }
      return (
        <CSSTransition in={inProp} classNames="char__item" timeout={500}>
          <li
            className="char__item"
            key={i}
            tabIndex={0}
            ref={(item) => (itemRefs.current[i] = item)}
            onClick={() => {
              props.onCharSelected(char.id);
              focusOnItem(i);
            }}
            onKeyPress={(e) => {
              if (e.key === " " || e.key === "Enter") {
                props.onCharSelected(char.id);
                focusOnItem(i);
              }
            }}
          >
            <img src={char.thumbnail} alt={char.name} style={imgStyle} />
            <div className="char__name">{char.name}</div>
          </li>
        </CSSTransition>
      );
    });
    return <TransitionGroup component={null}>{items}</TransitionGroup>;
  }

  const items = renderChars(chars);

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading && !newCharLoading ? <Spiner /> : null;

  return (
    <div className="char__list">
      <ul className="char__grid">
        {errorMessage}
        {spinner}
        {items}
      </ul>

      <button
        className="button button__main button__long"
        disabled={newCharLoading}
        style={{ display: charEnd ? "none" : "block" }}
        onClick={() => onRequest(offset)}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

CharList.propTypes = {
  onCharSelected: PropTypes.func,
};

export default CharList;
