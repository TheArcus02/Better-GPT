import { PropagateLoader, PulseLoader } from 'react-spinners'

const Loading = () => {
  return (
    <div className='flex items-center justify-center min-h-full'>
      <PulseLoader color='#6D28D9' size={20} />
    </div>
  )
}

export default Loading
