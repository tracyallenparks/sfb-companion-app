import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({
        title=`SFB Companion App`,
        description=`Companion app for use with Star Fleet Battles`,
        name=`SFB Companion App`,
        type=`article`
    }) => {
    return(
        <Helmet>
            { /* Standard metadata tags */ }
            <title>{`${name} | ${title}`}</title>
            <meta name="description" content={description} />
            <meta charSet="utf-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge, chrome=1" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="author" content="PetterOfCats" />
            { /* End standard metadata tags */ }
            { /* Facebook tags */ }
            <meta property="og:type" content={type} />
            <meta property="og:title" content={`${name} | ${title}`} />
            <meta property="og:description" content={description} />
            { /* End Facebook tags */ }
            { /* Twitter tags */ }
            <meta name="twitter:creator" content={name} />
            <meta name="twitter:card" content={type} />
            <meta name="twitter:title" content={`${name} | ${title}`} />
            <meta name="twitter:description" content={description} />
            { /* End Twitter tags */ }
            {/* Favicons Links */}
            <link rel="apple-touch-icon" sizes="180x180" href="../apple-touch-icon.png" />
            <link rel="icon" sizes="32x32" href="../favicon-32x32.png" />
            <link rel="icon" sizes="16x16" href="../favicon-16x16.png" />
            {/* End Favicons Links */}
        </Helmet>
    )
}

export default SEO;