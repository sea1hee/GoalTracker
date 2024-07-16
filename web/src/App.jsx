import "./css/App.css";
import Home from "./pages/Home";
import Setting from "./pages/Setting";
import NotFound from "./pages/NotFound";
import SettingCategory from "./components/SettingCategory"
import { createContext, useReducer, useEffect, useState } from "react";
import {Routes, Route} from 'react-router-dom';

let mockDataCategory = [{
  id: 1,
  start_date : new Date("2024-02-25"),
  name : "first",
  visibility: true,
}];
let mockDataIsCheck = [];

function reducer_arr(state, action) {
  switch (action.type) {
    case 'CREATE':
      window.BRIDGE.logAndroid("CREATE");
      return [action.data, ...state];
    case 'DELETE':
      window.BRIDGE.logAndroid("DELETE");
      return state.filter((item) => String(item.id) !== String(action.id));
    case 'ALTER':
      window.BRIDGE.logAndroid("ALTER");
      window.BRIDGE.logAndroid("reducer : "+action.data);
      return action.data;
    default:
      return state;
  }
  throw Error('Unknown action: ' + action.type);
}

function reducer_int(state, action) {
  switch (action.type) {
    case 'UPDATE':
      return action.data;
    default:
      return state;
  }
}

function dateToString(date){
  const y = date.getFullYear();
  const m = date.getMonth() +1;
  const d = date.getDate(); 

  return `${y}-${m >= 10 ? m : '0' + m}-${d >= 10 ? d : '0' + d}`
}

export const GoalStateContext = createContext();
export const GoalDispatchContext = createContext();

function App() {


  const [category, categoryDispatch] = useReducer(reducer_arr, mockDataCategory);
  const [isChecked, isCheckedDispatch] = useReducer(reducer_arr, mockDataIsCheck);
  const [cIndex, cIndexDispatch] = useReducer(reducer_int, 1);

  const [countCategory, setCountCategory] = useState(0);
  const [countIsChecked, setCountIsChecked] = useState(0);


  //category
  useEffect(() => {

    window.BRIDGE.logAndroid("rerender category");

    const loadCategoryFromAndroid = async (event) => {
      var alterData = [];
      var isUpdateIndex = false;
      for (var i = 0; i<event.detail.data.length ; i++){

        window.BRIDGE.logAndroid("raw: " +event.detail.data[i].start_date)
        var transData = {
          id : Number(event.detail.data[i].id),
          start_date : new Date(event.detail.data[i]?.start_date),
          name : event.detail.data[i].name,
          visibility : Boolean(event.detail.data[i].visibility),
        }
      
        window.BRIDGE.logAndroid("trans: " +transData.visibility);
        alterData.push(transData)
        
        if(!isUpdateIndex){
          if(transData.visibility){
            onUpdateCIndex(transData.id);
            isUpdateIndex = true;
          }
        }
      }
      categoryDispatch({
        type: "ALTER",
        data: alterData
      });

      if(countCategory != alterData.length){
        setCountCategory(alterData.length);
      };

      window.BRIDGE.logAndroid("alterData: " +alterData);
    }


    window.addEventListener('loadCategoryToWeb', loadCategoryFromAndroid);
    
    if (window.BRIDGE) {
        window.BRIDGE.loadCategory();
    }
    return () => {
        window.removeEventListener('loadCategoryToWeb', loadCategoryFromAndroid);
    };
}, [countCategory]);

  //ischecked
  useEffect(() => {
    
    window.BRIDGE.logAndroid("rerender IsChecked");

    const loadChecklistFromAndroid = async (event) => {
      var alterData = [];

      for (var i = 0; i<event.detail.data.length ; i++){
        var transData = {
          id : Number(event.detail.data[i].id),
          date : new Date(event.detail.data[i].date),
          categoryId : Number(event.detail.data[i].categoryId),
        }
        alterData.push(transData)
      }
      isCheckedDispatch({
        type: "ALTER",
        data: alterData
      });

      if(countIsChecked != alterData.length){
        setCountIsChecked(alterData.length);
      };

    }
    window.addEventListener('loadCheckListToWeb', loadChecklistFromAndroid);
    if (window.BRIDGE) {
        window.BRIDGE.loadCheckList();
    }
    return () => {
        window.removeEventListener('loadCheckListToWeb', loadChecklistFromAndroid);
    };
  }, [countIsChecked]);

  const onCreateCategory = (name) => {
    
    if (window.BRIDGE) {
      window.BRIDGE.addCategoryData(dateToString(new Date()), name);
    }

    window.BRIDGE.logAndroid("delete complete!");
    setCountCategory(category.length+1);

    //window.BRIDGE.loadCategory();
    //onUpdateCIndex(category[-1].id);
  };

  const onDeleteCategory = (id) => {
    if (window.BRIDGE) {
      window.BRIDGE.deleteCategoryData(id);
    }

    setCountCategory(countCategory-1);
    //window.BRIDGE.loadCategory();
    window.BRIDGE.logAndroid("delete complete!");

    onUpdateCIndex(1);
/*

    categoryDispatch({
      type: "DELETE",
      id,
    });

    window.BRIDGE.logAndroid("delete complete!");
    window.BRIDGE.deleteCategoryData(id);
    */
  };

  const onUpdateCategoryName = (id, name) => {
    if (window.BRIDGE){
      window.BRIDGE.updateCategoryName(id, name);
    }
    setCountCategory(countCategory);
  }

  const onUpdateCategoryVisibility = (id, v) => {
    if(window.BRIDGE){
        window.BRIDGE.updateCategoryVisibility(id, v);
    }
    setCountCategory(countCategory+0.000001);
  }

  const onCreateIsChecked = (categoryId, date) => {
    if (window.BRIDGE) {
      window.BRIDGE.addIsCheckData(dateToString(date), categoryId);
    }
    setCountIsChecked(countIsChecked+1);
    //window.BRIDGE.loadCheckList()
  };

  const onDeleteIsChecked = (id) => {
    if (window.BRIDGE) {
      window.BRIDGE.deleteIsCheckData(id);
    }
    setCountIsChecked(isChecked.length-1);
  };

  const onUpdateCIndex = (id) => {
    cIndexDispatch({
      type: "UPDATE",
      data: id,
    })
  }

  const getCategoryIdFromName = (name) => {

  }

  return (
    <div>
      <GoalStateContext.Provider value={[category, isChecked, cIndex]}>
        <GoalDispatchContext.Provider
          value={{
            onCreateCategory,
            onCreateIsChecked,
            onDeleteCategory,
            onDeleteIsChecked,
            onUpdateCIndex,
            onUpdateCategoryName,
            onUpdateCategoryVisibility
          }}>
          <Routes>
            <Route path = "/assets/dist/index.html" exact element={<Home />}></Route>
            <Route path = "/assets/dist/index.html/setting" element={<Setting />}></Route>
            <Route path = "/assets/dist/index.html/settingCategory" element={<SettingCategory />}></Route>
            <Route path = "*" element={<NotFound />}></Route>
          </Routes>
        </GoalDispatchContext.Provider>
      </GoalStateContext.Provider>
    </div>
  );
}

export default App;
