import '../css/SettingCategoryItem.css'
import { useContext } from "react";
import { GoalStateContext, GoalDispatchContext } from "../App";

const SettingCategoryItem = ({id, name}) => {

    const [categoryList, isCheckedList, cIndex] = useContext(GoalStateContext);
    const {onCreateCategory,
        onCreateIsChecked,
        onDeleteCategory,
        onDeleteIsChecked,
        onUpdateCIndex} = useContext(GoalDispatchContext);


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

    return (
        <div className="SettingCategoryItem">
            <div className="name">{name}</div>
            <div className='btn_group'>
                <div className="update" onClick={onClickUpdate}>update</div>
                <div className="delete" onClick={onClickDelete}>delete</div>
            </div>
        </div>
    );
}
export default SettingCategoryItem;