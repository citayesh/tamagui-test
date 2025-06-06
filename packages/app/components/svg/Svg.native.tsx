import React from 'react'

// Import all your SVG components here:
import GalleryIcon from '../../assets/svgs/galleryIcon.svg'


type Props = {
  name: string
  width?: number | string
  height?: number | string
}

const icons: Record<string, React.FC<any>> = {
  galleryIcon: GalleryIcon,
  // add more icon mappings here
}

const Svg = ({ name, width = 24, height = 24 }: Props) => {
  const IconComponent = icons[name]

  if (!IconComponent) return null

  return <IconComponent width={width} height={height} />
}

export default Svg
