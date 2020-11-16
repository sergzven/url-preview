import React, {useEffect, useState} from 'react';
import Loader from "../../components/loader/loader";
import ReactShadowRoot from 'react-shadow-root';

import './url-viewer.css';

const SCRIPT_REGEX = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;

const UrlViewer = ({url}) => {

    const [loading, setLoading] = useState(false);
    const [htmlDoc, setHtmlDoc] = useState(null);

    const fetchPage = url => {
        setLoading(true);
        fetch(url).then(response => {
            return response.text();
        }).then(string => {
            setLoading(false);
            setHtmlDoc(string)
        }).catch(err => {
            setLoading(false);
            console.log('Fetch Error', err);
        });
    }

    const removeScripts = (htmlText) => {
        return htmlText.replace(SCRIPT_REGEX, '');
    }

    useEffect(() => {
        if(url) fetchPage(url);
    }, [url]);

    return(
        <>
            <div className="url-viewer border shadow mb-5 bg-white rounded">
                <Loader loading={loading} />
                <div className="position-relative">
                    <ReactShadowRoot>
                        {!!htmlDoc && <div dangerouslySetInnerHTML={{ __html: removeScripts(htmlDoc)}} />}
                    </ReactShadowRoot>
                </div>
            </div>
        </>
    )
}

export default UrlViewer;
