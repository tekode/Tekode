import gql from 'graphql-tag';
import Cookies from 'js-cookie';
import { client } from './prismicHelpers';


const queryHomeDoc = gql`
query queryHomeDoc {
    home(uid: "home", lang:"en-us"){
        title
    }
}
`;


export const queryHomeContent = async () => {
    const previewCookie = Cookies.get('io.prismic.preview');

    const queryOptions = {
        query: queryHomeDoc
    };

    if (previewCookie) {
        queryOptions.context = {
            headers: {
                'Prismic-ref': previewCookie,
            },
        };
    }
    return client.query(queryOptions);
};