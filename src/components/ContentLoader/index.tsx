import React from 'react';
import { FaSpinner } from 'react-icons/fa';
import './ContentLoader.scss'; // SCSS for styling

type ContentLoaderProps = {
  text?: string;
  size?: number;
  color?: string;
  className?: string;
};

const ContentLoader: React.FC<ContentLoaderProps> = ({
  text = 'Loading...',
  size = 24,
  color = '#007bff',
  className = '',
}) => {
  return (
    <div className={`content-loader ${className}`}>
      <FaSpinner
        className="spinner-icon"
        size={size}
        color={color}
      />
      <span className="loader-text">{text}</span>
    </div>
  );
};

export default ContentLoader;
