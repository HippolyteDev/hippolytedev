type IconProps = {
  children: React.ReactNode;
};

export function Icon({ children }: IconProps) {
  return (
    <div className="icon-box" aria-hidden="true">
      <svg viewBox="0 0 24 24">{children}</svg>
    </div>
  );
}

export function LogoIcon() {
  return (
    <span className="logo-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24">
        <path d="m8 8-4 4 4 4" />
        <path d="m16 8 4 4-4 4" />
        <path d="m14 4-4 16" />
      </svg>
    </span>
  );
}
