import { Client } from '@notionhq/client';
import { NOTION_API_CONFIG } from './config';

const notion = new Client({
  auth: NOTION_API_CONFIG.token
});

async function createPageAndComment() {
  try {
    // 새 페이지 생성
    const newPage = await notion.pages.create({
      parent: {
        page_id: '1cf7e1e133b48081a606ee0c5937683f'
      },
      properties: {
        title: {
          title: [
            {
              text: {
                content: 'Notion MCP Test Page'
              }
            }
          ]
        }
      }
    });

    console.log('새 페이지 생성됨:', newPage.id);

    // 생성된 페이지에 댓글 달기
    const comment = await notion.comments.create({
      parent: {
        page_id: newPage.id
      },
      rich_text: [
        {
          text: {
            content: 'Hello MCP from AI Assistant!'
          }
        }
      ]
    });

    console.log('댓글 작성됨:', comment);
  } catch (error) {
    console.error('오류 발생:', error);
  }
}

createPageAndComment();
