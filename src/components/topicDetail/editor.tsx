import { useCallback, useEffect, useState } from 'react';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

interface IProps {
  data: any;
  handleChange: (html: string, text: string) => void;
}

const TopicDetailEditor = (props: IProps) => {
  const { data, handleChange } = props;
  const { content } = data;
  const [value, setValue] = useState('');
  const mdParser = new MarkdownIt();

  useEffect(() => {
    setValue(content);
  }, [content]);

  const handleEditorChange = useCallback(({ html, text }: any) => {
    setValue(text);
    handleChange(html, text);
  }, []);

  return (
    <div>
      <MdEditor
        name="content"
        value={value}
        config={{
          imageAccept: '.png,.jpg,.jpeg',
        }}
        placeholder="请输入文章内容，支持 markdown 语法..."
        style={{ height: 'calc(100vh - 170px)', width: '100%' }}
        renderHTML={(text) => mdParser.render(text)}
        onChange={handleEditorChange}
      />
    </div>
  );
};

export default TopicDetailEditor;
