import React from 'react';
import { connect } from 'react-redux';
import { storage } from '../../base/firebase/firebase'
import {startAddPost} from '../../actions/postListActions'
import moment from 'moment';
import telegrmaBotApi from '../../base/api/telegrmaBotApi/telegrmaBotApi';
import Dropzone from 'react-dropzone'

//styles
import styles from './../../styles/componets/form.module.scss'

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          text: '',
          date: '',
          imgFile: null,
          imgUrl: null,
        }
      }

      onDrop = (acceptedFiles, rejectedFiles) => {
        this.setState(()=>({ imgFile: acceptedFiles[0]}))
      }

      handleSentMessage = (e) => {
        const { startAddPost } = this.props;
        e.preventDefault();
        const {text, imgFile, imgUrl} = this.state;
        if(imgFile && text.length){
            const uploadTask =  storage.ref(`images/${imgFile.name}`).put(imgFile);
            uploadTask.on('state_changed', 
                (snapshot) => {
                //progress 
                console.log('progress')
                }, 
                (error) => {
                    //error
                    console.log('if error')
                    console.log(error)
                },
                () => {
                    //complete
                    storage.ref('images').child(imgFile.name).getDownloadURL().then(url => {
                        this.setState({
                            imgUrl: url
                        });
                        startAddPost({
                            text: this.state.text,
                            date: moment(new Date).format('MMMM Do YYYY, h:mm:ss a'),
                            imgUrl: this.state.imgUrl
                        })

                        telegrmaBotApi(this.state)
                        this.setState(() => ({
                            text: '',
                            date: '',
                            imgFile: null,
                            imgUrl: null,
                        }));
                    })
                })
            } else if(text.length) {
                telegrmaBotApi(this.state)
                startAddPost({
                    text: this.state.text,
                })
                this.setState(() => ({
                    text: '',
                    date: '',
                    imgFile: null,
                    imgUrl: null,
                }));
            }
      };

      handleChangeText = (e) => {
          this.setState({
            text: e.target.value 
          })
      }

      handleAddImage = (e) => {
        if(e.target.files[0]) {
            const imgFile = e.target.files[0];
            this.setState(()=>({imgFile}))
        }

      }

    render(){
        return(
            <form action="" onSubmit={this.handleSentMessage} className={styles.form}>
                <p className={styles.title}>What do you want to send? (<a href="https://t.me/joinchat/EeXk1BeMUAgkNE0_yTgTWQ" target="_blanck">our chat</a>)</p>
                <p>
                    <label className={styles.label}>Please enter your text</label>
                    <textarea 
                        type="text"
                        onChange={this.handleChangeText}
                        value={this.state.text}
                        className={styles.textfield}
                        required
                    />
                </p>

                <Dropzone onDrop={this.onDrop}>
                    {({getRootProps, getInputProps, isDragActive}) => {
                    return (
                        <div className={styles.dropzone}
                        {...getRootProps()}
                        >
                        <input {...getInputProps()} />
                        {
                            isDragActive ?
                            <p className="text">Drop files here...</p> :
                            <p className="text">Try dropping some files here, or click to select files to upload.</p>
                        }
                        {
                            this.state.imgFile && <p className='dropzone__file'>{this.state.imgFile.name}</p>
                        }
                        </div>
                    )
                    }}
                </Dropzone>
                <p className={styles.btnwapper}>
                    <button className={styles.btn}>Send message</button>
                </p>
            </form>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    startAddPost: (expense) => dispatch(startAddPost(expense))
  });
  
  export default connect(undefined, mapDispatchToProps)(Form);