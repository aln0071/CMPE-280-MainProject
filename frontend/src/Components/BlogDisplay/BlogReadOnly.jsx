import React,{useEffect} from "react";
import {Card} from 'react-bootstrap';
import Editor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import MarkdownIt from 'markdown-it';


export default function EditorCustom(props) {
  const[description,setDescription]=React.useState("")
  const mdParser = new MarkdownIt(/* Markdown-it options */);
  var arr ;


  useEffect(() => {
    if(props && props.description && document.querySelector("#editor-container")){
    arr = mdParser.render(props.description)
    document.querySelector("#editor-container").innerHTML = arr
    console.log(arr)
  }},[props.description])

  return (
    <div className="App">
      {props && props.description &&
      <Card style={{margin:"1rem"}}>
      <div id="editor-container" style={{"textAlign":"left",
    "background-color": props.color,
    "border-style": "none",
    "overflow-x": "hidden",
    "overflow-y": "hidden"}}>
      </div>
      </Card>}
    </div>
  );
}