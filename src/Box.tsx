import { Rnd } from 'react-rnd';

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
  onDrag: (d: { x: number; y: number }) => void;
  onResize: (size: Size) => void;
}

const Box: React.FC<BoxProps> = ({ id, position, size, onDrag, onResize }: BoxProps) => {

  return (
    <Rnd
      className='bg-gray-900'
      size={{ width: size.width, height: size.height }}
      position={{ x: position.x, y: position.y }}
      onDragStop={(e, d) => {
        onDrag({ x: d.x, y: d.y });
      }}
      bounds={'parent'}
      onResize={(e, direction, ref, delta, position) => {
          onDrag({ x: position.x, y: position.y })
          onResize({ width: ref.offsetWidth, height: ref.offsetHeight });
      }}
    >
      <span className="text-white">{`Box ${id}`}</span>
    </Rnd>
      // </div>
  );
};

export default Box;
