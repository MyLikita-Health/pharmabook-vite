import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function Editor({ data = [],data1=[], onChange = (f) => f }) {
  return (
    <>  
    <CKEditor
      editor={ClassicEditor}
      data={data}
      data1={data1}
      onChange={(event, editor) => {
        const data = editor.getData();
        onChange(data);
      }}
      config={{placeholder: "Placeholder text..."}}
    />
    </>
  );
}

export default Editor;
