import React from 'react'
import { Link } from 'react-router-dom'
import "./index.scss"
import { SiLeagueoflegends } from "react-icons/si";

const Cheader = () => {
    return (
        <header>
            <div className='container'>
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
                <div class="play-button">Play</div>

            </div>
        </header>
    )
}

export default Cheader