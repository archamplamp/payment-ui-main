import Router from 'next/router'
import React, { useState, useEffect } from 'react'
import styles from './admin.module.scss'
import moment from 'moment'
import axios from 'axios'
import config from '../../config/index'

const PackageCode = (): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [packageCode, setDataPackageCode] = useState<any[]>([])
  const [currentIndex, setCurrentIndex] = useState<number>(0)

  const formatDate = (dateTimeString: string): string => {
    if (!dateTimeString) {
      return ''
    }
    return moment(dateTimeString).format('DD/MM/YYYY HH:mm:ss')
  }

  const calculateRemainingDays = (expiredTime: string): number => {
    const now = moment() // current date
    const expirationDate = moment(expiredTime) // expiredTime date
    const remainingDays = expirationDate.diff(now, 'days')
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
    // Navigate to the update page with the packageId
    console.log({ packageId })
    Router.push({
      pathname: '/admin/update-code',
      query: { packageId }
    })
  }

  const handleDelete = async (packageId: string): Promise<void> => {
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
              <th>#</th>
              <th>Code Package</th>
              <th>Quota</th>
              <th>Created</th>
              <th>Remaining Days</th>
              <th>Exp.</th>
              <th>Status</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {packageCode.map((packageItem, index) => (
              <tr key={packageItem._id}>
                <td>{currentIndex + index + 1}</td>
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
        <br />
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
