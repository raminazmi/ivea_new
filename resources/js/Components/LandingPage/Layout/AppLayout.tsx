import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface Props {
    children: React.ReactNode;
}

const AppLayout: React.FC<Props> = ({ children }) => {
    return (
        <div className="font-sans relative min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
        </div>
    );
};

export default AppLayout;
