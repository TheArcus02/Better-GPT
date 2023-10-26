import GetPremiumAlert from '@/components/get-premium-alert'
import Translator from '@/components/translation/translator'
import languages from '@/lib/languages'
import { checkSubscription } from '@/lib/subscription'

const TranslationPage = async () => {
  const isPremium = await checkSubscription()

  return (
    <section className='mt-16 max-w-7xl mx-auto h-full px-10'>
      <div className='w-full flex justify-between mb-16'>
        <div>
          <h1 className='text-3xl font-extrabold'>Translation</h1>
          <p className='mt-2'>
            Effortlessly translate sentences between languages using
            advanced AI technology.
          </p>
        </div>
      </div>

      {!isPremium && <GetPremiumAlert className='mb-10' />}

      <div className='h-full'>
        <Translator languages={languages} />
      </div>
    </section>
  )
}

export default TranslationPage
