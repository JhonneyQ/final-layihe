import React from 'react'
import "./index.scss"

const Characters = () => {
  return (
    <section className='ch'>
      <div className='container'>
        <div className='all'>
          <div className='side'>
            <input className='search' />
            <div>
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

          </div>
        </div>
      </div>
    </section>
  )
}

export default Characters