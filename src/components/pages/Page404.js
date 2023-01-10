import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import error from "../../resources/img/404.png";
import "../../style/button.scss";

const Page404 = () => {
  return (
    <>
      <Helmet>
        <meta name="description" content="404" />
        <title>404</title>
      </Helmet>
      <div>
        <img src={error} alt="error" style={{ marginLeft: "10%" }} />
        <Link className="button button__main button__long" to="/">
          <div className="inner">on main</div>
        </Link>
      </div>
    </>
  );
};

export default Page404;
