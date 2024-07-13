import '../css/CategoryList.css'
import CategoryItem from './CategoryItem';
import Button from "./Button";
import {useNavigate} from 'react-router-dom';

const CategoryList = ( {data, btnCategoryAdd}) => {

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
        <Button text={"settings"} type="SETTINGS" onClick={onClickSetting} />
      </div>
      
    </div>
  );
};

export default CategoryList;
