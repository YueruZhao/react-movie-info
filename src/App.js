import React, { Component } from "react";
import {Provider} from 'react-redux';
import {HashRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/home/Landing';
import Movie from './components/home/Movie';
import Gallery from './components/home/Gallery';
import Detail from './components/home/Detail';
import store from './store';


class App extends Component {
    render(){
        return(
           <Provider store={store}>
               <Router>
                    <div>
                        <Navbar />
                        <Route exact path ="/" component={Landing}/>
                        <Route exact path ='/movie/:id' component={Movie} />
                        <Route exact path="/gallery" component={Gallery} />
                        <Route exact path="/detail/:id" component={Detail} />
                        <Footer />

                    </div>
                </Router>
            </Provider>
        );
    }
}
export default App;