import AssistantsForm from '@/components/assistants/assistants-form'
const CreateAssistantPage = () => {
  return (
    <section className='container max-w-5xl mt-16'>
      <div className='mb-16'>
        <h1 className='text-3xl font-extrabold'>Create Assistant</h1>
        <p className=' mt-2 text-secondary-foreground/60'>
          Create your own custom AI assistant.
        </p>
      </div>
      <AssistantsForm action='create' data={null} />
    </section>
  )
}

export default CreateAssistantPage
