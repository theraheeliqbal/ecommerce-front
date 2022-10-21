import React, { useState } from "react";

// will receive list of categories from SHOP
const Checkbox = ({ categories, setFilters }) => { 
    const [checked, setCheked] = useState([]);


    // higher order function, handleToggle will take c as argument and return a function 
    const handleToggle = c => () => { // higher order function
        // on each check/uncheck, if currentCategoryId is found in already checked categories list then return the index of that category of -1
        const currentCategoryId = checked.indexOf(c); // return the first index or -1
        const newCheckedCategoryId = [...checked]; 
        // if currently checked was not already in checked state > push
        // else pull/take off
        if (currentCategoryId === -1) {
            newCheckedCategoryId.push(c);
        } else {
            newCheckedCategoryId.splice(currentCategoryId, 1); // UNCHECK: remove element 1 element from currentCategoryId which is index of c already check category
        }
        //console.log(newCheckedCategoryId);
        setCheked(newCheckedCategoryId);
        setFilters(newCheckedCategoryId); // newCheckedCategoryId is filters which is coming from SHOP element
        //console.log(handleFilters);
    };

    return categories.map((c, i) => (
        <li key={i} className="list-unstyled">
            <input
                onChange={handleToggle(c._id)}
                value={checked.indexOf(c._id === -1)}
                type="checkbox"
                className="form-check-input"
            />
            <label className="form-check-label">{c.name}</label>
        </li>
    ));
};

export default Checkbox;