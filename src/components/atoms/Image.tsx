import React from 'react';

interface ImageProps {
  theme?: ImageThemes[];
  src: string;
  height?: number;
  width?: number;
  alt? : string;
  propStyle?: {};
}

export enum ImageThemes {
  INIT = 'INIT',
  STAR = 'STAR'
}

enum ModifierClassNames {
  INIT = 'init',
  STAR = 'star'
}


const Image: React.FC<ImageProps> = ({theme = [], src, height, width, alt, propStyle = {}}) => {
  const modifierClasses = theme.map(data => ModifierClassNames[data]).join(' ');
  return (
    <span className={["init", modifierClasses].join(' ')} style={propStyle}>
      <img src={src} height={height} width={width} alt={alt} />
      <style jsx>
        {`
          .init {
            display: flex;
            align-items: center;
          }

        `}
      </style>
    </span>
  );
}

export default Image;