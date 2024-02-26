import React from 'react';

interface Props {
  src: string;
  autoPlay: boolean;
}

const YouTube: React.FC<Props> = ({ src, autoPlay }) => {
  return (
    <iframe
      width="450"
      height="250"
      src={src + (autoPlay && '&autoplay=1')}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    ></iframe>
  );
};

export default YouTube;
