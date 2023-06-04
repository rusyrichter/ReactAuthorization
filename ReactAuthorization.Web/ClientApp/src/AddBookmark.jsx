import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const AddBookmark = () => {
    const [title, setTitle] = useState('');
    const [URL, setUrl] = useState('');

    const navigate = useNavigate();

    const onAddClick = async () => {
        await axios.post('/api/auth/addBookmark', { title, URL });
        await navigate('/mybookmarks')
    }

    return (

        <div className="container" style={{ marginTop: "80px" }}>
            <main role="main" className="pb-3">
                <div className="row" style={{ minHeight: "80vh", display: "flex", alignItems: "center" }}>
                    <div className="col-md-6 offset-md-3 bg-light p-4 rounded shadow">
                        <h3>Add Bookmark</h3>
                        <input onChange={e => setTitle(e.target.value)} type="text" name="title" placeholder="Title" className="form-control" value={title} /><br />
                        <input onChange={e => setUrl(e.target.value)} type="text" name="url" placeholder="Url" className="form-control" value={URL} /><br />
                        <button onClick={onAddClick} className="btn btn-primary">Add</button>
                    </div>
                </div>
            </main>
        </div>

    );
}

export default AddBookmark;