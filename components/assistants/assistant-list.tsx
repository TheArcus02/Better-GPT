import AssistantCard from './assistant-card'

interface AssistantListProps {
  assistants: AssistantWithAdditionalData[]
}

const AssistantList = ({ assistants }: AssistantListProps) => {
  return (
    <div className='flex gap-4 flex-wrap'>
      {assistants.map((assistant) => (
        <AssistantCard key={assistant.id} assistant={assistant} />
      ))}
    </div>
  )
}

export default AssistantList
