declare module '*.svg' {
  type IconsProps = { className: string };
  const SvgLogo: React.ComponentType<IconsProps>;
  export { SvgLogo };
}
