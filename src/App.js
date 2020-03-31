import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Landing } from './features/layout/Landing';
import { Country } from './features/layout/Country';
import { Testing } from './features/layout/Testing';
import { Head } from './features/layout/Header';
import { Footer } from './features/layout/Footer';

function App() {
    return (
        <Router>
            <div>
                <Head />
                <Route exact path="/" component={Landing} />
                <Route exact path="/country/:country" component={Country} />
                <Route exact path="/testing" component={Testing} />
                <Footer />
            </div>
        </Router>
    );
}

export default App;
