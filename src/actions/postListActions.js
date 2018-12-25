
import database from '../base/firebase/firebase';


export const addPost = (post) => ({
    type: 'ADD_POST',
    post
  });

  export const startAddPost = (postData = {}) => {
    console.log(postData)
    return (dispatch) => {
      const {
        text = '',
        date = '',
        imgUrl = ''
      } = postData;
      const post = { text, date, imgUrl };
  
      return database.ref('posts').push(post).then((ref) => {
        dispatch(addPost({
          ...post
        }));
      });
    };
  };

  // SET_POSTS
export const setPosts = (posts) => ({
    type: 'SET_POSTS',
    posts
  });
  
  export const startSetExpenses = () => {
    return (dispatch) => {
      return database.ref('posts').once('value').then((snapshot) => {
        const posts = [];
  
        snapshot.forEach((childSnapshot) => {
            posts.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
  
        dispatch(setPosts(posts));
      });
    };
  };
  

