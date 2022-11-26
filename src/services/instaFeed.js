import {InstaFeed} from "../models/init.js";
import BaseService from "./BaseService.js";

class InstaFeedService extends BaseService {

  static async createInstaFeed(instaData) {
   
    try {
      const instaFeed = await InstaFeed.create({
        data: instaData
      });

      return instaFeed;
    } catch (err) {
      console.log(err)
      throw new DatabaseError(err);
    }
  }

}

export default InstaFeedService;