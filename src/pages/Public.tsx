import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
} from '@clerk/clerk-react'

const Public = () => {
  return (
    <div className="bg-gray-700 text-black pt-10 lg:pt-0 lg:grid lg:place-content-center h-[calc(100vh-52px)]">
      <div className="lg:bg-gray-700 lg:w-full bg-white rounded-lg mx-auto w-5/6 md:w-1/2 p-8">
        <p className="lg:text-white text-gray-700 lg:text-4xl">
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
    </div>
  )
}

export default Public
