import * as React from 'react';
import { Input, Panel, DOMHelper } from 'rsuite';
import AppContext from '@/components/AppContext';

const { getOffset } = DOMHelper;

function ImageColor(img) {
  this.canvas = document.createElement('canvas');
  this.canvas.width = img.width;
  this.canvas.height = img.height;
  this.context = this.canvas.getContext('2d');
  this.context.drawImage(img, 0, 0);
  this.accuracy = 5;
  this.progress = '';
  this.getColorByXY = function(x, y) {
    const imageData = this.context.getImageData(x, y, 1, 1);
    const arr = imageData.data.toString().split(',');

    let first = parseInt(arr[0]).toString(16);
    first = first.length === 2 ? first : first + first;

    let second = parseInt(arr[1]).toString(16);
    second = second.length === 2 ? second : second + second;

    let third = parseInt(arr[2]).toString(16);
    third = third.length === 2 ? third : third + third;

    const last = parseInt(arr.pop()) / 255;
    const color = {};
    color['rgba'] = 'rgba(' + arr.join(',') + ',' + last.toFixed(0) + ')';
    color['#'] = '#' + first + second + third;

    return color;
  };
}

interface ImageToColorsProps {
  onColorChange: (color: string) => void;
}

export default function ImageToColors(props: ImageToColorsProps) {
  const [imgData, setImgData] = React.useState(null);
  const [imgPosition, setImgPosition] = React.useState({ x: 0, y: 0 });
  const [imgColor, setImgColor] = React.useState<any>(null);
  const imgRef = React.createRef<any>();
  const dotStyles = {
    left: imgPosition.x,
    top: imgPosition.y
  };

  const onChange = (_value, event) => {
    const file = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = e => {
      const imgData = e.target.result;
      const img = new Image();
      img.src = e.target.result as string;
      img.onload = () => {
        const imgColor = new ImageColor(img);
        const x = img.width / 2;
        const y = img.height / 2;
        setImgData(imgData);
        setImgPosition({ x, y });
        setImgColor(imgColor);
        props?.onColorChange?.(imgColor?.getColorByXY(x, y));
      };
    };
    fileReader.readAsDataURL(file);
  };

  const onClickImage = (event: React.MouseEvent) => {
    const offset = getOffset(imgRef.current);
    const y = event.pageY - offset.top;
    const x = event.pageX - offset.left;
    setImgPosition({ x, y });
    props?.onColorChange?.(imgColor.getColorByXY(x, y));
  };

  const { messages } = React.useContext(AppContext);
  return (
    <Panel header={<h3>{messages?.palette?.title}</h3>} bordered className="palette-logo-tool">
      <ul>
        <li>{messages?.palette?.step1}</li>
        <li>{messages?.palette?.step2}</li>
        <li>{messages?.palette?.step3}</li>
      </ul>
      <hr />
      <Input type="file" onChange={onChange} style={{ width: 200 }} />
      {imgData ? (
        <div className="palette-image-preview">
          <img src={imgData} ref={imgRef} onClick={onClickImage} />
          <div className="palette-image-position-dot" style={dotStyles} />
        </div>
      ) : null}
    </Panel>
  );
}
