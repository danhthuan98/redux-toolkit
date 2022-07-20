import React from 'react';
import { Link } from 'react-router-dom';

/**
* @author ThuanND
* @function 
**/

const ErrorPage = ({ fetchError }) => {
    return (
        <div>
            <h2 style={{ color: 'red' }}> {fetchError} </h2>
            <p>Well, that's disappointing.</p>
            <Link to='/'>Visit Our Homepage</Link>
        </div>
    )
}

export default ErrorPage;