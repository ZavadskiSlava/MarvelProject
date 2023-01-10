import { useState } from "react";
import { Helmet } from "react-helmet";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBounadry from "../errorBoundary/ErrorBounadry";
import CharSearchForm from "../charSearchForm/CharSearchForm";
import decoration from "../../resources/img/vision.png";

const MainPage = (props) => {
  const [selectedChar, setSelectedChar] = useState(null);

  const onCharSelected = (id) => {
    setSelectedChar(id);
  };

  return (
    <>
      <Helmet>
        <meta name="description" content="Marvel information portal" />
        <title>Marvel information portal</title>
      </Helmet>
      <ErrorBounadry>
        <RandomChar />
      </ErrorBounadry>
      <div className="char__content">
        <ErrorBounadry>
          <CharList onCharSelected={onCharSelected} />
        </ErrorBounadry>
        <div>
          <ErrorBounadry>
            <CharInfo charId={selectedChar} />
          </ErrorBounadry>
          <ErrorBounadry>
            <CharSearchForm />
          </ErrorBounadry>
        </div>
      </div>
      <img className="bg-decoration" src={decoration} alt="vision" />
    </>
  );
};

export default MainPage;
