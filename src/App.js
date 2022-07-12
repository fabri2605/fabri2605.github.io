import { Suspense } from 'react';
import { BrowserRouter as Router , useRoutes } from 'react-router-dom';
import './App.css';
import MyExtra from './components/extra/MyExtra';
import React from 'react';
import { Navigate } from 'react-router';

const SpoltifyApp = React.lazy(() => import('./components/SpoltifyApp'));

function App() {
    const Routing = () => {
        let routes = useRoutes([
            { path: '/music', element: <SpoltifyApp /> },
            { path: '/', element: <Navigate to='/music' /> },
            // ...
        ]);
        return routes;
    };

    return (
        <div className='App'>
            <Suspense
                fallback={
                    <div className='centered'>
                        <MyExtra />
                    </div>
                }
            ></Suspense>
            <Router>
                <Routing />
            </Router>
        </div>
    );
}

export default App;
