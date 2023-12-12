import React, { useState, useEffect } from 'react';
import Box from './Box';

interface Axis {
  x: number;
  y: number;
}

interface Size {
  width: number;
  height: number;
}

interface BoxProps {
  id: number;
  position: Axis;
  size: Size;
  onDrag: (index: number, d: { x: number; y: number }) => void;
  onResize: (index: number, size: Size) => void;
}

const App = () => {
  const initialBoxes: BoxProps[] = [];

  let box: BoxProps;
  let nextX = 10;

for (let id: number = 0; id < 4; id++) {
  const storedPosition = JSON.parse(sessionStorage.getItem(`box-${id}-position`) || `{"x": ${nextX}, "y": 10}`);
  const storedSize = JSON.parse(sessionStorage.getItem(`box-${id}-size`) || '{"width": 200, "height": 200}');

  box = { id, position: storedPosition, size: storedSize, onDrag: () => {}, onResize: () => {} };
  initialBoxes.push(box);

  nextX = storedPosition.x + storedSize.width + 10;
}

  const [boxes, setBoxes] = useState<BoxProps[]>(initialBoxes);

  useEffect(() => {
    // Save the updated values in session storage whenever boxes change
    boxes.forEach((box) => {
      sessionStorage.setItem(`box-${box.id}-position`, JSON.stringify(box.position));
      sessionStorage.setItem(`box-${box.id}-size`, JSON.stringify(box.size));
    });
  }, [boxes]);

  const handleBoxDragStop = (index: number, d: { x: number; y: number }) => {
    console.log(`Box ${index} dragged to x: ${d.x}, y: ${d.y}`);
    setBoxes((prevBoxes) => {
      const updatedBoxes = [...prevBoxes];
      updatedBoxes[index].position = { x: d.x, y: d.y };
      return updatedBoxes;
    });
  };

  const handleBoxResize = (index: number, newSize: Size) => {
    console.log(`Box ${index} resized to width: ${newSize.width}, height: ${newSize.height}`);
    setBoxes((prevBoxes) => {
      const updatedBoxes = [...prevBoxes];
      updatedBoxes[index].size = newSize;
      return updatedBoxes;
    });
  };

  return (
    <div className='h-screen w-screen bg-white'>
      {boxes.map((box, index) => (
        <Box
          key={box.id}
          id={box.id}
          position={box.position}
          size={box.size}
          onDrag={(d) => handleBoxDragStop(index, d)}
          onResize={(s) => handleBoxResize(index, s)}
        />
      ))}
    </div>
  );
};

export default App;
