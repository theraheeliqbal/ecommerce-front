import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import Card from './Card';
import { getCategories, getFilteredProducts } from './apiCore';
import Checkbox from './Checkbox';
import RadioBox from './RadioBox'
import { prices } from './fixedPrices'

const Shop = () => {
    const [myFilters, setMyFilters] = useState({
        filters: { category: [], price: [] }
    });
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);
    const [limit, setLimit] = useState(6);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(0);
    const [filteredResults, setFilteredResults] = useState([]);


    // load categories and set form data
    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setCategories(data);
            }
        });
    };

    const loadFilteredResults = newFilters => {
        //console.log(newFilters);
         (skip, limit, newFilters).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setFilteredResults(data.data);
                setSize(data.size);
                setSkip(0); // for load more
            }
        });
    };

    const loadMore = () => {
        let toSkip = skip + limit; // initalilly skip=0, limit=6
        getFilteredProducts(toSkip, limit, myFilters.filters).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setFilteredResults([...filteredResults, ...data.data]); // add more 6 more data to filteredResults
                setSize(data.size);
                setSkip(toSkip);
            }
        });
    };

    const loadMoreButton = () => {
        return (
            size > 0 &&
            size >= limit && (
                <button onClick={loadMore} className="btn btn-warning mb-5">
                    Load more
                </button>
            )
        );
    };

    useEffect(() => {
        init();
        loadFilteredResults(skip, limit, myFilters.filters);
    }, [])


    const handleFilters = (filterValues, filterBy) => {
        console.log("Handlefilter", filterValues, filterBy);
        const newFilters = { ...myFilters };
        newFilters.filters[filterBy] = filterValues;

        if (filterBy === "price") {
            let priceValues = handlePrice(filterValues);
            newFilters.filters[filterBy] = priceValues;
        }
        loadFilteredResults(myFilters.filters);

        setMyFilters(newFilters);
    };

    const handlePrice = value => {
        const data = prices; // prices is imported {prices} from fixedPrices.js
        let pArray = [];

        for (let key in data) { // get the key out of data/fixedPrices
            if (data[key]._id === parseInt(value)) {
                pArray = data[key].array; // fixedPrices array
            }
        }
        return pArray;
    };



    return (
        <Layout title="Shop" description="This is Shoping page" className="container-fluid col-md-8 offset-md-2">
            <div className="row">
                <div className="col-4">
                    <h4>Filter by Categories</h4>
                    <ul> {/* As Check is <li> 
                             filters are newCheckedCategoriesId from Checkbox, Link below data from child to parent
                             https://www.freecodecamp.org/news/pass-data-between-components-in-react/ */}
                        <Checkbox
                            categories={categories}
                            setFilters={(newCheckedCategoriesId) => handleFilters(newCheckedCategoriesId, "category")}
                        />
                    </ul>

                    <h4>Filter by price range</h4>
                    <div>
                        <RadioBox
                            prices={prices}
                            setFilters={filters =>
                                handleFilters(filters, "price")
                            }
                        />
                    </div>

                </div>
                <div className="col-8">
                    <h2 className="mb-4">Products</h2>
                    <div className="row">
                        {filteredResults.map((product, i) => (
                            <Card key={i} product={product} />
                        ))}
                    </div>
                    {loadMoreButton()}
                </div>
            </div>



        </Layout>
    )
};
export default Shop;