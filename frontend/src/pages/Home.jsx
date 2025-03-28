import { useState, useEffect } from "react";
import { getBusinesses, getCategories } from '../services/api';
import BusinessCard from '../components/BusinessCard'
import Loader from "../components/Loader";




function Home() {
  const [businesses, setBusinesses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [city, setCity] = useState('София');
  const [category, setCategory] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    const loadBusinesses = async () => {
      try {
        const business = await getBusinesses()
        setBusinesses(business)

      } catch (err) {
        setError(`Failed to load businesses: ${err.message || err}`);
      }
      finally {
        setLoading(false)
      }
    }
    loadBusinesses()
  }, []);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categ = await getCategories()
        setCategories(categ)
        sessionStorage.setItem('categories', JSON.stringify(categ))
      } catch (err) {
        console.log(err);

      }
    }
    loadCategories()
  }, []);

  const cities = [...new Set(businesses.map(b => b.city))];

  return (

    <div className="home">
      <h2>Намерете Перфектните Услуги за Вас</h2>
      {loading ? <Loader /> :
        (error ? <div className="error-message">{error}</div> :
          (
            <>
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
                    ).map(b => <BusinessCard business={b} key={b.bulstat} serviceIsNeed={true} />)): (
                      <p>Няма открити резултати. Моля, опитайте с различни филтри.</p>
                    )}
                </div>
              )}
            </>
          )
        )
      }
    </div>

  );
}

export default Home;