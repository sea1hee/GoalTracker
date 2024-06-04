import "../css/HomeHeader.css";
import {useNavigate} from 'react-router-dom';

const HomeHeader = ({ title, prev, next, settings }) => {
  const navigate = useNavigate();
  const onClickSetting = () => {
	  navigate('/assets/dist/index.html/setting')
  }

  return (
    <div className="HomeHeader">
      <div className="date">
        <div className="prev">{prev}</div>
        <div className="title">{title}</div>
        <div className="next">{next}</div>
      </div>
      <div className="settings" onClick={onClickSetting}>{settings}</div>
    </div>
  );
};

export default HomeHeader;
