import '../css/SettingCategoryItem.css'
import { useContext } from "react";
import { GoalStateContext, GoalDispatchContext } from "../App";
import visible from '../assets/visible.png';
import invisible from '../assets/invisible.png';

const SettingCategoryItem = ({id, name, visibility}) => {

    const [categoryList, isCheckedList, cIndex] = useContext(GoalStateContext);
    const {onCreateCategory,
        onCreateIsChecked,
        onDeleteCategory,
        onDeleteIsChecked,
        onUpdateCIndex,
        onUpdateCategoryName,
        onUpdateCategoryVisibility} = useContext(GoalDispatchContext);


    const onClickDelete = () => {
        if(categoryList.length === 1){
            // popup
        }else {
            onDeleteCategory(id);
        }
    };
    const onClickUpdate = () => {
        //category의 name/start_date API 변경 팝업 생성
    };

    const onClickVisibility = () => {
        onUpdateCategoryVisibility(id, !visibility);
    }

    const onClickOrder = () => {

    };

    window.BRIDGE.logAndroid(`SettingCategoryItem VISIBLE_${visibility}`);

    return (
        <div className={`SettingCategoryItem VISIBLE_${visibility}`}>
            <button onClick={onClickVisibility} className='button_visible'>
                {visibility
                ? <img src={visible} className='icon_visible'/>
                : <img src = {invisible} className='icon_invisible'/>} 
            </button>
            <div className="name">{name}</div>
            <div className='btn_group'>
                <div className='order' onClick={onClickOrder}>order</div>
                </div>
        </div>
    );
}
export default SettingCategoryItem;