import { Link } from "react-router-dom"

const Home = () => {
    return (
        <div className='flex-center flex-col gap-10 w-full'>
            <h1 className="text-3xl sm:text-5xl text-green-600 text-center font-bold underline">
                Contact Management - Mini Feature of a CRM
            </h1>

            <Link to='/dashboard'>
                <button className='bg-green-500 hover:bg-green-600 p-5 sm:p-7 text-3xl sm:text-5xl font-bold rounded-xl '>
                    Dashboard
                </button>
            </Link>
        </div>
    )
}

export default Home