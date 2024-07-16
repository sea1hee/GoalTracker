import '../css/settingCategory.css';
import SettingHeader from '../components/SettingHeader';
import SettingCategoryItem from '../components/SettingCategoryItem';
import AddCategoryModal from '../components/modal/AddCategoryModal'
import { useContext, useState } from "react";
import { GoalStateContext, GoalDispatchContext } from "../App";
import addCategory from '../assets/addCategory.png';

const SettingCategory = () => {

    const [categoryList, isCheckedList, cIndex] = useContext(GoalStateContext);
    const {onCreateCategory,
        onCreateIsChecked,
        onDeleteCategory,
        onDeleteIsChecked,
        onUpdateCIndex} = useContext(GoalDispatchContext);

    
    const [onModal, setOnModal] = useState(false);
    const closeModal = () => {
      setOnModal(false);
    }

    const btnCategoryAdd = () => {
      setOnModal(true);
    }

 
    return (
    <div>
        <AddCategoryModal className="modal" open={onModal} close={closeModal} />
        <div className='SettingCategory'>
            <SettingHeader 
                name={"습관 편집"}
                link={"/assets/dist/index.html/"} />
            
            <div className="setting_category_list_wrapper_visible">
                {categoryList.map((item) => {
                    if(item.visibility){
                    return <SettingCategoryItem key={item.id} {...item} />
                    }
                })}
            </div>
            <div className= "setting_category_list_wrapper_invisible">
                {categoryList.map((item) => {
                    if(!item.visibility){
                    return <SettingCategoryItem key={item.id} {...item} />
                    }
                })}
            </div>
            <div className="SettingCategoryItem" onClick={btnCategoryAdd}>
                <img src={addCategory} className='icon_addCategory' />
                내 습관 추가하기
            </div>
        </div>
    </div>
    );
};

export default SettingCategory;