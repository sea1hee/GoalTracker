import "./css/App.css";
import Home from "./pages/Home";
import Setting from "./pages/Setting";
import NotFound from "./pages/NotFound";
import SettingCategory from "./components/SettingCategory"
import { createContext, useReducer, useEffect } from "react";
import {Routes, Route} from 'react-router-dom';

let mockDataCategory = [{
  id: 1,
  start_date : new Date("2024-02-25"),
  name : "first"
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

  //category
  useEffect(() => {
    const loadCategoryFromAndroid = async (event) => {
      var alterData = [];

      for (var i = 0; i<event.detail.data.length ; i++){

        window.BRIDGE.logAndroid("raw: " +event.detail.data[i].start_date)
        var transData = {
          id : Number(event.detail.data[i].id),
          start_date : new Date(event.detail.data[i]?.start_date),
          name : event.detail.data[i].name,
        }
        
        window.BRIDGE.logAndroid("trans: " +transData.start_date);
        alterData.push(transData)
      }
      categoryDispatch({
        type: "ALTER",
        data: alterData
      });

      window.BRIDGE.logAndroid("alterData: " +alterData);
    }

    window.addEventListener('loadCategoryToWeb', loadCategoryFromAndroid);
    if (window.BRIDGE) {
        window.BRIDGE.loadCategory();
    }
    return () => {
        window.removeEventListener('loadCategoryToWeb', loadCategoryFromAndroid);
    };
}, []);

  //ischecked
  useEffect(() => {
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
    }

    window.addEventListener('loadCheckListToWeb', loadChecklistFromAndroid);
    if (window.BRIDGE) {
        window.BRIDGE.loadCheckList();
    }
    return () => {
        window.removeEventListener('loadCheckListToWeb', loadChecklistFromAndroid);
    };
  }, []);




  const [category, categoryDispatch] = useReducer(reducer_arr, mockDataCategory);
  const [isChecked, isCheckedDispatch] = useReducer(reducer_arr, mockDataIsCheck);
  const [cIndex, cIndexDispatch] = useReducer(reducer_int, 1);

  const onCreateCategory = (name) => {
    
    if (window.BRIDGE) {
      window.BRIDGE.addCategoryData(dateToString(new Date()), name);
    }

    window.BRIDGE.loadCategory();
    //onUpdateCIndex(category[-1].id);
  };

  const onDeleteCategory = (id) => {

    if (window.BRIDGE) {
      window.BRIDGE.deleteCategoryData(id);
    }

    window.BRIDGE.loadCategory();
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

  const onCreateIsChecked = (categoryId, date) => {
    if (window.BRIDGE) {
      window.BRIDGE.addIsCheckData(dateToString(date), categoryId);
    }

    window.BRIDGE.loadCheckList()
  };

  const onDeleteIsChecked = (id) => {
    isCheckedDispatch({
      type: "DELETE",
      id,
    });
    window.BRIDGE.deleteIsCheckData(id);
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
