import React from 'react';
import Header from "../components/Header/Header";
import Filter from "../components/Filter/Filter";
import Card from "../components/Card/Card";

const Home = () => {
    return (
        <div>
            <Header/>
            <Filter/>
            <Card/>
        </div>
    );
};

export default Home;
