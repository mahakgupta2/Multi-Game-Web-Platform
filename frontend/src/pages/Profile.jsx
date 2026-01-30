import { Link } from "react-router-dom";

const Profile = ({user}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white p-8">

      <Link to="/dashboard" className="text-indigo-400 hover:underline">
        ← Back to Dashboard
      </Link>

      <div className="max-w-xl mx-auto bg-gray-900 rounded-2xl p-8 mt-10 shadow-lg">
        <div className="text-center">
          <div className="text-7xl mb-4">👤</div>
          <h2 className="text-2xl font-bold">Gaurav Rao</h2>
          <p className="text-gray-400">gaurav@email.com</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-8 text-center">
          <div className="bg-gray-800 p-4 rounded-xl">
            <p className="text-2xl font-bold">23</p>
            <p className="text-gray-400 text-sm">Games Played</p>
          </div>

          <div className="bg-gray-800 p-4 rounded-xl">
            <p className="text-2xl font-bold">1240</p>
            <p className="text-gray-400 text-sm">Total Score</p>
          </div>
        </div>

        <div className="mt-8 space-y-3">
          <button className="w-full bg-indigo-500 py-2 rounded-lg hover:bg-indigo-600">
            Edit Profile
          </button>

          <button className="w-full bg-red-500 py-2 rounded-lg hover:bg-red-600">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
