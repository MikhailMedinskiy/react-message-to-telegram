import axios from 'axios';
import { mainUrl, chatId, sendPhotoText, CaptionTypeText, sendMessageText, textTypeText} from './constants';


const telegrmaBotApi = async ({text='', imgUrl=null}) => {
  let requesType = sendPhotoText
  let textType = CaptionTypeText
  if(!imgUrl){
    requesType = sendMessageText
    textType = textTypeText
  }
  console.log('request')
  const response = await axios({
    method: 'post',
    url: `${mainUrl}/${requesType}?chat_id=-${chatId}&${textType}=${text}`,
    data: {
      photo: imgUrl,
    },
    headers: {
      'Content-Type': 'application/json, text/plain,',
    },
  });

  if (response.status <= 400) {
    return response.data;
  }

  throw new Error(response.status);
};


export default telegrmaBotApi;
