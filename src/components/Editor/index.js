import 'quill/dist/quill.snow.css';
import 'react-quill-with-table/dist/quill.snow.css';
import 'react-quill/dist/quill.snow.css';
import React, { useMemo } from 'react';
import ReactQuill from 'react-quill-with-table'; // Import directly

const Editor = ({ Id, handleChangeMessage, message }) => {
  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
  ];

  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image', 'video'],
      ['clean'],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  const editorChangeVal = (val) => {
    if (Id) {
      handleChangeMessage({ id: Id, data: val });
    } else {
      handleChangeMessage(val);
    }
  };

  return (
    <div>
      <ReactQuill
        modules={modules}
        formats={formats}
        theme="snow"
        onChange={editorChangeVal}
        value={message}
      />
    </div>
  );
};

export default Editor;
