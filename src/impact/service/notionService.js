import {Client} from "@notionhq/client";

import config from "../../utils/config.js";

const notion = new Client({
  auth: config.NOTION_API_SECRET
})

export const saveCarbonHeroLeadToNotion = async email => {
  const databaseId = 'ab88b38e11bf48c3af04e74fe3e0802b'

  try {
    return await notion.pages.create({
      parent: {
        database_id: databaseId
      },
      properties: {
        'E-mail': {
          type: 'title',
          title: [
            {
              type: 'text',
              text: {
                content: email
              }
            }
          ]
        },
        'Date': {
          type: 'date',
          date: {
            start: new Date()
          }
        }
      }
    });
  } catch (error) {
    return Error(`Error saving Carbon Hero Lead to notion. ${error.body}`)
  }
}
