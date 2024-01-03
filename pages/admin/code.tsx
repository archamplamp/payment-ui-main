import Router from 'next/router'
import React, { useState, useEffect } from 'react'
import styles from './admin.module.scss' // Import your CSS module
import moment from 'moment'

const PackageCode = (): JSX.Element => {
  const [inputValue, setInputValue] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const [packageCode, setDataPackageCode] = useState<any[]>([])

  const formatDate = (dateTimeString: string): string => {
    if (!dateTimeString) {
      return ''
    }
    return moment(dateTimeString).format('DD/MM/YYYY HH:mm:ss')
  }

  const getStatusColorClass = (status: string): string => {
    return status === 'ACTIVE' ? styles.activeStatus : ''
  }

  const checkDataCodePackage = async (): Promise<void> => {
    try {
      setLoading(true)
      setError(null)

      // Simulate an API call or update the data based on your actual API logic
      // get data from api
      const response = await fetch('http://localhost:4040/admin-find-all')
      if (response.ok) {
        const responseData = await response.json()
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
    await fetch(`http://localhost:4040/delete-code-package/${packageId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        console.log('delete success')
        checkDataCodePackage()
      } else {
        console.log('delete fail')
      }
    })
  }

  const handleInsertData = (packageId: string): void => {
    // Placeholder for delete action
    console.log(`Insert package with ID ${packageId}`)
    //insert data code package
    fetch(`http://localhost:4040/create-code-package`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      console.log({ a: response })
      if (response.ok) {
        console.log('insert success')
        //update data before delete
        checkDataCodePackage()
      } else {
        console.log('insert fail')
      }
    })
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
              <th>Package ID</th>
              <th>Code Package</th>
              <th>Status</th>
              <th>Created</th>
              <th>Updated</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {packageCode.map(packageItem => (
              <tr key={packageItem._id}>
                <td>{packageItem._id}</td>
                <td>{packageItem.codePackage}</td>
                <td>{packageItem.status}</td>
                <td>{formatDate(packageItem.created_at)}</td>
                <td>{formatDate(packageItem.updated_at)}</td>
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
