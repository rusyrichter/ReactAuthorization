import React, { useState } from 'react';
import { useEffect } from 'react';
import { useAuth } from './AuthContextComponent';
import axios from 'axios'



const Home = () => {

    const { user } = useAuth();
    const [bookmarks, setBookmarks] = useState([]);

    useEffect(() => {
        const loadConfirmed = async () => {
            const { data } = await axios.get('/api/auth/getTopfive');
            setBookmarks(data);
            console.log(data);
        }
        loadConfirmed();
    }, []);

    
    return (

        <div>
            {user ? <h1>Welcome back {user.firstName} {user.lastName}</h1> : <h1>Welcome To the react Bookmark application!</h1>}
           
            <table className="table table-hover table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Url</th>
                        <th>Count</th>                        
                    </tr>
                   
                    {bookmarks.map(b => {
                        return <tr key={b}>
                            <td>
                                <a href='{b.url}' target='_blank'>{b.url}</a>
                            </td>  
                            <td>
                                {b.userCount}
                            </td>  
                        </tr>
                    })}
                   
                </thead>
               
            </table>
        </div>
    );
}

export default Home;