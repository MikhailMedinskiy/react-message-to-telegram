import React from 'react';
import { connect } from 'react-redux';
import PostItem from './../PostItem/PostItem'
import styles from './../../styles/componets/article.module.scss';
import uuidv4 from 'uuid/v4'

const Postlist = (props) => (
    <div className={styles.wrapper}>
    <p className={styles.title}>All last post</p>
    {
        props.posts.length === 0 ? (
            <p>no posts</p>
        ) : (
            props.posts.map((post)=>(
                <PostItem key={uuidv4()} post={post}/>
            ))
        )
    }</div>
);

const mapStateToProps = state => ({
    posts: state.posts,
  });
  
  
  export default connect(mapStateToProps)(Postlist);
  