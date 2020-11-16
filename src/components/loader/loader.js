import React from 'react';
import './loader.css';

const Loader = ({loading}) => {
    return(
        <>
            {
                loading && <div className="loader-wrap">
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            }
        </>
    )
}

export default Loader
