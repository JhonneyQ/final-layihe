import React from 'react'
import { Link } from 'react-router-dom'
import "./index.scss"
import { SiLeagueoflegends } from "react-icons/si";

const Cheader = () => {
    return (
        <header>
            <div className='container'>
                <div className='all'>
                    <SiLeagueoflegends className='icon' />
                    <nav>
                        <ul>
                            <li>
                                <Link to="/">HOME</Link>
                            </li>
                            <li>
                                <Link to="/profile">PROFILE</Link>
                            </li>
                            <li>
                                <Link to="/moments">MOMENTS</Link>
                            </li>
                            <li>
                                <Link to="/characters">CHARACTERS</Link>
                            </li>
                            <li>
                                <Link to="/about">ABOUT US</Link>
                            </li>
                        </ul>
                    </nav>
                    <a class="play-button" href="https://www.leagueoflegends.com/tr-tr/" >Play</a>

                </div>
            </div>
        </header>
    )
}

export default Cheader