import React, { useEffect, useState } from 'react'
import "./index.scss"
import axios from "axios"
import { Link } from 'react-router-dom'

const Characters = () => {
  const [champs, setChamps] = useState([])
  const [filters, setFilters] = useState({
    Assassin: false,
    Fighter: false,
    Mage: false,
    Support: false,
    Tank: false,
    Marksman: false,
  });
  const [serach, setSearch] = useState("")

  const getData = async () => {
    try {
      const res = await axios("http://localhost:8080/api/champions/")
      setChamps(res.data.data)
    } catch (error) {
      console.log(error);

    }
  }
  useEffect(() => {
    getData()
  }, [])

  const handleFilterChange = (e) => {
    const { name, checked } = e.target;
    setFilters({
      ...filters,
      [name]: checked,
    });
  };


  const filteredChamps = champs.filter((champ) => {
    if (!Object.values(filters).some((value) => value)) {
      return true; // If no filters are selected, show all champs
    }
    return filters[champ.type];
  });


  const searched = filteredChamps.filter((q)=> q.name.toLowerCase().includes(serach.toLowerCase()))





  return (
    <section className='ch'>
      <div className='container'>
        <div className='all'>
          <div className='side'>
            <div className='filtt'>
              <input className='search' type="search" autocomplete="off" placeholder='search' onChange={(e)=>setSearch(e.target.value)} />
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="-20 -20 1000 150">
                <path class="path" fill="none" d="M924.4 85.2c-19.5 19.5-50.8 19.7-70.3 0-19.3-19.4-19.3-51 .3-70.6 19.5-19.5 51-19.4 70.6 0 19.3 19.7 19.3 50.8-.5 70.6l35.4 35.3H0" />
              </svg>
            </div>
            <div className='check'>
            {Object.keys(filters).map((filter) => (
                <div className='filt' key={filter}>
                  <div className='par'>
                    <input
                      id={`cbx-${filter}`}
                      type="checkbox"
                      name={filter}
                      checked={filters[filter]}
                      onChange={handleFilterChange}
                    />
     
                  </div>
                  <label htmlFor={`cbx-${filter}`}>{filter}</label>
                </div>
              ))}
            </div>
          </div>
          <div className='champs'>

            {champs && searched.map((p) => (
              <Link to={`/chardetails/${p._id}`} className='card' >
                <div className='over'>
                  <img src={p.icon} />
                  <div className='dark'>

                  </div>
                  <div className='lay'>
                    <p>{p.name}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Characters