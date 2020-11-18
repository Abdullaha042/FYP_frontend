import React from 'react';
import logo from './logo.svg';

import 'antd/dist/antd.css'; // or 'antd/dist/antd.less

import CustomLayout from './containers/Layout'
import ArticleList from './containers/ArticleListView'
import NavBar from './components/NavBar'
import SignIn from './components/SignIn'
import SignUpModal from './components/SignUpModal'
import Footer from './components/Footer'


function App() {
  return (
    <div className="App">
    <NavBar />
    <Footer />

    </div>
  );
}

export default App;
