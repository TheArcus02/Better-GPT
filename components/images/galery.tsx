'use client'
import { Image } from '@prisma/client'
import ImageCard from './image-card'
import SearchBar from './search-bar'
import { useWindowWidth } from '@/hooks/use-window-width'
import { useEffect, useState } from 'react'
import { tailwindBreakpoints } from '@/lib/constants/breakpoints'
interface GaleryProps {
  images: Image[]
}

const Galery: React.FC<GaleryProps> = ({ images }) => {
  const windowWidth = useWindowWidth()

  const [columnsArray, setColumnsArray] = useState<Image[][]>([])

  const widthToColumns = (width: number) => {
    if (width >= tailwindBreakpoints.xl) return 3
    if (width >= tailwindBreakpoints.md) return 2
    return 1
  }

  useEffect(() => {
    const cols = widthToColumns(windowWidth)
    const newColumnsArray: Image[][] = Array.from(
      { length: cols },
      (_, colIndex) =>
        images.filter((_, index) => index % cols === colIndex),
    )

    setColumnsArray(newColumnsArray)
  }, [windowWidth, images, columnsArray.length])

  return (
    <>
      <div className='mb-8 md:mb-16'>
        <SearchBar />
      </div>

      {columnsArray.length > 0 ? (
        <div className='grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4'>
          {columnsArray.map((column, index) => (
            <div className='flex flex-col gap-4' key={index}>
              {column.map((image) => (
                <ImageCard key={image.id} image={image} />
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div>No results.</div>
      )}
    </>
  )
}

export default Galery
