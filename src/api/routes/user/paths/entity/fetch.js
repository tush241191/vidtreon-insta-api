import axios from "axios";
import {request, Router} from "express";
import InstaFeedService from "../../../../../services/instaFeed.js";

import UserService from "../../../../../services/user.js";
import { requireValidUuid } from "../../../../middlewares/validate.js";
import urls from "../../../../urls.js";

const router = Router();
const middlewares = [requireValidUuid]

export const InstaStatusTypes = {
  PUBLISHED: 'Published',
  NOT_PUBLISHED: 'Not Published',
  RETRY: 'Retry',
} 

const buildInstaData = (data,userId) => {
  const instaData = {
    user_id: userId,
    caption: data.caption ? data.caption : '',
    feed_id: data.id,
    media_type: data.media_type,
    media_url: data.media_url,
    status: InstaStatusTypes.NOT_PUBLISHED,
    title: data.title ? data.title : '',
    desciption: data.desciption ? data.desciption : '',
  };

  return instaData;
};

router.get(urls.user.entity.fetch, middlewares, async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await UserService.get(userId);

    if (user) {
      const link = `https://graph.instagram.com/me/media?fields=id,media_type,media_url,caption&access_token=${user.insta_token}`;
      axios.get(link).then(res => {
        if(res.data.data){
          res.data.data.map(async data => {
            const instaData = buildInstaData(data,userId);
            const user = await InstaFeedService.createInstaFeed(instaData);
          })
        }        
      })
      
    }

    const response = {"message": "success"};//buildListResponse(producerList);
    res.json(response);
  } catch (err) {
    res
      .status(400)
      .json({error: "Failed to fetch insta feeds list", message: err.message});
  }
});

export default router;
