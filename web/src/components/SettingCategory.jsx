import '../css/settingCategory.css';
import SettingHeader from '../components/SettingHeader';
import SettingCategoryItem from '../components/SettingCategoryItem';
import AddCategoryModal from '../components/modal/AddCategoryModal'
import { useContext, useState } from "react";
import { GoalStateContext, GoalDispatchContext } from "../App";

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
                name={"카테고리 설정"}
                link={"/assets/dist/index.html/setting"} />
            
            <div className="setting_category_list_wrapper">
                {categoryList.map((item) => (
                    <SettingCategoryItem key={item.id} {...item} />
                ))}
            </div>
            <div className="setting_btn_add_category" onClick={btnCategoryAdd}>Add</div>
        </div>
    </div>
    );
};

export default SettingCategory;