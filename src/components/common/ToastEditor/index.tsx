import { Ref } from 'react';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';

interface EditorProps {
  editorRef: Ref<Editor>;
  initValue?: string;
}

const ToastEditor = ({ editorRef, initValue }: EditorProps) => {
  const toolbarItems = [
    ['heading', 'bold', 'italic', 'strike'],
    ['hr'],
    ['ul', 'ol', 'task'],
    ['table', 'link'],
  ];

  return (
    <Editor
      ref={editorRef}
      initialValue={initValue}
      previewStyle="tab"
      height="600px"
      initialEditType="markdown"
      useCommandShortcut={true}
      toolbarItems={toolbarItems}
      hideModeSwitch={true}
    />
  );
};

export default ToastEditor;
