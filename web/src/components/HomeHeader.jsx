import "../css/HomeHeader.css";
import logoImage from '../assets/logo.png'; 

const HomeHeader = ({ title, prev, next}) => {

  return (
    <div>
    <img className="logo" src={logoImage} />
    <div className="HomeHeader">
      <div className="date">
        <div className="prev">{prev}</div>
        <div className="title">{title}</div>
        <div className="next">{next}</div>
      </div>
    </div>
    </div>
  );
};

export default HomeHeader;
