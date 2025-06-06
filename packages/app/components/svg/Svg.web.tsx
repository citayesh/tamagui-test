type Props = {
  name: string
  width?: number | string
  height?: number | string
}
const Svg = ({ name, width = 24, height = 24 }: Props) => {
const src = `/assets/svgs/${name}.svg`

  return (
    <img
      src={src}
      alt={name}
      style={{ width, height }}
    />
  );
};

export default Svg;
