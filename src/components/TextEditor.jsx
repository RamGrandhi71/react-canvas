import React, { useState } from 'react';
import { Stage, Layer, Text, Rect } from 'react-konva';

const TextEditor = () => {
  const [textList, setTextList] = useState([]);
  const [selectedText, setSelectedText] = useState(null);
  const [fontSize, setFontSize] = useState(20);
  const [fontFamily, setFontFamily] = useState('Arial');
  const [fontColor, setFontColor] = useState('black');
  const [editText, setEditText] = useState('');

  const handleAddText = () => {
    const newText = {
      id: new Date().getTime(),
      text: 'Type Here',
      x: 50,
      y: 50,
      fontSize,
      fontFamily,
      fill: fontColor,
    };

    setTextList([...textList, newText]);
    setSelectedText(newText.id);
  };

  const handleTextChange = (e) => {
    const updatedTextList = textList.map((text) =>
      text.id === selectedText ? { ...text, text: e.target.value } : text
    );
    setTextList(updatedTextList);
  };

  const handleDragEnd = (e, id) => {
    const updatedTextList = textList.map((text) =>
      text.id === id
        ? { ...text, x: e.target.x(), y: e.target.y() }
        : text
    );
    setTextList(updatedTextList);
  };

  const handleSelectText = (id, text, fontSize, fontFamily, fontColor) => {
    setSelectedText(id);
    setEditText(text);
    setFontSize(fontSize);
    setFontFamily(fontFamily);
    setFontColor(fontColor);
  };

  const handleFontSizeChange = (size) => {
    setFontSize(size);
    updateSelectedText({ fontSize: size });
  };

  const handleFontFamilyChange = (family) => {
    setFontFamily(family);
    updateSelectedText({ fontFamily: family });
  };

  const handleFontColorChange = (color) => {
    setFontColor(color);
    updateSelectedText({ fontColor: color });
  };

  const handleTextEditChange = (e) => {
    setEditText(e.target.value);
    updateSelectedText({ text: e.target.value });
  };

  const updateSelectedText = (updatedProps) => {
    const updatedTextList = textList.map((text) =>
      text.id === selectedText ? { ...text, ...updatedProps } : text
    );
    setTextList(updatedTextList);
    setFontColor(updatedProps.fontColor || fontColor);
  };

  return (
    <div>
      <div>
        <button onClick={handleAddText}>Add Text</button>
        <label>Font Size:</label>
        <input
          type="number"
          value={fontSize}
          onChange={(e) => handleFontSizeChange(parseInt(e.target.value))}
        />
        <label>Font Family:</label>
        <select
          value={fontFamily}
          onChange={(e) => handleFontFamilyChange(e.target.value)}
        >
          <option value="Arial">Arial</option>
          <option value="Verdana">Verdana</option>
          <option value="Times New Roman">Times New Roman</option>
          {/* Add more font options as needed */}
        </select>
        <label>Font Color:</label>
        <input
          type="color"
          value={fontColor}
          onChange={(e) => handleFontColorChange(e.target.value)}
        />
      </div>
      <Stage width={800} height={600}>
        <Layer>
          {/* Add a white background */}
          <Rect width={800} height={600} fill="white" />

          {textList.map((text) => (
            <React.Fragment key={text.id}>
              <Rect
                width={200}
                height={30}
                fill="rgba(0,0,0,0)"
                draggable
                onClick={() =>
                  handleSelectText(
                    text.id,
                    text.text,
                    text.fontSize,
                    text.fontFamily,
                    text.fill
                  )
                }
                onDragEnd={(e) => handleDragEnd(e, text.id)}
              />
              <Text
                text={text.text}
                x={text.x}
                y={text.y}
                fontSize={text.fontSize}
                fontFamily={text.fontFamily}
                fill={text.fill}
                draggable
                isSelected={text.id === selectedText}
                onClick={() =>
                  handleSelectText(
                    text.id,
                    text.text,
                    text.fontSize,
                    text.fontFamily,
                    text.fill
                  )
                }
                onDragEnd={(e) => handleDragEnd(e, text.id)}
                onChange={handleTextChange}
                wrap="none"
              />
            </React.Fragment>
          ))}
        </Layer>
      </Stage>
      {selectedText !== null && (
        <div>
          <label>Edit Text:</label>
          <input
            type="text"
            value={editText}
            onChange={handleTextEditChange}
          />
        </div>
      )}
    </div>
  );
};

export default TextEditor;
