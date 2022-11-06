import { unified } from 'unified';

// NOTE: markdown -> html
import remarkParse from 'remark-parse'; // parser (markdown -> html)
import remarkGfm from 'remark-gfm'; // gfm (markdown -> html)
import remarkRehype from 'remark-rehype'; // mdast2hast (markdown -> html)
import rehypeStringify from 'rehype-stringify'; // compiler (markdown -> html)

// NOTE: html -> markdown
import rehypeParse from 'rehype-parse'; // parser (html -> markdown)
import rehypeRemark from 'rehype-remark'; // mdast2hast (html -> markdown)
import remarkStringify from 'remark-stringify'; // compiler (html -> markdown)

export const convertMarkdownToHTML = async (value: string) => {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(value);

  return String(file);
};

export const convertHTMLToMarkdown = async (value: string) => {
  const file = await unified()
    .use(rehypeParse)
    .use(remarkGfm)
    .use(rehypeRemark) //
    .use(remarkStringify)
    .process(value);

  return String(file);
};
