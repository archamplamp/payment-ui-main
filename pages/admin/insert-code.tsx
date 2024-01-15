import Router from 'next/router'
import Style from './insertCode.module.scss'
import { useState } from 'react'
import axios from 'axios'
import config from '../../config/index'

const InsertCodeService = (): JSX.Element => {
  const [inputDataCode, setInputDataCode] = useState<string>('')
  const [inputDataQuota, setInputDataQuota] = useState<number | ''>('') // Initialize as number or empty string
  const [inputDataExpireTime, setInputDataExpireTime] = useState<number | ''>('')
  const [error, setError] = useState<string | null>(null)

  console.log({ inputDataCode, inputDataQuota })

  const adminInsertDataCode = async (): Promise<void> => {
    try {
      // Validate that quota is a number and not negative
      const quotaValue = Number(inputDataQuota)
      const expireTimeValue = Number(inputDataExpireTime)

      if (isNaN(quotaValue) || quotaValue < 0) {
        setError('Quota must be a non-negative number')
        return
      }

      if (isNaN(expireTimeValue) || expireTimeValue < 0) {
        setError('Expire Time must be a non-negative number')
        return
      }
      // Clear previous errors
      setError(null)
      const dataCreate = {
        codePackage: inputDataCode,
        quota: Number(inputDataQuota),
        gobbet: Number(inputDataExpireTime)
      }
      const token = localStorage.getItem('token')
      const apiUrl = `${config.ApiPath}/create-code-package`
      const response = await axios.post(apiUrl, dataCreate, {
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
          Router.push('/admin/insert-code')
        }
      } else {
        // Handle errors if the API request was not successful
        console.error('API request failed')
        Router.push('/admin/insert-code')
      }
    } catch (error) {
      console.error('Error sending API request', error)
    }
  }

  const adminCode = (): void => {
    Router.push('/admin/code')
  }

  return (
    <div className={Style['container']}>
      <div className={Style['_item-center']}>
        <div className={Style['_card']}>
          <div className={Style['_modal']}>
            <h2 className={`${Style['title']} ${Style['_item-center']}`}>Insert Data Code </h2>
            <form>
              <div className={Style['_item-center-code']}>
                <label htmlFor="code">Code :</label>
                <input type="text" id="code" name="code" placeholder="Enter code name" value={inputDataCode} onChange={e => setInputDataCode(e.target.value)} className={Style['tax-box']} />
              </div>
              <div className={Style['_item-center-code']}>
                <label htmlFor="quota">Quota :</label>
                <input type="number" id="quota" name="quota" placeholder="Enter quota" value={inputDataQuota} onChange={e => setInputDataQuota(e.target.value)} className={Style['tax-box']} />
              </div>
              <div className={Style['_item-center-code']}>
                <label htmlFor="quota">Expiry :</label>
                <input type="number" id="expiry" name="expiry" placeholder="Enter expiry time" value={inputDataExpireTime} onChange={e => setInputDataExpireTime(e.target.value)} className={Style['tax-box']} />
              </div>
              {error && <div className={Style['error-message']}>{error}</div>}
              <div>
                <br></br>
              </div>
              <div className={Style['_item-center']}>
                <div className={Style['button-container']}>
                  <button type="button" className={Style['send-btn']} onClick={() => adminInsertDataCode()}>
                    Insert
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

export default InsertCodeService
