import React, {useState, useEffect} from 'react';
import UrlViewer from "../url-viewer/url-viewer";

import './view-checker.css'

const URL_REGEX = /\b(https?::?\/\/)?\S+\.\S+[^\W]+/gi;
const HTTP_REGEX = /^https?::?\/\//;

const UrlChecker = () => {

    const [text, setText] = useState('');
    const [urls, setUrls] = useState([]);

    useEffect(()=>{
        detectUrl(text);
    }, [text]);

    useEffect(()=>{
        console.log('urls', urls);
    }, [urls]);

    const normalizeUrl = url => {
        if(!url.match(HTTP_REGEX)) return 'https://'+url;
        return url;
    }

    const detectUrl = (str) => {
        const newUrls = str.match(URL_REGEX) || [];
        const normalizedUrls = newUrls.map(url => normalizeUrl(url));
        setUrls(normalizedUrls);
    }

    return(
        <div className="url-view-wrapper py-3">
            <div className="container mb-3">
                <h2>Share your link</h2>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        id="linkString"
                        value={text}
                        onChange={ e => setText(e.target.value)}
                    />
                </div>
            </div>
            <div className="container url-viewers-list">
                {
                    !!urls.length && urls.map((url, index) => <UrlViewer key={index} url={url} />)
                }
            </div>
        </div>
    )
}

export default UrlChecker;
