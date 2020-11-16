import React, {useEffect, useState} from 'react';
import Loader from "../../components/loader/loader";
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

    useEffect(() => {
        fetchPage(url);
    }, [url]);

    return(
        <>
            <div className="url-viewer shadow mb-5 bg-white rounded">
                <Loader loading={loading} />
                {!!htmlDoc && <div
                    dangerouslySetInnerHTML={{ __html: htmlDoc.replace(SCRIPT_REGEX, '')}} />
                }
            </div>
        </>
    )
}

export default UrlViewer;
