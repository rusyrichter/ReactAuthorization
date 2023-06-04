import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout'
import Signup from './Signup'
import Home from './Home'
import Login from './Login'
import { AuthContextComponent } from './AuthContextComponent';
import MyBookmarks from './MyBookmarks';
import AddBookmark from './AddBookmark';
import Logout from './Logout';
import PrivateRoute from './PrivateRoute'



class App extends React.Component {

    render() {
        return (
            <AuthContextComponent>
                <Layout>
                    <Routes>
                        <Route exact path='/' element={<Home />} />
                        <Route exact path='/signup' element={<Signup />} />
                        <Route exact path='/login' element={<Login />} />
                        <Route exact path='/mybookmarks' element={
                            <PrivateRoute>
                                <MyBookmarks />
                            </PrivateRoute>
                        } />
                        <Route exact path='/AddBookmark' element={
                            <PrivateRoute>
                                <AddBookmark />
                            </PrivateRoute>
                        } />
                        <Route exact path='/logout' element={
                            <PrivateRoute>
                                <Logout />
                            </PrivateRoute>
                        } />
                    </Routes>
                </Layout>
            </AuthContextComponent>
        );
    }
};

export default App;