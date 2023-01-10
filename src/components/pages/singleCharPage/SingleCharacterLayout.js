import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import Spiner from "../../spiner/Spiner";
import ErrorMessage from "../../errorMessage/ErrorMessage";
import AppBanner from "../../appBanner/AppBanner";
import useMarvelService from "../../../services/useMarvelService";

import "./singleCharacterLayout.scss";

const SingleCharacterLayout = () => {
  const { charId } = useParams();
  const [char, setChar] = useState(null);
  const { loading, error, clearError, getCharacter } = useMarvelService();

  useEffect(() => {
    updateChar();
  }, [charId]);

  const updateChar = () => {
    clearError();
    getCharacter(charId).then(onCharLoaded);
  };

  const onCharLoaded = (char) => {
    setChar(char);
  };

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spiner /> : null;
  const content = !(loading || error || !char) ? <Viev char={char} /> : null;
  return (
    <>
      <AppBanner />
      <div className="single-comic">
        {spinner}
        {errorMessage}
        {content}
      </div>
    </>
  );
};

const Viev = ({ char }) => {
  const { name, description, thumbnail } = char;
  return (
    <>
      <Helmet>
        <meta name="description" content={name} />
        <title>{name}</title>
      </Helmet>
      <img src={thumbnail} alt={name} className="single-comic__char-img" />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{name}</h2>
        <p className="single-comic__descr">{description}</p>
      </div>
    </>
  );
};

export default SingleCharacterLayout;
