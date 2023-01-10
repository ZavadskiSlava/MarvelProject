import { useState, useEffect } from "react";
import Spiner from "../spiner/Spiner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Skeleton from "../skeleton/Skeleton";
import useMarvelService from "../../services/useMarvelService";
import "./charInfo.scss";

const CharInfo = (props) => {
  const [char, setChar] = useState(null);
  const { loading, error, getCharacter, clearError } = useMarvelService();

  useEffect(() => {
    updateChar();
  }, [props.charId]);

  const onCharLoaded = (char) => {
    setChar(char);
  };

  const updateChar = () => {
    const { charId } = props;
    if (!charId) {
      return;
    }
    clearError();
    getCharacter(charId).then(onCharLoaded);
  };

  const skeleton = char || loading || error ? null : <Skeleton />;
  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spiner /> : null;
  const content = !(loading || error || !char) ? <Viev char={char} /> : null;
  return (
    <div className="char__info">
      {skeleton}
      {errorMessage}
      {spinner}
      {content}
    </div>
  );
};

const Viev = ({ char }) => {
  const { name, thumbnail, homepage, wiki, description, comics } = char;
  const chageDescription = (str) => {
    if (!str) {
      return "There is no information about this hero";
    }
    if (str.length > 221) {
      let newStr = str.slice(0, 217) + "...";
      return newStr;
    } else {
      return str;
    }
  };

  const changePic = (pic) => {
    if (
      pic ===
      "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
    ) {
      return <img src={pic} alt={name} style={{ objectFit: "contain" }} />;
    } else {
      return <img src={pic} alt={name} />;
    }
  };

  const rendComics = (com) => {
    if (com[0]) {
      let item = com.map((item, i) => {
        // eslint-disable-next-line
        if (i > 10) return;
        return (
          <li key={i} className="char__comics-item">
            {item.name}
          </li>
        );
      });
      return item;
    } else {
      return (
        <li className="char__comics-item">No comics about this character</li>
      );
    }
  };

  return (
    <>
      <div className="char__basics">
        {changePic(thumbnail)}
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{chageDescription(description)}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">{rendComics(comics)}</ul>
    </>
  );
};

export default CharInfo;
