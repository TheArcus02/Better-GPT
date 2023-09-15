import Translator from '@/components/translation/translator'

const TranslationPage = () => {
  return (
    <section className='mt-16 max-w-7xl mx-auto h-full'>
      <div className='w-full flex justify-between'>
        <div>
          <h1 className='text-3xl font-extrabold'>Translation</h1>
          <p className='mt-2'>
            Effortlessly translate sentences between languages using
            advanced AI technology.
          </p>
        </div>
      </div>
      <div className='mt-16 h-full'>
        <Translator />
      </div>
    </section>
  )
}

export default TranslationPage
