
import { BrowserRouter as Router , useRoutes } from 'react-router-dom';
import './App.css';
import React from 'react';
import { Navigate } from 'react-router';

const SpoltifyApp = React.lazy(() => import('./components/SpoltifyApp'));

function App() {

    return (
        <div className='App'>
            <SpoltifyApp />
        </div>
    );
}

export default App;
