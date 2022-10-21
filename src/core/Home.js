import React, { useState, useEffect } from 'react';
import Layout from './Layout'
import { getProducts } from "./apiCore"
import Card from './Card'

const Home = () => {
    const [productsBySell, setProductsBySell] = useState([]);
    const [productsByArrival, setProductsByArrival] = useState([]);
    const [error, setError] = useState();

    const loadProductBySell = () => {
        getProducts('sold').then(data => {
            if(data.error){
                setError(data.error)
            } else {
                setProductsBySell(data)
            }
        })
    }

    const loadProductByArrival = () => {
        getProducts('createdAt').then(data => { // by arrival
            if(data.error){
                setError(data.error)
            } else {
                setProductsByArrival(data)
            }
        })
    }
    

    useEffect(() => {
        loadProductByArrival();
        loadProductBySell();
    }, [])

    return (
        <Layout title="Home Page" description="Node E-commerce front-end" className="container col-md-8 offset-md-2">
            <h2 className="mb-4">New Arrival</h2>
            <div className="row">
            {productsByArrival.map((product, i) => (
                <Card key={i} product={product} />
            ))}
            </div>

            <h2 className="mb-4">Best Seller</h2>
            <div className="row">
            {productsBySell.map((product, i) => (
                <Card key={i} product={product} />
            ))}
            </div>

        </Layout>
    )
}

export default Home;