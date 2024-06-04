import '../css/CategoryItem.css'
import Button from './Button';

import { useContext } from "react";
import { GoalStateContext, GoalDispatchContext } from "../App";

const CategoryItem = ({id, start_date, name}) => {
    //console.log(id, start_date, name)

    const [categoryList, isCheckedList, cIndex] = useContext(GoalStateContext);
    const {onCreateCategory,
        onCreateIsChecked,
        onDeleteCategory,
        onDeleteIsChecked,
        onUpdateCIndex} = useContext(GoalDispatchContext);

    const categoryOnClick = () => 
    {
        onUpdateCIndex(id);
  
    }

    return (
        <div className="CategoryItem">
            {id === cIndex
            ? <Button type="CATEGORYSELECTED" text={name} onClick={categoryOnClick}/>
            : <Button type="CATEGORY" text={name} onClick={categoryOnClick}/>}
        </div>
    );
}
export default CategoryItem;