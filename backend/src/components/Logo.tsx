interface LogoProps {
  className?: string;
}

const Logo = ({ className = '' }: LogoProps) => {
  return (
    <div className={className}>
      {/* Hier kannst du dein Logo-SVG oder Bild einfügen */}
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-blue-600">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    </div>
  );
};

export default Logo;
