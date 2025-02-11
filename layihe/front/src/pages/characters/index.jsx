import React, { useEffect, useState } from 'react'
import "./index.scss"
import axios from "axios"

const Characters = () => {
  const [champs, setChamps] = useState([])

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



  return (
    <section className='ch'>
      <div className='container'>
        <div className='all'>
          <div className='side'>
            <div className='filtt'>
              <input className='search' type="search" autocomplete="off" placeholder='search'/>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="-20 -20 1000 150">
                <path class="path" fill="none" d="M924.4 85.2c-19.5 19.5-50.8 19.7-70.3 0-19.3-19.4-19.3-51 .3-70.6 19.5-19.5 51-19.4 70.6 0 19.3 19.7 19.3 50.8-.5 70.6l35.4 35.3H0" />
              </svg>
            </div>
            <div  className='check'>
              <div className='filt'>
                <input type='checkbox' className='assa' />
                <label htmlFor='assa'>assassin</label>
              </div>
              <div className='filt'>
                <input type='checkbox' className='assa' />
                <label htmlFor='assa'>assassin</label>
              </div>
              <div className='filt'>
                <input type='checkbox' className='assa' />
                <label htmlFor='assa'>assassin</label>
              </div>
              <div className='filt'>
                <input type='checkbox' className='assa' />
                <label htmlFor='assa'>assassin</label>
              </div>
              <div className='filt'>
                <input type='checkbox' className='assa' />
                <label htmlFor='assa'>assassin</label>
              </div>
            </div>
          </div>
          <div className='champs'>

            {champs && champs.map((p) => (
              <button className='card'>
                <div className='over'>
                  <img src={p.icon} />
                  <div className='dark'>

                  </div>
                  <div className='lay'>
                    <p>{p.name}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Characters