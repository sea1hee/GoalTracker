import '../css/SettingList.css'

const SettingList = ( {name, onClick}) => {

  return (
      <div className="btn_setting_list" onClick={onClick}>{name}</div>
  );
  
};

export default SettingList;
