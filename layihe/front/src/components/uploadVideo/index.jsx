import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../authContext";
import "./index.scss"; // Import SCSS file

const UploadReel = () => {
    const { user } = useContext(AuthContext);
    const [video, setVideo] = useState(null);
    const [cont, setCont] = useState("");

    const handleUpload = async () => {
        if (!video || !cont) {
            alert("Please select a video and provide context");
            return;
        }

        const formData = new FormData();
        formData.append("video", video);
        formData.append("creator", user?._id);
        formData.append("context", cont);

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
        <section className="upload-reel">
            <div className="container">
                <div className="card">
                    <h2>Upload Your Reel</h2>
                    <label htmlFor="context">Context:</label>
                    <input id="context" type="text" placeholder="Enter context..." onChange={(e) => setCont(e.target.value)} />

                    <label htmlFor="video-upload" className="file-label">
                        Choose a video
                        <input id="video-upload" type="file" accept="video/*" onChange={(e) => setVideo(e.target.files[0])} />
                    </label>

                    <button onClick={handleUpload}>Upload</button>
                </div>
            </div>
        </section>
    );
};

export default UploadReel;
