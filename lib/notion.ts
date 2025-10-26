import { Client } from "@notionhq/client";
import {
  BlockObjectResponse,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

// Initialize Notion client
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

/**
 * Converts Notion blocks to markdown text
 */
function blockToMarkdown(block: BlockObjectResponse): string {
  const type = block.type;

  switch (type) {
    case "paragraph":
      return (
        block.paragraph.rich_text.map((t) => t.plain_text).join("") + "\n\n"
      );
    case "heading_1":
      return (
        "# " +
        block.heading_1.rich_text.map((t) => t.plain_text).join("") +
        "\n\n"
      );
    case "heading_2":
      return (
        "## " +
        block.heading_2.rich_text.map((t) => t.plain_text).join("") +
        "\n\n"
      );
    case "heading_3":
      return (
        "### " +
        block.heading_3.rich_text.map((t) => t.plain_text).join("") +
        "\n\n"
      );
    case "bulleted_list_item":
      return (
        "- " +
        block.bulleted_list_item.rich_text.map((t) => t.plain_text).join("") +
        "\n"
      );
    case "numbered_list_item":
      return (
        "1. " +
        block.numbered_list_item.rich_text.map((t) => t.plain_text).join("") +
        "\n"
      );
    case "table":
      return "(Table with " + block.table.table_width + " columns)\n\n";
    case "table_row":
      const cells = block.table_row.cells
        .map((cell) => cell.map((t) => t.plain_text).join(""))
        .join(" | ");
      return "| " + cells + " |\n";
    case "divider":
      return "---\n\n";
    default:
      return "";
  }
}

/**
 * Fetches a Notion page and converts it to markdown text
 */
export async function fetchNotionPage(pageId: string): Promise<string> {
  try {
    console.log("Notion API: Fetching page", pageId);

    // Fetch page content
    const response = await notion.blocks.children.list({
      block_id: pageId,
      page_size: 100,
    });

    console.log("Notion API: Successfully fetched", response.results.length, "blocks");

    // Convert blocks to markdown
    let markdown = "";
    for (const block of response.results) {
      if ("type" in block) {
        markdown += blockToMarkdown(block as BlockObjectResponse);
      }
    }

    return markdown;
  } catch (error: any) {
    console.error("Notion API: Error fetching page", {
      pageId,
      error: error.message,
      code: error.code,
    });
    throw new Error(`Failed to fetch Notion page: ${error.message}`);
  }
}

/**
 * Fetches the Kids Schedule from Notion
 */
export async function fetchScheduleData(): Promise<string> {
  const schedulePageId = process.env.NOTION_SCHEDULE_PAGE_ID;

  if (!schedulePageId) {
    throw new Error("NOTION_SCHEDULE_PAGE_ID is not configured");
  }

  console.log("Notion API: Fetching schedule data");
  const scheduleData = await fetchNotionPage(schedulePageId);
  console.log("Notion API: Schedule data fetched successfully", {
    length: scheduleData.length,
  });

  return scheduleData;
}
