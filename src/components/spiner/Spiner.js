import spin from "../../resources/img/spinner.svg";

const Spiner = () => {
  return (
    <img
      src={spin}
      alt="spin"
      style={{ margin: "0 auto", background: "none", display: "block" }}
    />
  );
};

export default Spiner;
