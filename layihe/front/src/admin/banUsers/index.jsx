import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../components/authContext';
import axios from 'axios';

const BanUsers = () => {

    const [allUsers, setAllUsers] = useState([])
    const { user, logoutUser } = useContext(AuthContext);
    const [ser, setSer] = useState("")

    const getUser = async () => {
        if (!user?._id) return;


        const res = await axios(`http://localhost:8080/api/user`);

        setAllUsers(res.data)

    };

    useEffect(() => {


        getUser()

    }, [user])

    const searching = allUsers?.filter((q) => q.name.toLowerCase().trim().includes(ser.toLocaleLowerCase().trim()))

    const ban = async(id) =>{
        const res = await axios.post(`http://localhost:8080/api/user/ban/user`, {userId: id});

        getUser()
    }
    



    return (
        <section>
            <div className='container'>
                <input placeholder="search user" onChange={(e) => setSer(e.target.value)} />
                {ser !== "" ? <div className="abc">
                    {allUsers && searching.map((u, index) => (
                        <div key={index}>

                            <div className="user">
                                <p> {u.name}</p>
                                <button onClick={() => ban(u._id)}>{u.banned === false ? ("ban") : ("unBan")}</button>


                            </div>
                        </div>

                    ))}
                </div> : false}
            </div>
        </section>
    )
}

export default BanUsers