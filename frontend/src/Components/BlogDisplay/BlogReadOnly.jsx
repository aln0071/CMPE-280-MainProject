import React, { useEffect } from "react";
import { Card } from 'react-bootstrap';
import Editor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import MarkdownIt from 'markdown-it';


export default function EditorCustom(props) {
  const mdParser = new MarkdownIt(/* Markdown-it options */);
  var arr;


  useEffect(() => {
    if (props && props.description && document.querySelector("#editor-container")) {
      arr = mdParser.render(props.description)
      document.querySelector("#editor-container").innerHTML = arr
      console.log(arr)
    }
  }, [props.description])

  return (
    <div className="App">
      {props && props.description &&
        <Card style={{ margin: "1rem" }}>
          <div id="editor-container" style={{
            "textAlign": "left",
            "backgroundColor": props.color,
            "borderStyle": "none",
            "overflowX": "hidden",
            "overflowY": "hidden"
          }}>
          </div>
        </Card>}
    </div>
  );
}