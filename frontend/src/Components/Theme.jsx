import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import ColourCard from './ColourCard';
import EditorCustom from './EditorCustom';

function Theme(props) {
  const [colorList, setcolorList] = useState(['#a44158', '#EDE1ED', '#a44158', '#000000']);

  return (
    <div>
      {colorList.map((color) => (
        <ColourCard color={color} />
      ))}
    </div>
  );
}

export default Theme;
