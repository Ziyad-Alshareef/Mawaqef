import { useState, useEffect } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import Note from "../components/Note"
import { ACCESS_TOKEN, REFRESH_TOKEN , ROLE_TOKEN, AUTHORIZED_TOKEN} from "../constants";
import "../styles/Home.css"

function operator() {
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        getNotes();
        const checkAdminRole = async () => {
            const accessToken = localStorage.getItem(ACCESS_TOKEN);
            console.log(accessToken);
            if (!accessToken) {
              navigate("/login");
              return;
            }
      
            try {
              const userRes = await api.get("/api/user/");
              if (userRes.data.role !== "operator") {
                navigate("/");
              } else {
                // code
              }
            } catch (error) {
              console.error("Unauthorized", error);
              navigate("/login");
            }
          };
          checkAdminRole();
    }, []);
    console.log(localStorage.getItem("ACCESS_TOKEN"));
    const getNotes = () => {
        api
            .get("/api/notes/")
            .then((res) => res.data)
            .then((data) => {
                setNotes(data);
                console.log(data);
            })
            .catch((err) => alert(err));
    };

    const deleteNote = (id) => {
        api
            .delete(`/api/notes/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Note deleted!");
                else alert("Failed to delete note.");
                getNotes();
            })
            .catch((error) => alert(error));
    };

    const createNote = (e) => {
        e.preventDefault();
        api
            .post("/api/notes/", { content, title })
            .then((res) => {
                if (res.status === 201) alert("Note created!");
                else alert("Failed to make note.");
                getNotes();
            })
            .catch((err) => alert(err));
    };
    
    return (
        <div>
            <div>
                <h2>Notes</h2>
                {notes.map((note) => (
                    <Note note={note} onDelete={deleteNote} key={note.id} />
                ))}
            </div>
            <h2>Create a Note</h2>
            <form onSubmit={createNote}>
                <label htmlFor="title">Title:</label>
                <br />
                <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
                <label htmlFor="content">Content:</label>
                <br />
                <textarea
                    id="content"
                    name="content"
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <br />
                <input type="submit" value="Submit"></input>
            </form>
        </div>
    );
}

export default operator;
