import "../css/SettingHeader.css";
import {useNavigate} from 'react-router-dom';
import icon_arrow_left from '../assets/icon_arrow_left.png';

const SettingHeader = ({name, link}) => {
  const navigate = useNavigate();
  const onClickBack = () => {
	  navigate(link)
  }

  return (
    <div className="SettingHeader">
      <button onClick={onClickBack} className="button_back">
        <img src={icon_arrow_left} width={20} className="icon_back"/>
      </button>
      <div className="setting_title">{name}</div>
    </div>
  );
};

export default SettingHeader;
