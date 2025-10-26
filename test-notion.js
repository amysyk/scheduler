// Test Notion API connection
const { Client } = require('@notionhq/client');

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const pageId = process.env.NOTION_SCHEDULE_PAGE_ID;

console.log('Testing Notion API...');
console.log('Page ID:', pageId);
console.log('API Key:', process.env.NOTION_API_KEY ? 'Set (length: ' + process.env.NOTION_API_KEY.length + ')' : 'NOT SET');

async function test() {
  try {
    // First, try to retrieve the page itself
    console.log('\n1. Testing page retrieval...');
    const page = await notion.pages.retrieve({ page_id: pageId });
    console.log('✓ Page found:', page.id);

    // Then try to get blocks
    console.log('\n2. Testing blocks retrieval...');
    const blocks = await notion.blocks.children.list({
      block_id: pageId,
      page_size: 10,
    });
    console.log('✓ Blocks retrieved:', blocks.results.length);

    console.log('\n✅ SUCCESS! Notion API is working correctly.');

  } catch (error) {
    console.error('\n❌ ERROR:', error.code);
    console.error('Message:', error.message);

    if (error.code === 'object_not_found' || error.code === 'NOT_FOUND') {
      console.error('\nPossible causes:');
      console.error('1. The page ID is incorrect');
      console.error('2. The integration has not been added to the page');
      console.error('3. The page has been deleted or moved');
      console.error('\nTo fix:');
      console.error('- Open the Notion page in your browser');
      console.error('- Click "..." (three dots) in the top right');
      console.error('- Select "Add connections"');
      console.error('- Choose your "Scheduling Assistant" integration');
    } else if (error.code === 'unauthorized') {
      console.error('\nThe API key is invalid or expired.');
      console.error('Get a new one at: https://www.notion.so/my-integrations');
    }
  }
}

test();
