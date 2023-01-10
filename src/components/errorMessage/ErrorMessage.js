import img from "./error.gif";

const ErrorMessage = () => {
  return (
    <img
      style={{
        dispalay: "block",
        margin: "0 auto",
        width: "250px",
        height: "250px",
        objectFit: "contain",
      }}
      src={img}
      alt="error"
    />
  );
};

export default ErrorMessage;
