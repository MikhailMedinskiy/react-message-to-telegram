import React from 'react';
import styles from './../../styles/componets/article.module.scss';


const PostItem = (props) => {
    const {imgUrl, text, date } = props.post;
    return(
        <article className={styles.article}>
            <figure>
                {imgUrl && <img src={imgUrl} alt=""/>}
                <p>{text}</p>
                <p>{date}</p>
            </figure>
        </article>
    )
}

export default PostItem;