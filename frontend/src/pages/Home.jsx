import { useState } from "react";
import BusinessCard from '../components/BusinessCard'
import Loader from "../components/Loader";
import { useBusinessesQuery } from "../queries/business";
import { useCategoriesQuery } from "../queries/categories";




function Home() {

  const [city, setCity] = useState('');
  const [category, setCategory] = useState('');


  const { data: businesses, isLoading: isLoadingB, error: errorB } = useBusinessesQuery();
  const { data: categories, isLoading: isLoadingC, error: errorC } = useCategoriesQuery();
  
  if (isLoadingB || isLoadingC) {
    return <Loader />;
  }

  if (errorB || errorC) {
    return <div className="error-message">{errorB?.message ?? errorC?.message}</div>;
  }

  const cities = [...new Set(businesses.map(b => b.city))];


  return (

    <div className="home">
      <h2>Намерете Перфектните Услуги за Вас</h2>
      {cities && categories && <div className="filters">
        {cities &&
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}>
            {cities.map((city, i) =>
              <option
                key={i}
                value={city}
              >{city}</option>)}
          </select>
        }
        {categories &&
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}>
            {categories.map(category =>
              <option
                key={category.id}
                value={category.id}
              >{category.name}</option>)}
          </select>
        }
      </div>
      }
      {businesses && (
        <div className="businesses-grid">
          {businesses.filter(b =>
            (!city || b.city == city) &&
            (!category || b.categoriesId == category)
          ).length > 0 ? (
            businesses.filter(b =>
              (!city || b.city == city) &&
              (!category || b.categoriesId == category)
            ).map(b => <BusinessCard business={b} key={b.bulstat} serviceIsNeed={true} />)) : (
            <p>Няма открити резултати. Моля, опитайте с различни филтри.</p>
          )}
        </div>
      )}
    </div>

  );
}

export default Home;