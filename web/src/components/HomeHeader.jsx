import "../css/HomeHeader.css";
const HomeHeader = ({ title, prev, next}) => {

  return (
    <div className="HomeHeader">
      <div className="date">
        <div className="prev">{prev}</div>
        <div className="title">{title}</div>
        <div className="next">{next}</div>
      </div>
    </div>
  );
};

export default HomeHeader;
