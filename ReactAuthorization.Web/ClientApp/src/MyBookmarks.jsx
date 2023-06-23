import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './AuthContextComponent';

const MyBookmarks = () => {

    const [bookmarks, SetBookmarks] = useState([]);
    const [title, setTitle] = useState();
    const [editingPeopleIds, setEditingPeopleIds] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        const loadConfirmed = async () => {
            const { data } = await axios.get('/api/auth/getMyBookmarks');
            SetBookmarks(data);
        }
        loadConfirmed();
    }, []);

    const onEditClick = async (b, id) => {
        const updatedTitle = {...title, [id]: b.title}
        setTitle(updatedTitle);
        setEditingPeopleIds([...editingPeopleIds, id]);
    }

    const onUpdateClick = async (id) => {
        const updatedTitle = title[id];
        await axios.post('/api/auth/updateBookmark', { id, title: updatedTitle });
        await setEditingPeopleIds(editingPeopleIds.filter(i => i !== id));
        await setTitle({ ...title, [id]: '' });
        const { data } = await axios.get('/api/auth/getMyBookmarks');
        SetBookmarks(data);
    }

    const onDeleteClick = async (id) => {
        await axios.post('/api/auth/deleteBookmark', { id });
        const { data } = await axios.get('/api/auth/getMyBookmarks');
        await SetBookmarks(data);
    }
    const onCancelClick = (b) => {
        setEditingPeopleIds(editingPeopleIds.filter(i => i !== b.id));
        setTitle({ ...title});
    }
    return (
        <div className="container" style={{ marginTop: "80px" }}>
            <main role="main" className="pb-3">
                <div style={{ marginTop: "20px" }}>
                    <div className="row">
                        <div className="col-md-12">
                            <h1>Welcome back {user.firstName} {user.lastName}</h1>
                            <Link to="/addbookmark" className="btn btn-primary btn-block">Add Bookmark</Link>
                        </div>
                    </div>
                    <div className="row" style={{ marginTop: "20px" }}>
                        <table className="table table-hover table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Url</th>
                                    <th>Edit/Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookmarks.map(b => {
                                    return <tr key={b.id}>
                                        <td>
                                            {!!editingPeopleIds.includes(b.id) && <input type="text" className="form-control" placeholder="Title" value={title[b.id]} onChange={e => setTitle({ ...title, [b.id]: e.target.value })} />}
                                            {!editingPeopleIds.includes(b.id) && b.title}
                                        </td>
                                        <td><a href='{b.url}' target='_blank'>{b.url}</a></td>
                                        <td>
                                            {!!editingPeopleIds.includes(b.id) &&
                                                <><button className="btn btn-warning" onClick={() => onUpdateClick(b.id)}>Update</button>
                                                    <button className="btn btn-info" onClick={() => onCancelClick(b)}>Cancel</button> </>}
                                            {!editingPeopleIds.includes(b.id) && <button className="btn btn-success" onClick={() => onEditClick(b, b.id)}>Edit Title</button>}

                                            <button className="btn btn-danger" style={{ marginLeft: '10px' }} onClick={() => onDeleteClick(b.id)}>Delete</button>
                                        </td>
                                    </tr>
                                })}

                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default MyBookmarks;


                  