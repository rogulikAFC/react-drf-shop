import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import './css/btn.css'
import './css/reset-default-styles.css'
import './css/main-styles.css'
import './css/header.css'
import './css/product.css'
import './css/products.css'
import './css/footer.css'

import { Context } from "./hooks/ProductsContext"


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Context>
            <App />
        </Context>
    </React.StrictMode>
);
