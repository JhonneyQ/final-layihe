import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../authContext";
import "./index.scss"



const UploadReel = () => {


    const { user, logoutUser } = useContext(AuthContext);
    const [video, setVideo] = useState(null);
    const [cont, setCont] = useState("")

    const handleUpload = async () => {
        if (!video || !cont) { // ✅ Ensure both video and context are provided
            alert("Please select a video and provide context");
            return;
        }
    
        const formData = new FormData();
        formData.append("video", video);
        formData.append("creator", user?._id);
        formData.append("context", cont); // ✅ Send context to the backend
    
        try {
            const res = await axios.post("http://localhost:8080/api/reels/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
    
            alert(`Upload Success! Video URL: ${res.data.data.videoUrl}`);
        } catch (error) {
            console.error("Upload failed:", error);
            alert("Upload failed!");
        }
    };


    
    
    return (
        <section className="post">
            <div className="container">

                <div className="all">
                    <div>
                        <label htmlFor="con">context:</label>
                        <input id="con" onChange={(e) => setCont(e.target.value)} />
                    </div>
                    <input type="file" accept="video/*" onChange={(e) => setVideo(e.target.files[0])} />
                    <button onClick={handleUpload}>Upload Reel</button>
                </div>
            </div>
        </section>
    );
};

export default UploadReel;
