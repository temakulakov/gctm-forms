import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {ConfigProvider} from "antd";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <ConfigProvider
        theme={{
            token: {
                // Seed Token
                colorPrimary: '#9D2135',
                borderRadius: 5,
                

                // Alias Token
                colorBgContainer: '#F8F1F6',
            },
        }}
    >
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    </ConfigProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
