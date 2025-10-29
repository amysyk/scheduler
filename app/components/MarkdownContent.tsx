import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

interface MarkdownContentProps {
  content: string;
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeHighlight]}
      components={{
        // Headings
        h1: ({ node, ...props }) => (
          <h1 className="text-2xl font-bold mt-4 mb-2 text-gray-900" {...props} />
        ),
        h2: ({ node, ...props }) => (
          <h2 className="text-xl font-bold mt-3 mb-2 text-gray-900" {...props} />
        ),
        h3: ({ node, ...props }) => (
          <h3 className="text-lg font-semibold mt-2 mb-1 text-gray-900" {...props} />
        ),
        h4: ({ node, ...props }) => (
          <h4 className="text-base font-semibold mt-2 mb-1 text-gray-900" {...props} />
        ),
        h5: ({ node, ...props }) => (
          <h5 className="text-sm font-semibold mt-2 mb-1 text-gray-900" {...props} />
        ),
        h6: ({ node, ...props }) => (
          <h6 className="text-sm font-semibold mt-2 mb-1 text-gray-700" {...props} />
        ),

        // Paragraphs
        p: ({ node, ...props }) => (
          <p className="mb-3 leading-relaxed text-gray-800" {...props} />
        ),

        // Lists
        ul: ({ node, ...props }) => (
          <ul className="list-disc list-inside mb-3 space-y-1 text-gray-800" {...props} />
        ),
        ol: ({ node, ...props }) => (
          <ol className="list-decimal list-inside mb-3 space-y-1 text-gray-800" {...props} />
        ),
        li: ({ node, ...props }) => (
          <li className="ml-2" {...props} />
        ),

        // Code
        code: ({ node, inline, ...props }: any) =>
          inline ? (
            <code className="bg-blue-100 px-1.5 py-0.5 rounded text-sm font-mono text-blue-900" {...props} />
          ) : (
            <code className="text-sm" {...props} />
          ),
        pre: ({ node, ...props }) => (
          <pre className="mb-3 overflow-x-auto bg-gray-900 text-gray-100 rounded-lg p-3" {...props} />
        ),

        // Blockquotes
        blockquote: ({ node, ...props }) => (
          <blockquote className="border-l-4 border-blue-300 pl-4 italic my-3 text-gray-700" {...props} />
        ),

        // Links
        a: ({ node, ...props }) => (
          <a className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer" {...props} />
        ),

        // Tables
        table: ({ node, ...props }) => (
          <div className="overflow-x-auto mb-3">
            <table className="min-w-full divide-y divide-gray-300 border border-gray-300" {...props} />
          </div>
        ),
        thead: ({ node, ...props }) => (
          <thead className="bg-blue-50" {...props} />
        ),
        tbody: ({ node, ...props }) => (
          <tbody className="divide-y divide-gray-200" {...props} />
        ),
        tr: ({ node, ...props }) => (
          <tr {...props} />
        ),
        th: ({ node, ...props }) => (
          <th className="px-3 py-2 text-left text-sm font-semibold text-gray-900" {...props} />
        ),
        td: ({ node, ...props }) => (
          <td className="px-3 py-2 text-sm text-gray-700" {...props} />
        ),

        // Horizontal rule
        hr: ({ node, ...props }) => (
          <hr className="my-4 border-gray-300" {...props} />
        ),

        // Strong and emphasis
        strong: ({ node, ...props }) => (
          <strong className="font-bold text-gray-900" {...props} />
        ),
        em: ({ node, ...props }) => (
          <em className="italic" {...props} />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
