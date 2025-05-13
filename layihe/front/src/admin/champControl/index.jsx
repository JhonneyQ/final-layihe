import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import './index.scss';
import { AuthContext } from '../../components/authContext';

const ChampCont = () => {
    const [champs, setChamps] = useState([]);
    const [filters, setFilters] = useState({
        Assassin: false,
        Fighter: false,
        Mage: false,
        Support: false,
        Tank: false,
        Marksman: false,
    });
    const [search, setSearch] = useState('');
    const [selectedChamp, setSelectedChamp] = useState(null);
    const [champToDelete, setChampToDelete] = useState(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [newData, setNewData] = useState({
        name: "",
        type: "",
        stats: [{ hp: "", armor: "", mr: "" }],
        image: "",
        title: "",
        icon: "",
        description: "",
        background: "",
        skills: ["", "", "", ""]
    });
    const { token } = useContext(AuthContext);

    const getData = async () => {
        try {
            const res = await axios('http://localhost:8080/api/champions/');
            setChamps(res.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteChampion = async () => {
        if (!champToDelete) return;
        await axios.delete(`http://localhost:8080/api/champions/${champToDelete}`);
        setChamps(champs.filter(champ => champ._id !== champToDelete));
        setChampToDelete(null);
    };

    // const validateForm = () => {
    //     const { name, type, stats, skills } = newData;
    //     if (!name || !type || !stats[0].hp || !stats[0].armor || !stats[0].mr || skills.some(skill => !skill)) {
    //         alert("Please fill out all required fields.");
    //         return false;
    //     }
    //     return true;
    // };

    const updateChampion = async () => {
        // if (!validateForm()) return;

        if (!selectedChamp) return;
        await axios.put(`http://localhost:8080/api/champions/${selectedChamp._id}`, newData);
        setSelectedChamp(null);
        getData();
    };

    const createChampion = async () => {
        // if (!validateForm()) return;

        try {
            await axios.post('http://localhost:8080/api/champions', newData);
            setIsCreateModalOpen(false);
            setNewData({
                name: "",
                type: "",
                stats: [{ hp: "", armor: "", mr: ""}],
                image: "",
                title: "",
                icon: "",
                description: "",
                background: "",
                skills: ["", "", "", ""]
            });
            getData();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const handleFilterChange = (e) => {
        const { name, checked } = e.target;
        setFilters({
            ...filters,
            [name]: checked,
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewData({
            ...newData,
            [name]: value,
        });
    };

    const handleStatsChange = (e, index) => {
        const { name, value } = e.target;
        const updatedStats = [...newData.stats];
        updatedStats[index] = { ...updatedStats[index], [name]: value}; // Convert to number
        setNewData({
            ...newData,
            stats: updatedStats,
        });
    };


    const handleSkillsChange = (e, index) => {
        const { value } = e.target;
        const updatedSkills = [...newData.skills];
        updatedSkills[index] = value;
        setNewData({
            ...newData,
            skills: updatedSkills,
        });
    };

    const filteredChamps = champs.filter((champ) => {
        if (!Object.values(filters).some((value) => value)) {
            return true;
        }
        return filters[champ.type];
    });

    const searched = filteredChamps.filter((q) =>
        q.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="all">
            <div className="side">
                <div className="filtt">
                    <input
                        className="search"
                        type="search"
                        autoComplete="off"
                        placeholder="Search"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="check">
                    {Object.keys(filters).map((filter) => (
                        <div className="filt" key={filter}>
                            <div className="par">
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
                <button className="create-btn" onClick={() => setIsCreateModalOpen(true)}>
                    Create New Champion
                </button>
            </div>
            <div className="champs">
                {champs &&
                    searched.map((p) => (
                        <div className="card" key={p._id}>
                            <div className="over">
                                <img src={p.icon} alt={p.name} />
                                <div className="dark"></div>
                                <div className="lay">
                                    <p>{p.name}</p>
                                    <button className="delete-btn" onClick={() => setChampToDelete(p._id)}>
                                        Delete
                                    </button>
                                    <button onClick={() => {
                                        setSelectedChamp(p);
                                        setNewData(p);
                                    }}>Edit</button>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>

            {selectedChamp && (
                <div className="modal-overlay">
                    <div className="modal">
                        <button className="close-btn" onClick={() => setSelectedChamp(null)}>
                            &times;
                        </button>
                        <h2>Edit {selectedChamp.name}</h2>
                        <img src={selectedChamp.icon} alt={selectedChamp.name} />
                        <p>Type: {selectedChamp.type}</p>
                        <input type="text" name="name" value={newData.name} onChange={handleInputChange} placeholder="Name" />
                        <input type="text" name="title" value={newData.title} onChange={handleInputChange} placeholder="Title" />
                        <input type="text" name="description" value={newData.description} onChange={handleInputChange} placeholder="Description" />
                        <input type="text" name="image" value={newData.image} onChange={handleInputChange} placeholder="Image URL" />
                        <input type="text" name="icon" value={newData.icon} onChange={handleInputChange} placeholder="Icon URL" />
                        <input type="text" name="background" value={newData.background} onChange={handleInputChange} placeholder="Background URL" />
                        <input type="text" name="hp" value={newData.stats[0].hp} onChange={(e) => handleStatsChange(e, 0)} placeholder="HP" />
                        <input type="text" name="armor" value={newData.stats[0].armor} onChange={(e) => handleStatsChange(e, 0)} placeholder="Armor" />
                        <input type="text" name="mr" value={newData.stats[0].mr} onChange={(e) => handleStatsChange(e, 0)} placeholder="Magic Resist" />
                        <input type="text" value={newData.skills[0]} onChange={(e) => handleSkillsChange(e, 0)} placeholder="Skill 1" />
                        <input type="text" value={newData.skills[1]} onChange={(e) => handleSkillsChange(e, 1)} placeholder="Skill 2" />
                        <input type="text" value={newData.skills[2]} onChange={(e) => handleSkillsChange(e, 2)} placeholder="Skill 3" />
                        <input type="text" value={newData.skills[3]} onChange={(e) => handleSkillsChange(e, 3)} placeholder="Skill 4" />
                        <div className="modal-buttons">
                            <button className="save-btn" onClick={updateChampion}>Save</button>
                            <button className="close-btn" onClick={() => setSelectedChamp(null)}>Close</button>
                        </div>
                    </div>
                </div>
            )}

            {isCreateModalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <button className="close-btn" onClick={() => setIsCreateModalOpen(false)}>
                            &times;
                        </button>
                        <h2>Create New Champion</h2>
                        <input type="text" name="name" value={newData.name} onChange={handleInputChange} placeholder="Name" />
                        <input type="text" name="type" value={newData.type} onChange={handleInputChange} placeholder="Type" />
                        <input type="text" name="title" value={newData.title} onChange={handleInputChange} placeholder="Title" />
                        <input type="text" name="description" value={newData.description} onChange={handleInputChange} placeholder="Description" />
                        <input type="text" name="image" value={newData.image} onChange={handleInputChange} placeholder="Image URL" />
                        <input type="text" name="icon" value={newData.icon} onChange={handleInputChange} placeholder="Icon URL" />
                        <input type="text" name="background" value={newData.background} onChange={handleInputChange} placeholder="Background URL" />
                        <input type="text" name="hp" value={newData.stats[0].hp} onChange={(e) => handleStatsChange(e, 0)} placeholder="HP" />
                        <input type="text" name="armor" value={newData.stats[0].armor} onChange={(e) => handleStatsChange(e, 0)} placeholder="Armor" />
                        <input type="text" name="mr" value={newData.stats[0].mr} onChange={(e) => handleStatsChange(e, 0)} placeholder="Magic Resist" />
                        <input type="text" value={newData.skills[0]} onChange={(e) => handleSkillsChange(e, 0)} placeholder="Skill 1" />
                        <input type="text" value={newData.skills[1]} onChange={(e) => handleSkillsChange(e, 1)} placeholder="Skill 2" />
                        <input type="text" value={newData.skills[2]} onChange={(e) => handleSkillsChange(e, 2)} placeholder="Skill 3" />
                        <input type="text" value={newData.skills[3]} onChange={(e) => handleSkillsChange(e, 3)} placeholder="Skill 4" />
                        <div className="modal-buttons">
                            <button className="save-btn" onClick={createChampion}>Create</button>
                            <button className="close-btn" onClick={() => setIsCreateModalOpen(false)}>Close</button>
                        </div>
                    </div>
                </div>
            )}

            {champToDelete && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>Are you sure?</h2>
                        <p>This action cannot be undone.</p>
                        <div className="modal-buttons">
                            <button className="delete-confirm-btn" onClick={deleteChampion}>Yes, Delete</button>
                            <button className="close-btn" onClick={() => setChampToDelete(null)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChampCont;