import React , {useState, useEffect}from 'react';
import userController from '../../../API/index';
import { useSelector } from 'react-redux';''
const Dashboard = () => {
  const user = useSelector((state) => state.user);

  const [userData, setUserData] = useState(user);
  const [loading, setLoading] = useState(true);
  useEffect(() => {

    // Fetch user data
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await userController.getProfile(token);
        if (response.status ===200){
          // setUserData(response.data.response.user);
          console.log(response.data.response);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();

  },[]);
  return (
    <div className="h-screen w-full p-10 bg-gray-100">
      <h1 className="text-3xl font-bold mb-10">Dashboard</h1>
      
      {/* Profile Overview */}
      <div className="bg-white p-5 rounded-lg shadow mb-10">
        <h2 className="text-xl font-semibold mb-3">Profile Overview</h2>
        <div className="flex flex-row">
          <img src="https://via.placeholder.com/100" alt="Profile" className="w-24 h-24 rounded-full mr-5" />
          <div>
            <p><strong>Name:</strong> {userData.firstName ||"-"} {userData.lastName ||"-"}</p>
            <p><strong>Email:</strong> {userData.email || "-"}</p>
            <p><strong>Phone:</strong> {userData.phone || "-"}</p>
          </div>
        </div>
      </div>

      {/* Job Search */}
      <div className="bg-white p-5 rounded-lg shadow mb-10">
        <h2 className="text-xl font-semibold mb-3">Job Search</h2>
        <input
          type="text"
          placeholder="Search for jobs..."
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>

      {/* Saved Jobs */}
      <div className="bg-white p-5 rounded-lg shadow mb-10">
        <h2 className="text-xl font-semibold mb-3">Saved Jobs</h2>
        <ul>
          <li className="mb-2">Software Engineer at Google</li>
          <li className="mb-2">Frontend Developer at Facebook</li>
        </ul>
      </div>

      {/* Application Status */}
      <div className="bg-white p-5 rounded-lg shadow mb-10">
        <h2 className="text-xl font-semibold mb-3">Application Status</h2>
        <ul>
          <li className="mb-2">Google - Pending</li>
          <li className="mb-2">Facebook - Interview Scheduled</li>
        </ul>
      </div>

      {/* Resume Management */}
      <div className="bg-white p-5 rounded-lg shadow mb-10">
        <h2 className="text-xl font-semibold mb-3">Resume Management</h2>
        <button className="p-2 bg-blue-500 text-white rounded-lg">Upload Resume</button>
      </div>

      {/* Skills Assessment */}
      <div className="bg-white p-5 rounded-lg shadow mb-10">
        <h2 className="text-xl font-semibold mb-3">Skills Assessment</h2>
        <button className="p-2 bg-green-500 text-white rounded-lg">Take Assessment</button>
      </div>

      {/* Networking */}
      <div className="bg-white p-5 rounded-lg shadow mb-10">
        <h2 className="text-xl font-semibold mb-3">Networking</h2>
        <p>Connect with other professionals in your industry.</p>
      </div>

      {/* Career Resources */}
      <div className="bg-white p-5 rounded-lg shadow mb-10">
        <h2 className="text-xl font-semibold mb-3">Career Resources</h2>
        <ul>
          <li className="mb-2">How to Write a Great Resume</li>
          <li className="mb-2">Top 10 Interview Tips</li>
        </ul>
      </div>

      {/* Notifications */}
      <div className="bg-white p-5 rounded-lg shadow mb-10">
        <h2 className="text-xl font-semibold mb-3">Notifications</h2>
        <p>No new notifications.</p>
      </div>

      {/* Settings */}
      <div className="bg-white p-5 rounded-lg shadow mb-10">
        <h2 className="text-xl font-semibold mb-3">Settings</h2>
        <button className="p-2 bg-gray-500 text-white rounded-lg">Account Settings</button>
      </div>
    </div>
  );
};

export default Dashboard;
