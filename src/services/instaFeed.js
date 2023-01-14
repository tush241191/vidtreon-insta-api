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

  static async fetchInstaFeeds(id) {
   
    try {
      return await InstaFeed.findMany({
        where: {user_id: id}
      });
    } catch (err) {
      console.log(err)
      throw new DatabaseError(err);
    }
  }

  static async fetchInstaFeedById(feedId) {
   
    try {
      return await InstaFeed.findUnique({
        where: {feed_id: feedId}
      });
    } catch (err) {
      console.log(err)
      throw new DatabaseError(err);
    }
  }

}

export default InstaFeedService;
