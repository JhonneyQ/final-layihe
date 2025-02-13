import React, { useEffect, useState } from 'react'
import "./index.scss"
import { useParams } from 'react-router-dom'
import axios from 'axios'

const CharDetails = () => {
  const { id } = useParams()
  const [card, setCard] = useState([])
  const [stat, setStat] = useState([])
  const [skills, setSkills] = useState([])
  console.log(id);



  const getData = async () => {
    try {
      const res = await axios(`http://localhost:8080/api/champions/${id}`)
      console.log(res.data.data);
      setStat(res.data.data.stats[0])
      setCard(res.data.data)
      setSkills(res.data.data.skills)
    } catch (error) {
      console.log(error);

    }
  }
  
  




  useEffect(() => {
    getData()
  }, [])





  return (
    <section className="details" style={{ position: "relative", overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), 
                   url('${card.background}') 
                   center/cover no-repeat`,
          filter: "blur(10px)",
          zIndex: -1,
        }}
      ></div>

      <div className="container">
        <div className="card">
          <div className="par">
            <div className='first'>
              <p>{card.title} / {card.type}</p>
              <h2>{card.name}</h2>
              <span>{card.description}</span>
              <div className='about'>
                <div className='stat'>
                  <div className='hp'>
                    <p>HP</p>
                    <span>{stat.hp}</span>
                  </div>
                  <div className='armor'>
                    <p>ARMOR</p>
                    <span>{stat.armor}</span>
                  </div>
                  <div className='mr'>
                    <p>MR</p>
                    <span>{stat.mr}</span>
                  </div>
                </div>
                <div className='skill'>
                  <img src={skills[0]}/>
                  <img src={skills[1]}/>
                  <img src={skills[2]}/>
                  <img src={skills[3]}/>
                </div>
              </div>
            </div>
            {/* <div className='icon'>
              <p>{card.type}</p>
            </div> */}
          </div>
          <div className="pic">
            <img src={card.image}/>
          </div>
        </div>
      </div>
    </section>


  )
}

export default CharDetails