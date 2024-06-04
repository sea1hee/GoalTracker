import "../../css/AddCategoryModal.css";
import { useState, useContext } from "react";
import {GoalDispatchContext } from "../../App";

const AddCategoryModal = ({open, close}) => {

    const {onCreateCategory,
        onCreateIsChecked,
        onDeleteCategory,
        onDeleteIsChecked,
        onUpdateCIndex} = useContext(GoalDispatchContext);

        
    const [name, setName] = useState("");

    const onChange = (e) => {
        setName(e.target.value);
      };

    const addCategory = () => {
        if(name ==="")
        {

        } else {
            onCreateCategory(name);
            setName("");
            close();
        }
    }
    return (
        <div className={open ? 'openModal modal' : 'modal'}>
            {open && <div className="form">
                      <header>
                      <div className="header-title">카테고리 추가</div>     
                      </header>
                      <div className="main">
                      <input className="input" type="name" placeholder="카테고리 이름을 입력하세요" value={name} onChange={onChange}/>                     
                      </div>
                      <div className="foot">
                      <button className="btn-Add" onClick={addCategory}>추가</button>
                      <button className="btn-close" onClick={close}>닫기</button> 
                      </div>
                     </div>            
                    }   
        </div>
    );
  };
  
  export default AddCategoryModal;
  