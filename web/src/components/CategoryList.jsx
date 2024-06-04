import '../css/CategoryList.css'
import CategoryItem from './CategoryItem';

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


  return (
    <div className = "CategoryList">
      <div className="category_list_wrapper">
        {data.map((item) => (
          <CategoryItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
