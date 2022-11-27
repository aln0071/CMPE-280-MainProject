import React, { useState } from "react";
import EditorCustom from '../BlogDisplay/EditorCustom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Background from "../Utilities/Background";

function ColourCard(props) {
  
    return(<div>
        {console.log(props.color)}
            <Card style={{ width: '30rem', height:'30rem',backgroundColor:props.color}}>
            <Background color={props.color} ></Background>
            </Card>
        </div>)
  }
  
  export default ColourCard;