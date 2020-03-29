import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Landing } from './features/layout/Landing';
import { Country } from './features/layout/Country';
import { Header } from './features/layout/Header';

function App() {
    return (
        <Router>
            <div>
                <Header />
                <Route exact path="/" component={Landing} />
                <Route exact path="/country/:country" component={Country} />
            </div>
        </Router>
    );
}

export default App;
