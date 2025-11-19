interface FlagIconProps {
  country: 'pt' | 'gb';
  size?: 'sm' | 'md' | 'lg';
}

export default function FlagIcon({ country, size = 'md' }: FlagIconProps) {
  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  if (country === 'pt') {
    return (
      <svg className={sizeClasses[size]} viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg">
        <rect width="640" height="480" fill="#060" x="0" y="0"/>
        <rect width="384" height="480" fill="#d80027" x="256" y="0"/>
        <g transform="translate(256,240)">
          <circle r="80" fill="#ffce00"/>
          <circle r="60" fill="#d80027"/>
          <circle r="52" fill="#fff"/>
          <path d="M -20,-12 L -12,-20 L -12,-4 L -20,-12 z" fill="#0052b4"/>
          <path d="M -20,-12 L -28,-20 L -28,-4 L -20,-12 z" fill="#0052b4"/>
          <path d="M 20,-12 L 12,-20 L 12,-4 L 20,-12 z" fill="#0052b4"/>
          <path d="M 20,-12 L 28,-20 L 28,-4 L 20,-12 z" fill="#0052b4"/>
        </g>
      </svg>
    );
  }

  // UK Flag
  return (
    <svg className={sizeClasses[size]} viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg">
      <rect width="640" height="480" fill="#012169"/>
      <path d="M0,0 L640,480 M640,0 L0,480" stroke="#fff" strokeWidth="96"/>
      <path d="M0,0 L640,480 M640,0 L0,480" stroke="#C8102E" strokeWidth="64"/>
      <path d="M320,0 L320,480 M0,240 L640,240" stroke="#fff" strokeWidth="160"/>
      <path d="M320,0 L320,480 M0,240 L640,240" stroke="#C8102E" strokeWidth="96"/>
    </svg>
  );
}
