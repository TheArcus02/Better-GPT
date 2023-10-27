import { PulseLoader } from 'react-spinners'

const Loading = () => {
  return (
    <div className='flex items-center justify-center min-h-full'>
      <PulseLoader color='#6D28D9' size={128} />
    </div>
  )
}

export default Loading
