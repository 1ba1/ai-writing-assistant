import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  useSession,
} from '@clerk/clerk-react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'

const Public = () => {
  const navigate = useNavigate()
  const { isSignedIn } = useSession()

  useEffect(() => {
    if (isSignedIn) {
      navigate('/assistant')
    }
  }, [isSignedIn, navigate])

  return (
    <div className="bg-[url(assets/typewriter.webp)] bg-[cover] p-4 lg:grid lg:place-content-center xl:place-content-start h-[calc(100vh-52px)]">
      <div className="xl:bg-transparent bg-gray-700 rounded-lg xl:mr-0 xl:ml-auto mx-auto md:w-4/6 w-full p-6">
        <p className="xl:text-gray-700 text-white lg:text-2xl text-base text-balance">
          Welcome to our AI writing assistant web app, where cutting-edge
          technology meets creative expression. Our platform is designed to help
          you write with ease and confidence, providing you with intelligent
          suggestions and guidance throughout the writing process. Whether
          you're a seasoned writer looking to enhance your skills or a novice
          seeking support, our AI writing assistant is here to help you craft
          compelling and polished content. Join us on this journey of discovery
          and innovation as we revolutionize the way you approach writing.
        </p>
        <div className="mt-6 flex justify-center">
          <SignedOut>
            <SignInButton>
              <button className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <SignOutButton>
              <button className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500">
                Sign Out
              </button>
            </SignOutButton>
          </SignedIn>
        </div>
      </div>
      <p className="text-gray-700 fixed bottom-1 right-2">
        Photo by{' '}
        <a href="https://unsplash.com/it/@hudsoncrafted?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
          Debby Hudson
        </a>{' '}
        on{' '}
        <a href="https://unsplash.com/it/foto/fotografia-a-fuoco-selettiva-dei-tasti-della-macchina-da-scrivere-oVQBn0X2oEk?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
          Unsplash
        </a>
      </p>
    </div>
  )
}

export default Public
