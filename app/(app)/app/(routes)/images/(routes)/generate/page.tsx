import GenerateImageForm from '@/components/images/generate-form'

const GenarateImagePage = () => {
  return (
    <section className='container mt-16 flex flex-col items-center '>
      <div>
        <h1 className='text-3xl font-extrabold'>Generate Image</h1>
        <p className='text-ms mt-2 text-secondary-foreground/60'>
          Create imaginative and visually stunning images throught
          DALL-E AI and share them with community
        </p>
      </div>
      <GenerateImageForm />
    </section>
  )
}

export default GenarateImagePage
