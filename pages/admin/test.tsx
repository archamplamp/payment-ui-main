import React, { useState, useEffect } from 'react'
import styles from './admin.module.scss' // Import your CSS module
import moment from 'moment'
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const PackageCode = (): JSX.Element => {
  const [inputValue, setInputValue] = useState<string>('');
  const [objectId, setobjectId] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [packageCode, setDataPackageCode] = useState<any[]>([]);


  const formatDate = (dateTimeString: string): string => {
    if (!dateTimeString) {
      return ""; 
    }
    return moment(dateTimeString).format('DD/MM/YYYY HH:mm:ss');
  };

  const checkDataCodePackage = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

//get data from api 
      const response = await fetch('http://localhost:4040/admin-find-all');
      if (response.ok) {
        const responseData = await response.json();
        console.log({data:responseData.res_data});
        setDataPackageCode(responseData.res_data);
      } else {
        // Handle errors if the API request was not successful
        console.error('API request failed');
      }

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

  const handleDelete = async(packageId: string): Promise<void> => {
    // Placeholder for delete action
    console.log(`Delete package with ID ${packageId}`);
      //delete data with id
      // const data= await fetch(`http://localhost:4040/delete-code-package`);
      // console.log({a:data});
  };

  const handleInsertData = (packageId: string): void => {
    // Placeholder for delete action
    console.log(`Insert package with ID ${packageId}`);
  };



  useEffect(() => {
    checkDataCodePackage();
  }, []);


  return (
    <div>

  <Container>
    <Row>
      <Col xs>Fujifilm Photo-Booth Project </Col>
      <Col xs={{ order: 12 }}></Col>
      <Col xs={{ order: 4 }}>{moment().format('DD/MM/YYYY HH:mm:ss')}</Col>
    </Row>
  </Container>
  <Container fluid>
    <Row>
      <Col>
        <div className={styles.scrollableTable}>
          <Table striped bordered hover>
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
              {packageCode.map((packageItem) => (
                <tr key={packageItem._id}>
                  <td>{packageItem._id}</td>
                  <td>{packageItem.codePackage}</td>
                  <td>{packageItem.status}</td>
                  <td>{formatDate(packageItem.created_at)}</td>
                  <td>{formatDate(packageItem.updated_at)}</td>
                  <td>
                    <Button variant="info" onClick={() => handleEdit(packageItem._id)}>Edit</Button>{' '}
                    <Button variant="danger" onClick={() => handleDelete(packageItem._id)}>Delete</Button>{' '}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Col>
    </Row>
  </Container>
  <Container>
    <Row>
      <Col xs></Col>
      <Col xs></Col>
      <Col xs={{ order: 12 }}></Col>
      <Col xs={{ order: 4 }}>    
        <Button variant="primary" onClick={() => handleInsertData()}>ADD CODE</Button>{' '}
      </Col>
    </Row>
  </Container>
</div>
  );

};


export default PackageCode;