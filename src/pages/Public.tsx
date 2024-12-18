import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  useSession,
} from '@clerk/clerk-react'

const Public = () => {
  const { isSignedIn } = useSession()

  return (
    <div className="bg-gray-700 text-black grid place-content-center min-h-screen">
      <div className="bg-white rounded-lg w-[50vw] p-8">
        <p className="text-gray-700">
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
          {!isSignedIn ? (
            <SignedOut>
              <SignInButton>
                <button className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
          ) : (
            <SignedIn>
              <SignOutButton>
                <button className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500">
                  Sign Out
                </button>
              </SignOutButton>
            </SignedIn>
          )}
        </div>
      </div>
    </div>
  )
}

export default Public
