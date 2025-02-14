import React, { useState } from 'react'
import "./index.scss"

const Profile = () => {

  const [user, setUser] = useState([])
  const [sort, setSort] = useState("def")
  const [change, setChange] = useState(false)
  const [post, setPost] = useState([])


  const changee = () => {
    if (sort === "def") {
      setPost((arr)=>{
        return [...arr]
      })
    }else if(sort === "reels"){
      const filter = arr.filter((q) => q.isReel === true)
      return [...filter]
    }else{
      const filter = arr.filter((q) => q.isReel === false)
      return [...filter]
    }
  }
  return (
    <section className='profile'>
      <div className='container'>
        <div className='all'>
          <div className='prof'>
            <img src={user.image} />
            <p>{user.bio}</p>
            <div className='settings'>
              <span>Settings</span>
            </div>
          </div>
          <div className='add'>

          </div>
          <div className='cardSelect'>
            <button onClick={() => setChange(true)}>Moments</button>
            <button>Folloewers</button>
            <button>Following</button>
          </div>
          <div className='line'>

          </div>
          <div className=''>
            {change  ?
              (<div className='sort'>
                <button onClick={() => setSort("def")}>All</button>
                <button onClick={() => setSort("reels")}>Reels</button>
                <button onClick={() => setSort("posts")}>Post</button>
              </div>) : console.log("no video")
            }
            {post.map(() => (
              <div className='card'>
                <video />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Profile