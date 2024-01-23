import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

// components
import Carousel from 'components/Carousel';

// styles
import line from 'styles/Line.module.css';
import './style.css';

const ProjectContent = ({ data }) => {
  if (data)
    return (
      <>
        <Carousel media={data.media} />
        <div className={line.base} />
        <Markdown
          className="markdown"
          remarkPlugins={[remarkGfm]}
          children={data.descriptionLong}
          components={{
            code(props) {
              const { children, className, node, ...rest } = props;
              const match = /language-(\w+)/.exec(className || '');
              return match ? (
                <SyntaxHighlighter
                  {...rest}
                  wrapLines={true}
                  wrapLongLines={true}
                  PreTag="div"
                  children={String(children).replace(/\n$/, '')}
                  language={match[1]}
                  style={a11yDark}
                />
              ) : (
                <code {...rest} className={className}>
                  {children}
                </code>
              );
            },
          }}
        />
        {/* <p>{data.descriptionLong}</p> */}
      </>
    );
};
export default ProjectContent;
