import { RingLoader } from 'react-spinners'

const Loading = () => {
  return (
    <div className='flex items-center justify-center min-h-full'>
      <RingLoader color='white' size={256} />
    </div>
  )
}

export default Loading
