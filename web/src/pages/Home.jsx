import HomeHeader from "../components/HomeHeader";
import Button from "../components/Button";
import Calendar from "../components/Calendar";
import { useContext, useState } from "react";
import { GoalStateContext, GoalDispatchContext } from "../App";
import CategoryList from "../components/CategoryList";
import AddCategoryModal from "../components/modal/AddCategoryModal";
import icon_arrow_left from "../assets/icon_arrow_left.png"
import icon_arrow_right from "../assets/icon_arrow_right.png"



const Home = () => {
  // cur year-month
  const [pivotDate, setPivotDate] = useState(new Date());

  const decreaseMonth = () => {
    if(preventDecreaseMonth()) {
      setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
    }
  };

  const increaseMonth = () => {
    if(preventIncreaseMonth()) {
      if (pivotDate.getFullYear())
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
    }
  };

    // categoryList, isCheckedList, curCategoryIndex
    const [categoryList, isCheckedList, cIndex] = useContext(GoalStateContext);

    const preventIncreaseMonth = () => {
      if (new Date() > new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1)){
        return true;
      } else{
        return false;
      }
    }

    const preventDecreaseMonth = () => {
      const category_start_date = categoryList.filter((item) => item.id == cIndex)[0].start_date
      if (category_start_date <= new Date(pivotDate.getFullYear(), pivotDate.getMonth())){
        return true;
      } else{
        return false;
      }

    }

    const {onCreateCategory,
      onCreateIsChecked,
      onDeleteCategory,
      onDeleteIsChecked,
      onUpdateCIndex} = useContext(GoalDispatchContext);


    const [onModal, setOnModal] = useState(false);
    const addCategory = () => {
      setOnModal(true);
    }

    const closeModal = () => {
      setOnModal(false);
    }

  return (
    <div>
      <AddCategoryModal className="modal" open={onModal} close={closeModal} />
      <HomeHeader
        title={`${pivotDate.getFullYear()}.${pivotDate.getMonth() + 1}`}
        prev={<button onClick={decreaseMonth} className="button_arrow_left">
                <img src={icon_arrow_left} width={20} className="icon_arrow_left"/>
              </button>}
        next={<button onClick={increaseMonth} className="button_arrow_right">
                <img src={icon_arrow_right} width={20} className="icon_arrow_right"/>
              </button>}
      />
      <CategoryList 
      data = {categoryList}
      btnCategoryAdd = {<Button onClick={addCategory} text={"add"} type= "ADDCATEGORY" />}/>
      <Calendar date={pivotDate}/>
    </div>
  );
};

export default Home;
