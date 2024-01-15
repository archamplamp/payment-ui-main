import Router from 'next/router'
import React, { useState, useEffect } from 'react'
import styles from './admin.module.scss' // Import your CSS module
import moment from 'moment'
import axios from 'axios' // Import Axios library
import config from '../../config/index'
const PackageCode = (): JSX.Element => {
  // const [inputValue, setInputValue] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [packageCode, setDataPackageCode] = useState<any[]>([])

  const formatDate = (dateTimeString: string): string => {
    if (!dateTimeString) {
      return ''
    }
    return moment(dateTimeString).format('DD/MM/YYYY HH:mm:ss')
  }
  const calculateRemainingDays = (expiredTime: string): number => {
    const now = moment() // current date
    const expirationDate = moment(expiredTime) // expiredTime date
    const remainingDays = expirationDate.diff(now, 'days') + 1 // difference in days
    return remainingDays
  }

  const getStatusColorClass = (status: string): string => {
    return status === 'ACTIVE' ? styles.activeStatus : ''
  }

  const checkDataCodePackage = async (): Promise<void> => {
    try {
      setLoading(true)
      setError(null)
      const token = localStorage.getItem('token')
      const response = await axios.get(`${config.ApiPath}/admin-find-all`, {
        headers: {
          'Content-Type': 'application/json',
          token: `${token}`
        }
      })
      if (response.status === 200) {
        const responseData = response.data
        console.log({ data: responseData.res_data })

        setDataPackageCode(responseData.res_data)
      } else {
        console.error('API request failed')
      }
    } catch (error) {
      setError('Error sending API request')
      console.error('Error sending API request', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (packageId: string): void => {
    // Placeholder for edit action
    console.log(`Edit package with ID ${packageId}`)
  }

  const handleDelete = async (packageId: string): Promise<void> => {
    // Placeholder for delete action
    console.log(`Delete package with ID ${packageId}`)
    try {
      const response = await axios.delete(`${config.ApiPath}/delete-code-package/${packageId}`)
      if (response.status === 200) {
        console.log('delete success')
        checkDataCodePackage()
      } else {
        console.log('delete fail')
      }
    } catch (error) {
      console.error('Error sending delete request', error)
    }
  }

  const handleInsertData = (): void => {
    Router.push('/admin/insert-code')
  }

  useEffect(() => {
    checkDataCodePackage()
  }, [])

  return (
    <div className={styles.container}>
      <div className="table-responsive">
        <h2 className={styles['listDataTitle']}>TABLE DATA</h2>
        <table className={`table ${styles.packageCode}`}>
          <thead>
            <tr>
              {/* <th>Package ID</th> */}
              <th>Code Package</th>
              <th>Quota</th>
              <th>Created</th>
              <th>Remaining Days </th>
              <th>Exp.</th>
              <th>Status</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {packageCode.map(packageItem => (
              <tr key={packageItem._id}>
                {/* <td>{packageItem._id}</td> */}
                <td>{packageItem.codePackage}</td>
                <td>{packageItem.quota}</td>
                <td>{formatDate(packageItem.created_at)}</td>
                <td>{calculateRemainingDays(packageItem.expiredTime)}</td>
                <td>{formatDate(packageItem.expiredTime)}</td>
                <td>{packageItem.status}</td>
                <td>
                  <button className={`${styles['edit-btn']} ${getStatusColorClass(packageItem.status)}`} onClick={() => handleEdit(packageItem._id)}>
                    Edit
                  </button>
                  <button className={`${styles['delete-btn']} ${getStatusColorClass(packageItem.status)}`} onClick={() => handleDelete(packageItem._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <br></br>
      </div>
      <div className={styles.addButtonContainer}>
        <button className={styles['add-code-btn']} onClick={() => handleInsertData()}>
          ADD CODE
        </button>
      </div>
    </div>
  )
}

export default PackageCode
