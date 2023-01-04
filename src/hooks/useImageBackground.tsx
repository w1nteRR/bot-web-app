import { useState, RefObject } from 'react'
import ColorThief from 'colorthief'

export const useImageBackground = (ref: RefObject<HTMLImageElement>) => {
  const [color, setColor] = useState<number[]>([])

  const onLoad = () => {
    const colorThief = new ColorThief()

    const image = ref.current

    setColor(colorThief.getColor(image))
  }

  const getLightness = (rgb: number[]) =>
    0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]

  const isDark = (rgb: number[]) => getLightness(rgb) < 90
  const isLight = (rgb: number[]) => getLightness(rgb) > 150

  return {
    color,
    onLoad,
    isDark,
    isLight,
  }
}
