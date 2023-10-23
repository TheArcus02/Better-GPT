'use client'
import { Image } from '@prisma/client'
import ImageCard from './image-card'
import SearchBar from './search-bar'
interface GaleryProps {
  images: Image[]
}

const Galery: React.FC<GaleryProps> = ({ images }) => {
  const getColumns = (colIndex: number) => {
    return images.filter((_, index) => index % 3 === colIndex)
  }

  return (
    <>
      <div className='mb-8 md:mb-16'>
        <SearchBar />
      </div>

      {images.length > 0 ? (
        <div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4'>
          {[getColumns(0), getColumns(1), getColumns(2)].map(
            (column, index) => (
              <div className='flex flex-col gap-4' key={index}>
                {column.map((image) => (
                  <ImageCard key={image.id} image={image} />
                ))}
              </div>
            ),
          )}
        </div>
      ) : (
        <div>No results.</div>
      )}
    </>
  )
}

export default Galery
