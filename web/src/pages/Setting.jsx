import {Link} from 'react-router-dom';
import SettingHeader from '../components/SettingHeader';
import SettingList from '../components/SettingList';

import {useNavigate} from 'react-router-dom';

const Setting = () => {
 
    const navigate = useNavigate();
    const categoryOnclick = () => {
        window.BRIDGE.logAndroid("categoryOnClick");
        navigate('/assets/dist/index.html/settingCategory')
    }

    return (
        <div>
            <SettingHeader 
                name={"설정"}
                link={"/assets/dist/index.html"} />
            
            <SettingList 
                name={"카테고리 설정"}
                onClick={categoryOnclick}/>

            <SettingList 
                name={"초기화"}
                onClick={categoryOnclick}/>
        </div>
    );
};

export default Setting;