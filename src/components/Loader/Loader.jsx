import { Audio } from 'react-loader-spinner'

const Loader = () => {
  return (
    <Audio
      height="80"
      width="80"
      radius="9"
      color='green'
      ariaLabel='three-dots-loading'
      wrapperStyle={
        {
          display: 'flex',
          width: '100vw',
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          backgroundColor: '#cccccc80',
          top: 0,
        }
      }
    />
  )
}
export default Loader
