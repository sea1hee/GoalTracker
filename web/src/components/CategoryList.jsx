import '../css/CategoryList.css'
import CategoryItem from './CategoryItem';
import {useNavigate} from 'react-router-dom';
import setting from '../assets/setting.png';
import { GoalDispatchContext } from "../App";
import { useEffect } from 'react';
import { useContext } from "react";


const CategoryList = ( {data, btnCategoryAdd}) => {

  window.BRIDGE.logAndroid("CategoryList" + data[0].id);
  const {onUpdateCIndex} = useContext(GoalDispatchContext);

  const onWheel = (e) => {
    const { deltaY } = e;
    const el = containerRef.current;
    if (!el) return;

    if (deltaY > 0 && slide === true) {
      setSlide(false);
      el.scrollTo({
        left: el.scrollLeft + deltaY * 5,
        behavior: "smooth",
      });
      setSlide(true);
    }
    if (deltaY < 0 && slide === true) {
      setSlide(false);
      el.scrollTo({
        left: el.scrollLeft + deltaY * 5,
        behavior: "smooth",
      });
      setSlide(true);
    }
  };

  const navigate = useNavigate();
  const onClickSetting = () => {
    navigate('/assets/dist/index.html/settingCategory')
  }



  return (
    <div className = "CategoryList">
      <div className="category_list_wrapper">
        {data.map((item, ind) => (
          <CategoryItem key={item.id} {...item} />
        ))}
        <button onClick={onClickSetting} className='button_setting'>
          <img src={setting} className='icon_setting'/>
        </button>
      </div>
      
    </div>
  );
};

export default CategoryList;
