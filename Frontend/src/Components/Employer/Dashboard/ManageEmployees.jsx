import React, { useState, useEffect } from 'react'
import employer from '../../../API/employer'
import {
  FaEye,
  FaInbox,
  FaTrashAlt,
  FaUserShield,
  FaUserAltSlash,
} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const ManageEmployees = ({ companyId }) => {
  const [employees, setEmployees] = useState([])
  const [unAuthEmployees, setUnAuthEmployees] = useState([])
  const [activeTab, setActiveTab] = useState('authorized')
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [showDetails, setShowDetails] = useState(false)

  const navigate = useNavigate()

  const handleViewDetails = async (employeeId) => {
    let employee
    try {
      employee =
        employees.find((emp) => emp.id === employeeId) ||
        unAuthEmployees.find((emp) => emp.id === employeeId)
      employee = {
        ...employee,
        user: {
          ...employee.user,
          createdAt: new Date(employee.user.createdAt).toLocaleDateString(),
        },
      }
      setSelectedEmployee(employee)
      setShowDetails(true)
    } catch (error) {
      console.error('Failed to fetch employee details', error)
    }
  }

  const handleCloseDetails = () => {
    setShowDetails(false)
    setSelectedEmployee(null)
  }

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const company = JSON.parse(localStorage.getItem('company'))
        const token = localStorage.getItem('accessToken')
        const response = await employer.getEmployees(token, company._id)
        setEmployees(response.data.employees.authEmployees)
        setUnAuthEmployees(response.data.employees.unAuthEmployees)
      } catch (error) {
        console.error('Failed to fetch employees', error)
      }
    }

    fetchEmployees()
  }, [companyId])

  const handleAuthorize = async (employeeId) => {
    try {
      const company = JSON.parse(localStorage.getItem('company'))
      const token = localStorage.getItem('accessToken')
      await employer.authorizeEmployee(token, company._id, employeeId)
      setUnAuthEmployees(unAuthEmployees.filter((emp) => emp.id !== employeeId))
      setEmployees([...employees, { id: employeeId }])
    } catch (error) {
      console.error('Failed to authorize employee', error)
    }
  }

  const handleRemove = async (employeeId) => {
    try {
      const company = JSON.parse(localStorage.getItem('company'))
      const token = localStorage.getItem('accessToken')
      await employer.revokeEmployee(token, company._id, employeeId)
      setEmployees(employees.filter((emp) => emp.id !== employeeId))
    } catch (error) {
      console.error('Failed to remove employee', error)
    }
  }

  const handleDeleteRequest = async (employeeId) => {
    try {
      const company = JSON.parse(localStorage.getItem('company'))
      const token = localStorage.getItem('accessToken')
      await employer.deleteEmployee(token, company._id, employeeId)
      setUnAuthEmployees(unAuthEmployees.filter((emp) => emp.id !== employeeId))
    } catch (error) {
      console.error('Failed to delete employee', error)
    }
  }

  return (
    <div className='bg-white p-8 rounded-lg shadow-md animate-fade-in-up'>
      <h2 className='text-3xl font-semibold mb-6 text-secondary-dark animate-slide-in-right'>
        Manage Employees
      </h2>

      {/* Tab Navigation */}
      <div className='flex mb-6'>
        <button
          className={`px-6 py-3 text-lg font-semibold rounded-l-md transition-colors duration-300 ${
            activeTab === 'authorized'
              ? 'bg-primary text-white'
              : 'bg-gray-200 text-gray-600'
          } hover:bg-primary hover:text-white transform hover:scale-105 transition-transform`}
          onClick={() => setActiveTab('authorized')}
        >
          <FaUserShield className='inline-block mr-2' />
          Authorized Employees
        </button>
        <button
          className={`px-6 py-3 text-lg font-semibold rounded-r-md transition-colors duration-300 ${
            activeTab === 'unauthorized'
              ? 'bg-primary text-white'
              : 'bg-gray-200 text-gray-600'
          } hover:bg-primary hover:text-white transform hover:scale-105 transition-transform`}
          onClick={() => setActiveTab('unauthorized')}
        >
          <FaUserAltSlash className='inline-block mr-2' />
          Unauthorized Employees
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'authorized' ? (
        <div className='overflow-x-auto animate-slide-in-left'>
          <table className='min-w-full bg-white shadow-md rounded-lg overflow-hidden'>
            <thead className='bg-gradient-to-r from-primary to-secondary-dark text-white'>
              <tr>
                <th className='py-3 px-6 text-left'>Name</th>
                <th className='py-3 px-6 text-left'>Email</th>
                <th className='py-3 px-6 text-left'>Role</th>
                <th className='py-3 px-6 text-right'>Actions</th>
              </tr>
            </thead>
            <tbody className='text-gray-800'>
              {employees.map((employee) => (
                <tr
                  key={employee.id}
                  className='border-b hover:bg-gray-100 transition-colors animate-fade-in'
                >
                  <td className='py-4 px-6'>{`${employee.user.firstName} ${employee.user.lastName}`}</td>
                  <td className='py-4 px-6'>{employee.user.email}</td>
                  <td className='py-4 px-6'>{employee.role}</td>
                  <td className='py-4 px-6'>
                    <div className='flex items-center justify-end space-x-4'>
                      <button
                        onClick={() => handleViewDetails(employee.id)}
                        className='text-primary hover:text-primary-dark transform hover:scale-110 transition-transform'
                        title='View Details'
                      >
                        <FaEye className='w-5 h-5' />
                      </button>
                      <button
                        onClick={() =>
                          navigate(`../messages/?id=${employee.user.id}`)
                        }
                        className='text-green-500 hover:text-green-700 transform hover:scale-110 transition-transform'
                        title='Message Employee'
                      >
                        <FaInbox className='w-5 h-5' />
                      </button>
                      <button
                        onClick={() => handleRemove(employee.id)}
                        className='text-red-500 hover:text-red-700 transform hover:scale-110 transition-transform'
                        title='Remove Employee'
                      >
                        <FaTrashAlt className='w-5 h-5' />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className='animate-slide-in-right'>
          {unAuthEmployees.length > 0 ? (
            <ul>
              {unAuthEmployees.map((employee) => (
                <li
                  key={employee.id}
                  className='flex justify-between items-center border-b py-4 animate-fade-in-up'
                >
                  <div>
                    <p
                      className='font-semibold text-lg cursor-pointer text-primary'
                      onClick={() => handleViewDetails(employee.id)}
                    >
                      {employee.user.firstName} {employee.user.lastName}
                    </p>
                    <p className='text-sm text-gray-600'>{employee.role}</p>
                  </div>
                  <button
                    onClick={() => handleAuthorize(employee.id)}
                    className='text-green-500 hover:underline transform hover:scale-110 transition-transform'
                  >
                    Authorize
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className='text-gray-600'>No unauthorized employees found.</p>
          )}
        </div>
      )}

      {showDetails && selectedEmployee && (
        <div className='fixed inset-0 bg-gray-700 bg-opacity-75 flex justify-center items-center animate-fade-in'>
          <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-xl max-h-screen overflow-y-auto'>
            <h3 className='text-2xl font-bold mb-4 text-secondary-dark'>{`${selectedEmployee.user.firstName} ${selectedEmployee.user.lastName}`}</h3>
            <p className='mb-4'>
              <strong>Email:</strong> {selectedEmployee.user.email}
            </p>
            <div className='mb-4'>
              <strong>Role:</strong>
              <p>{selectedEmployee.role}</p>
            </div>
            <div className='mb-4'>
              <strong>Created At:</strong>
              <p>{selectedEmployee.user.createdAt}</p>
            </div>
            <button
              onClick={handleCloseDetails}
              className='py-2 px-4 bg-primary text-white rounded hover:bg-primary-dark transition-colors'
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ManageEmployees
