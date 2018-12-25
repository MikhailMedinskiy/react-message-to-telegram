import React from 'react';
import Form from './../Form/form';
import Postlist from '../PostList/Postlist';
import styles from './../../styles/componets/app.module.scss'

const App = () => ( 
    <div className={styles.content}>
        <Form />
        <Postlist />
    </div>
)

export default App;