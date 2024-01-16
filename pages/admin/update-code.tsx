import Router from 'next/router'
import Style from './updateCode.module.scss'
import { useState, useEffect } from 'react'
import axios from 'axios'
import config from '../../config/index'
import { useRouter } from 'next/router'
import moment from 'moment'

const updateCodeService = (): JSX.Element => {
  const router = useRouter()
  const { packageId } = router.query
  const [packageData, setPackageData] = useState<any>(null)
  const [inputDataCode, setInputDataCode] = useState<string>('')
  const [inputDataQuota, setInputDataQuota] = useState<number | ''>('') // Initialize as number or empty string
  const [inputDataExpireTime, setInputDataExpireTime] = useState<number | ''>('')
  const [error, setError] = useState<string | null>(null)
  console.log('--->', { packageData: packageData })
  const calculateRemainingDays = (expiredTime: string): number => {
    const now = moment() // current date
    const expirationDate = moment(expiredTime) // expiredTime date
    const remainingDays = expirationDate.diff(now, 'days')
    return remainingDays
  }
  const formatDate = (dateTimeString: string): string => {
    if (!dateTimeString) {
      return ''
    }
    return moment(dateTimeString).format('DD/MM/YYYY HH:mm:ss')
  }

  const adminUpdateDataCodePackage = async (): Promise<void> => {
    try {
      console.log('-->', { inputDataCode, inputDataQuota, inputDataExpireTime, packageId, packageData })
      if (inputDataCode === '' && inputDataQuota === '' && inputDataExpireTime === '') {
        Router.push('/admin/code')
      }
      // // Validate that quota is a number and not negative
      // // Clear previous errors
      setError(null)
      const dataCreate = {
        codePackage: inputDataCode,
        quota: Number(inputDataQuota),
        gobbet: Number(inputDataExpireTime)
      }
      const token = localStorage.getItem('token')
      const apiUrl = `${config.ApiPath}/update-code-package/${packageId}`
      const response = await axios.patch(apiUrl, dataCreate, {
        headers: {
          'Content-Type': 'application/json',
          token: `${token}`
        }
      })

      console.log('--> LOG', { response })
      if (response.status === 200) {
        const responseData = response.data
        console.log(responseData)
        if (responseData.res_code === '0000') {
          Router.push('/admin/code')
        } else {
          Router.push('/admin/update-code')
        }
      } else {
        // Handle errors if the API request was not successful
        console.error('API request failed')
        Router.push('/admin/update-code')
      }
    } catch (error) {
      console.error('Error sending API request', error)
    }
  }

  const adminCode = (): void => {
    Router.push('/admin/code')
  }

  useEffect(() => {
    console.log('-->> useEffect')
    const fetchData = async () => {
      try {
        const response = await axios.get(`${config.ApiPath}/get-code-package/${packageId}`)
        console.log({ response })
        if (response.status === 200) {
          const responseData = response.data
          console.log({ responseData: responseData.res_data })
          setPackageData(responseData.res_data)
        } else {
          console.error('API request failed')
        }
      } catch (error) {
        console.error('Error fetching data', error)
      }
    }

    if (packageId) {
      fetchData()
    }
  }, [packageId])

  return (
    <div className={Style['container']}>
      <div className={Style['_item-center']}>
        <div className={Style['_card']}>
          <div className={Style['_modal']}>
            <h2 className={`${Style['title']} ${Style['_item-center']}`}>Update Data Code </h2>
            <form>
              <div className={Style['_item-center-code']}>
                <label htmlFor="code">Code :</label>
                <input type="text" id="code" name="code" placeholder={packageData && packageData.codePackage ? packageData.codePackage : ''} value={inputDataCode} onChange={e => setInputDataCode(e.target.value)} className={Style['tax-box']} />
              </div>
              <div className={Style['_item-center-code']}>
                <label htmlFor="quota">Quota :</label>
                <input
                  type="number"
                  id="quota"
                  name="quota"
                  placeholder={packageData && packageData.quota !== undefined ? packageData.quota.toString() : ''}
                  value={inputDataQuota}
                  onChange={e => setInputDataQuota(e.target.value)}
                  className={Style['tax-box']}
                />
              </div>
              <div className={Style['_item-center-code']}>
                <label htmlFor="expiry">Expiry :</label>
                <input
                  type="number"
                  id="expiry"
                  name="expiry"
                  placeholder={packageData && packageData.expiredTime !== undefined ? calculateRemainingDays(packageData.expiredTime.toString()) : ''}
                  value={inputDataExpireTime}
                  onChange={e => setInputDataExpireTime(e.target.value)}
                  className={Style['tax-box']}
                />
              </div>
              <div className={Style['_item-center-code']}>
                <label htmlFor="created">Create :</label>
                <label htmlFor="created">{packageData && packageData.created_at !== undefined ? formatDate(packageData.created_at.toString()) : ''}</label>
              </div>
              {error && <div className={Style['error-message']}>{error}</div>}
              <div>
                <br />
              </div>
              <div className={Style['_item-center']}>
                <div className={Style['button-container']}>
                  <button type="button" className={Style['send-btn']} onClick={() => adminUpdateDataCodePackage()}>
                    Update
                  </button>
                  <button type="button" className={Style['cancel-button']} onClick={() => adminCode()}>
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default updateCodeService
