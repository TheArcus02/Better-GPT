import AssistantsForm from '@/components/assistants/assistant-form'
import GetPremiumAlert from '@/components/get-premium-alert'
import { checkSubscription } from '@/lib/subscription'
const CreateAssistantPage = async () => {
  const isPremium = await checkSubscription()

  return (
    <section className='container max-w-5xl mt-16 pb-6 md:pb-0'>
      <div className='mb-16'>
        <h1 className='text-3xl font-extrabold'>Create Assistant</h1>
        <p className=' mt-2 text-secondary-foreground/60'>
          Create your own custom AI assistant.
        </p>
        {!isPremium && (
          <GetPremiumAlert
            className='mt-10'
            text='Creating AI assistants is an exclusive feature available to our premium users. Upgrade your account today to unlock this powerful tool and supercharge your productivity!'
          />
        )}
      </div>
      <AssistantsForm
        action='create'
        data={null}
        isPremium={isPremium}
      />
    </section>
  )
}

export default CreateAssistantPage
