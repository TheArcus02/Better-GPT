import { Image } from '@prisma/client'
import ImageCard from './image-card'
import { currentUser } from '@clerk/nextjs'

interface GaleryProps {
  images: Image[]
}

const Galery: React.FC<GaleryProps> = async ({ images }) => {
  const user = await currentUser()
  console.log(user)

  return images.length > 0 ? (
    <div className='grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-1 gap-3'>
      {images.map((image) => (
        <ImageCard key={image.id} image={image} />
      ))}
    </div>
  ) : (
    <div>Galery</div>
  )
}

export default Galery
