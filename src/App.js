import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Summary } from './features/layout/Summary';
import { Country } from './features/layout/Country';
import { Testing } from './features/layout/Testing';
import { Head } from './features/layout/Header';
import { Footer } from './features/layout/Footer';

function App() {
    return (
        <Router>
            <Head />
            <Route exact path="/" component={Summary} />
            <Route exact path="/country/:country" component={Country} />
            <Route exact path="/testing" component={Testing} />
            <Footer />
        </Router>
    );
}

export default App;
