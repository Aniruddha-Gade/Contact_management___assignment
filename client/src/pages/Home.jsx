import { Link } from "react-router-dom"

const Home = () => {
    return (
        <div className='flex-center flex-col gap-10 w-full'>
            <div className="text-3xl sm:text-5xl text-green-600 px-10 text-center font-bold">
                <h1>Contact Management</h1>
                <p className="text-2xl sm:text-4xl underline">
                    Mini Feature of a <span className="text-red-500">CRM</span>
                </p>
            </div>

            <Link to='/dashboard'>
                <button className='bg-green-500 hover:bg-green-600 p-5 sm:p-7 text-3xl sm:text-5xl font-bold rounded-xl '>
                    Dashboard
                </button>
            </Link>
        </div>
    )
}

export default Home