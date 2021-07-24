import React, { useState, useEffect } from 'react';
import NotFound from './NotFound';
import { RichText } from 'prismic-reactjs';

import { queryHomeContent } from '../utils/prismicQueries';
import styles from '../styles/Home.module.scss';

const Home = (props) => {
    const [homeDoc, setHomeDoc] = useState(null);
    const [notFound, toggleNotFound] = useState(false);
    const [currentFont, setCurrentFont] = useState(styles.Title1);


    useEffect(() => {
        const fetchHomeContent = async () => {
            const queryResponse = await queryHomeContent();
            const homeDocContent = queryResponse.data.home;
            if (homeDocContent) {
                setHomeDoc(homeDocContent);
                setInterval(() => setRandomFont(), 500);
            } else {
                toggleNotFound(true);
            }
        };
        fetchHomeContent();
    }, []);

    /*
    * Sets random font
    */
    const setRandomFont = () => {
        let random = Math.floor(Math.random() * (10 - 1 + 1) + 1);
        let randomStyle = styles.Title1;
        switch (random) {
            case 1:
                 randomStyle = styles.Title1;
                 break;
            case 2:
                 randomStyle = styles.Title2;
                 break;
            case 3:
                 randomStyle = styles.Title3;
                 break;
            case 4:
                 randomStyle = styles.Title4;
                 break;
            case 5:
                 randomStyle = styles.Title5;
                 break;
            case 6:
                 randomStyle = styles.Title6;
                 break;
            case 7:
                randomStyle = styles.Title7;
                break;
            case 8:
                 randomStyle = styles.Title8;
                 break;
            case 9:
                 randomStyle = styles.Title9;
                 break;
            case 10:
                 randomStyle = styles.Title10;
                 break;
            default:
                return;
        }
        setCurrentFont(randomStyle);
    }

    if (homeDoc) {
        console.log(homeDoc);
        return (
            <div className={styles.HomeWrap}>
                { homeDoc.title ? <h1 className={[styles.HomeTitle, currentFont ? currentFont : ''].join(' ')}>{RichText.asText(homeDoc.title)}</h1> : null}
            </div>
        );
    } else if (notFound) {
        return <NotFound />;
    } else {
        return null;
    }
}

export default Home;