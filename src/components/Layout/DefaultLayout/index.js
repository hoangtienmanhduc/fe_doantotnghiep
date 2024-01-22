import React from 'react';
import Header from '~/components/Layout/components/Header/Header';

function DefaultLayout({ children }) {
    return (
        <React.Fragment>
            <Header />
            <div className="col-12">{children}</div>
        </React.Fragment>
    );
}

export default DefaultLayout;
