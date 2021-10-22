import React, { useState, useEffect } from 'react';
import NotFound from './NotFound';
import { RichText } from 'prismic-reactjs';

import { queryHomeContent } from '../utils/prismicQueries';
import styles from '../styles/Home.module.scss';

const Home = (props) => {
    const [homeDoc, setHomeDoc] = useState(null);
    const [notFound, toggleNotFound] = useState(false);

    useEffect(() => {
        const fetchHomeContent = async () => {
            const queryResponse = await queryHomeContent();
            const homeDocContent = queryResponse.data.home;
            if (homeDocContent) {
                setHomeDoc(homeDocContent);
            } else {
                toggleNotFound(true);
            }
        };
        fetchHomeContent();
    }, []);


    if (homeDoc) {
        return (
            <div className={styles.HomeWrap}>
                <img src="/images/tekode_logo.svg" alt="" className={styles.HomeLogo}/>
                <div className={styles.HomeContentWrap}>
                { homeDoc.title ? <h1 className={[styles.HomeTitle].join(' ')}>{RichText.asText(homeDoc.title)}</h1> : null}
                <p className={styles.HomeCopy}>coming soon</p>
                </div>
            </div>
        );
    } else if (notFound) {
        return <NotFound />;
    } else {
        return null;
    }
}

export default Home;