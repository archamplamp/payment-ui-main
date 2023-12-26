
import React, { useState, useEffect } from 'react';
import styles from './admin.module.scss'; // Import your CSS module

const PackageCode = (): JSX.Element => {
  const [inputValue, setInputValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [packageCode, setDataPackageCode] = useState<any[]>([]);

  const checkDataCodePackage = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      // Simulate an API call or update the data based on your actual API logic

      const dataResponse = [
        {
          id: '658a37bc2ce66c811ca1a880',
          codePackage: 'pL6vtbnl',
          status: 'BLOCK',
          created_at: '2023-12-26T02:17:32.375Z',
          updated_at: '2023-12-26T03:04:03.171Z',
        },
        {
          id: '658a37bc2ce66c811ca1a880d',
          codePackage: 'sLhvtbnl',
          status: 'BLOCK',
          created_at: '2023-12-26T02:17:32.375Z',
          updated_at: '2023-12-26T03:04:03.171Z',
        },
        {
          id: '658a37bc2ce66c811ca1a880d',
          codePackage: 'lL6vtbnl',
          status: 'BLOCK',
          created_at: '2023-12-26T02:17:32.375Z',
          updated_at: '2023-12-26T03:04:03.171Z',
        },
      ];

      setDataPackageCode(dataResponse);
    } catch (error) {
      setError('Error sending API request');
      console.error('Error sending API request', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (packageId: string): void => {
    // Placeholder for edit action
    console.log(`Edit package with ID ${packageId}`);
  };

  const handleDelete = (packageId: string): void => {
    // Placeholder for delete action
    console.log(`Delete package with ID ${packageId}`);
  };

  const handleInsertData = (packageId: string): void => {
    // Placeholder for delete action
    console.log(`Insert package with ID ${packageId}`);
  };

  useEffect(() => {
    checkDataCodePackage();
  }, []);

  return (
    <div className={styles.container}>
      <div className="table-responsive">
      <h2 className={styles['listDataTitle']}>TABLE DATA</h2>
        <table className={`table ${styles.studentTable}`}>
          <thead>
            <tr>
              <th>Package ID</th>
              <th>Code Package</th>
              <th>Status</th>
              <th>Created</th>
              <th>Updated</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {packageCode.map((packageItem) => (
              <tr key={packageItem.id}>
                <td>{packageItem.id}</td>
                <td>{packageItem.codePackage}</td>
                <td>{packageItem.status}</td>
                <td>{packageItem.created_at}</td>
                <td>{packageItem.updated_at}</td>
                <td>
                  <button className={styles['edit-btn']} onClick={() => handleEdit(packageItem.id)}>
                    Edit
                  </button>
                  <button className={styles['delete-btn']} onClick={() => handleDelete(packageItem.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div><br></br></div>
      <div className={styles.addButtonContainer}>
        <button className={styles['add-code-btn']} onClick={() => handleInsertData(packageItem.id)}>
          ADD CODE
        </button>
      </div>
    </div>
  );
};

export default PackageCode;