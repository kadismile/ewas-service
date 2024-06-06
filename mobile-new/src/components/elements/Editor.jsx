//./components/Editor
import React, { memo, useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import { EDITOR_JS_TOOLS } from "../../utils/EditorTools";

const EditorBlock = ({ data, holder }) => {
  const editorRef = useRef(null);
  useEffect(() => {
    if (!editorRef.current) {
      editorRef.current = new EditorJS({
        holder: holder,
        data,
        tools: EDITOR_JS_TOOLS,
        readOnly: true
      });
    }

    return () => {
      if (editorRef.current && editorRef.current.destroy) {
        editorRef.current.destroy();
      }
    };
  }, [data]);

  return <div id={holder} />;
};


export default memo(EditorBlock);


