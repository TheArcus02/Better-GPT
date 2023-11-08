import { PulseLoader } from 'react-spinners'

const Loading = () => {
  return (
    <div className='min-h-[90vh] flex items-center justify-center'>
      <PulseLoader color='#FFFFFF' size={20} />
    </div>
  )
}

export default Loading
