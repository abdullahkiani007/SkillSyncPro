import React, { useState, useEffect } from 'react'
import { FaEye, FaArchive, FaTrashAlt } from 'react-icons/fa'
import admin from '../../../API/admin'

const ManageEmployees = () => {
  const [employees, setEmployees] = useState([])
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const token = localStorage.getItem('accessToken')
        const response = await admin.getAllEmployees(token)
        setEmployees(response.data)
      } catch (error) {
        console.error('Failed to fetch employees', error)
      }
    }

    fetchEmployees()
  }, [])

  const handleViewDetails = async (employeeId) => {
    try {
      const token = localStorage.getItem('accessToken')
      const response = await admin.getEmployeeDetails(employeeId, token)
      setSelectedEmployee(response.data)
      setShowDetails(true)
    } catch (error) {
      console.error('Failed to fetch employee details', error)
    }
  }

  const handleCloseDetails = () => {
    setShowDetails(false)
    setSelectedEmployee(null)
  }

  const handleArchiveEmployee = async (employeeId) => {
    try {
      const token = localStorage.getItem('accessToken')
      await admin.archiveEmployee(employeeId, token)
      setEmployees(employees.filter((emp) => emp._id !== employeeId))
    } catch (error) {
      console.error('Failed to archive employee', error)
    }
  }

  const handleDeleteEmployee = async (employeeId) => {
    try {
      const token = localStorage.getItem('accessToken')
      await admin.deleteEmployee(employeeId, token)
      setEmployees(employees.filter((emp) => emp._id !== employeeId))
    } catch (error) {
      console.error('Failed to delete employee', error)
    }
  }

  return (
    <div className='p-8 bg-gradient-to-r from-secondary-dark to-secondary-dark min-h-screen'>
      <h2 className='text-4xl font-extrabold text-white mb-8'>
        Manage Employees
      </h2>

      {/* Employees Table */}
      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white shadow-md rounded-lg overflow-hidden'>
          <thead className='bg-gradient-to-r from-primary to-primary text-white'>
            <tr>
              <th className='py-3 px-4 text-left'>Name</th>
              <th className='py-3 px-4 text-left'>Email</th>
              <th className='py-3 px-4 text-left'>Role</th>
              <th className='py-3 px-4 text-left'>Actions</th>
            </tr>
          </thead>
          <tbody className='text-slate-700'>
            {employees.map((employee) => (
              <tr
                key={employee._id}
                className='border-b hover:bg-slate-100 transition-colors'
              >
                <td className='py-4 px-4'>
                  {employee.user?.firstName && employee.user?.lastName
                    ? `${employee.user.firstName} ${employee.user.lastName}`
                    : 'No data available'}
                </td>
                <td className='py-4 px-4'>
                  {employee.user?.email
                    ? employee.user.email
                    : 'No data available'}
                </td>
                <td className='py-4 px-4'>
                  {employee.role ? employee.role : 'No data available'}
                </td>
                <td className='py-4 px-4'>
                  <div className='flex items-center space-x-4'>
                    <button
                      onClick={() => handleViewDetails(employee._id)}
                      className='text-blue-500 hover:text-blue-700 transition-colors'
                      title='View Details'
                    >
                      <FaEye className='w-5 h-5 text-black' />
                    </button>
                    <button
                      onClick={() => handleArchiveEmployee(employee._id)}
                      className='text-teal-500 hover:text-teal-700 transition-colors'
                      title='Archive Employee'
                    >
                      <FaArchive className='w-5 h-5' />
                    </button>
                    <button
                      onClick={() => handleDeleteEmployee(employee._id)}
                      className='text-red-500 hover:text-red-700 transition-colors'
                      title='Delete Employee'
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

      {/* Enhanced Employee Details Modal */}
      {showDetails && selectedEmployee && (
        <div className='fixed inset-0 bg-gray-900 bg-opacity-75 z-50 flex justify-center items-center'>
          <div className='relative bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl max-h-screen overflow-y-auto'>
            {/* Close Button */}
            <button
              onClick={handleCloseDetails}
              className='absolute top-4 right-4 text-gray-500 hover:text-gray-800'
            >
              &times;
            </button>
            {/* Modal Content */}
            <h3 className='text-3xl font-bold text-slate-800 mb-6 text-center'>
              {selectedEmployee.user?.firstName &&
              selectedEmployee.user?.lastName
                ? `${selectedEmployee.user.firstName} ${selectedEmployee.user.lastName}`
                : 'No data available'}
            </h3>
            <div className='space-y-6'>
              <p className='text-lg'>
                <strong>Email:</strong>{' '}
                {selectedEmployee.user?.email
                  ? selectedEmployee.user.email
                  : 'No data available'}
              </p>
              <p className='text-lg'>
                <strong>Role:</strong>{' '}
                {selectedEmployee.role
                  ? selectedEmployee.role
                  : 'No data available'}
              </p>
              <p className='text-lg'>
                <strong>Company:</strong>{' '}
                {selectedEmployee.company?.name
                  ? selectedEmployee.company.name
                  : 'No data available'}
              </p>
            </div>
            <button
              onClick={handleCloseDetails}
              className='mt-6 w-full py-3 bg-slate-800 text-white rounded-md hover:bg-slate-900 transition-colors'
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
