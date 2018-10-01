import React from 'react';
import { Link } from 'react-router-dom';

export default NotFound = () => {
    return (
        <div className="boxed-view">
          <div className="boxed-view__box">
            <p>Page NotFound</p>
            <p>We're unable to find that page.</p>
            <Link to="/" className="button--link">HEAD HOME</Link>
          </div>
        </div>
    );
}

