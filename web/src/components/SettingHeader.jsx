import "../css/SettingHeader.css";
import {useNavigate} from 'react-router-dom';

const SettingHeader = ({name, link}) => {
  const navigate = useNavigate();
  const onClickBack = () => {
	  navigate(link)
  }

  return (
    <div className="SettingHeader">
        <div className="back" onClick={onClickBack}/>
        <div className="title">{name}</div>
    </div>
  );
};

export default SettingHeader;
