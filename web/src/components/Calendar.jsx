import "../css/Calendar.css";
import { GoalStateContext } from "../App";
import { GoalDispatchContext } from "../App";
import { useContext } from "react";

const render = () => {};

const Calendar = ({ date }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const isSameDay = (toDay, compareDay) => {
    if (
      toDay.getFullYear() === compareDay?.getFullYear() &&
      toDay.getMonth() === compareDay?.getMonth() &&
      toDay.getDate() === compareDay?.getDate()
    ) {
      return true;
    }
    return false;
  };

  //select date
  const [categoryList, isCheckedList, cIndex] = useContext(GoalStateContext);
  const {
    onCreateCategory,
    onCreateIsChecked,
    onDeleteCategory,
    onDeleteIsChecked,
    onUpdateCIndex,
  } = useContext(GoalDispatchContext);

  const curCategoryIsCheckedList = isCheckedList.filter(
    (item) => item.categoryId === cIndex
  );

  const buildCalendarDays = () => {
    const curMonthStartDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      1
    ).getDay();
    const curMonthEndDate = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    );
    const prevMonthEndDate = new Date(date.getFullYear(), date.getMonth(), 0);


    const days = Array.from({ length: curMonthStartDate }, (_, i) => {
      return new Date(
        date.getFullYear(),
        date.getMonth() - 1,
        prevMonthEndDate.getDate() - i
      );
    }).reverse();

    days.push(
      ...Array.from(
        { length: curMonthEndDate.getDate() },
        (_, i) => new Date(date.getFullYear(), date.getMonth(), i + 1)
      )
    );

    days.push(
      ...Array.from(
        { length: 7 - curMonthEndDate.getDay() - 1 },
        (_, i) => new Date(date.getFullYear(), date.getMonth() + 1, i + 1)
      )
    );

    return days;
  };

  const buildCalendarTag = (calendarDays) => {
    return calendarDays.map((day, i) => {
      // 이전달 날짜 block
      if (day.getMonth() < date.getMonth()) {
        //window.BRIDGE.logAndroid("1" + day);
        return (
          <div key={i} className="prevMonthDate">
            {day.getDate()}
          </div>
        );
      }

      
      // 다음달 날짜 block
      if (day.getMonth() > date.getMonth()) {
        //window.BRIDGE.logAndroid("2" + day);
        return (
          <div key={i} className="nextMonthDate">
            {day.getDate()}
          </div>
        );
      }

      // 카테고리 시작 날짜 전 block
      var curCategoryStartDate = categoryList.filter((item) => item.id === cIndex)[0].start_date
      if (day < new Date(curCategoryStartDate.getFullYear(), curCategoryStartDate.getMonth(), curCategoryStartDate.getDate())) {
        //window.BRIDGE.logAndroid("3" + day + curCategoryStartDate);
        return (
          <div key={i} className="prevMonthDate">
            {day.getDate()}
          </div>
        );
      }
  
      // 오늘 날짜 이후 block
      if (day > today) {
        //window.BRIDGE.logAndroid("6" + day);
      return (
        <div key={i} className="futureDate">
          {day.getDate()}
        </div>
      );
      }

      // 선택가능일자 4: selected, 5: none-selected
      if (day <= today) {
        //window.BRIDGE.logAndroid("4" + day);
        const exist = curCategoryIsCheckedList.findIndex((item) => isSameDay(item.date, day))
        if (exist >= 0) {
          return (
            <div
              key={i}
              className="selected"
              onClick={() => onClickDateDelete(curCategoryIsCheckedList[exist].id)}
            >
              {day.getDate()}
            </div>
          );
        }
        else {
          //window.BRIDGE.logAndroid("5" + day);
          return (
            <div key={i}
            className="curMonthDate"
            onClick={() => onClickDateCreate(day)}>
              {day.getDate()}
            </div>
          );
        }

      }


    });
  };


  const calendarDays = buildCalendarDays();
  const calendarTags = buildCalendarTag(calendarDays);
  
  const onClickDateDelete = (id) => {
    onDeleteIsChecked(id);
  }

  const onClickDateCreate = (date) => {
    onCreateIsChecked(categoryList.filter((item) => item.id == cIndex)[0].id, date);
  }

  return (
    <div>
      <div className="calendar-container">
        <div className="calendar-days">
          <div className="day">일</div>
          <div className="day">월</div>
          <div className="day">화</div>
          <div className="day">수</div>
          <div className="day">목</div>
          <div className="day">금</div>
          <div className="day">토</div>
        </div>
        <div className="calendar-dates">
          {calendarTags.map((row, i) => (
            <div key={i} className="dates">
              {row}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
