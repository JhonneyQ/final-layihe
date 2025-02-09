import React from 'react'
import "./index.scss"

const Cfooter = () => {
  return (
    <footer>
        <div className='container'>
            <img src='https://img.icons8.com/?size=512&id=V1Ja402KSwyz&format=png' className='riot'/>
            <nav>
                <ul>
                    <li>
                        <a>ABOUT LEAGUE OF LEGENDS</a>
                    </li>
                    <li>
                        <a>HELP US IMPROVE</a>
                    </li>
                    <li>
                        <a>SUPPORT</a>
                    </li>
                </ul>
            </nav>
            <p>© 2025 Riot Games, Inc. All rights reserved. Riot Games, League of Legends and PvP.net are trademarks, service marks, or registered trademarks of Riot Games, Inc, Cəma.</p>
            <div className='icons'>
                <img src='https://oyster.ignimgs.com/mediawiki/apis.ign.com/league-of-legends/8/86/League_of_legends_logo_transparent.png'/>

            </div>
        </div>
    </footer>
  )
}

export default Cfooter