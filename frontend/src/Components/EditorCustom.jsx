import React,{useEffect} from "react";
import Editor from "react-markdown-editor-lite";
import ReactMarkdown from "react-markdown";
import MarkdownIt from 'markdown-it';
import "react-markdown-editor-lite/lib/index.css";
import axios from 'axios';
import S3FileUpload from 'react-s3';
import { Buffer } from 'buffer';


export default function EditorCustom(props) {

  const region = "us-east-2"
  const bucketName = "etsybucketaws"
  const accessKeyId = "AKIA2ZCI74FHTVB5U2ZZ"
  const secretAccessKey = "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"

  const config ={
    region:region,
    bucketName:bucketName,
    accessKeyId:accessKeyId,
    secretAccessKey:secretAccessKey,
    dirName:""
  }

// @ts-ignore
  window.Buffer = Buffer;
  const mdEditor = React.useRef(null);
  const [value, setValue] = React.useState("");
  const[images,setImages]= React.useState([]);

  const mdParser = new MarkdownIt(/* Markdown-it options */);

  useEffect(() => {
    console.log("Edit Page recieved description :",props.preDefault, " images : ",props.description)
    console.log("Edit Page all props :",props)
    setValue(props.preDefault)
    setImages(props.images)
  },[props.preDefault])

  const handleClick = () => {
    if (mdEditor.current) {
      props.setDescription(mdEditor.current.getMdValue());
    }
  };

  const handleEditorChange = ({ html, text }) => {
    // const newValue = text.replace(/\d/g, "");
    // console.log(newValue);
    setValue(text);
    props.setDescription(text)
  };

const onImageUpload= async(file)=>{

return new Promise(resolve => {
  const reader = new FileReader();
  S3FileUpload.uploadFile(file,config).then(data=>{
    console.log(data)
    var imagesTemp=images.slice(0,)
    imagesTemp.push(data.location)
    setImages(imagesTemp)
    props.setImage(imagesTemp)
    var locat = data.location.indexOf('s3');
    var strc = data.location.slice(0,locat+3)+region+"."+data.location.slice(locat+3,)
    console.log(data.location.slice(0,locat+3),region,data.location.slice(locat+3,))
    resolve(strc)
})})}


  return (
    <div className="App">
      {/* <button onClick={handleClick}>Get value</button> */}          
      <Editor
        ref={mdEditor}
        value={value}
        style={{
          height: props.height||"30rem"
        }}
        onChange={handleEditorChange}
        onImageUpload={onImageUpload}
        renderHTML={text => mdParser.render(text)}
      />
    </div>
  );
}