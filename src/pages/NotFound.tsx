import { useNavigate } from 'react-router'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-52px)]">
      <h1 className="text-black mb-2">Page Not Found</h1>
      <button
        className="px-4 py-2 bg-gray-600 text-white rounded-md"
        onClick={() => navigate('/assistant')}
      >
        Back
      </button>
    </div>
  )
}

export default NotFound
