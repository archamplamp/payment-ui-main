import Router from 'next/router'
import Style from './package.module.scss'
import { useState } from 'react'
import axios from 'axios'
import config from '../../config/index'

const PackageCodeAndCoupon = (): JSX.Element => {
  const [inputValue, setInputValue] = useState<string>('')

  const checkDataCodePackage = (): void => {
    try {
      axios
        .post(
          `${config.ApiPath}/check-code-package`,
          {
            codePackage: inputValue
          },
          { headers: { 'Content-Type': 'application/json' } }
        )
        .then(response => {
          if (response.status === 200) {
            const responseData = response.data
            console.log({ responseData })
            if (responseData.res_code === '0000') {
              handleEventCheckCodePackageSuccess()
            } else {
              Router.push('/code-package/coupon-fail')
            }
          } else {
            // Handle errors if the API request was not successful
            console.error('API request failed')
            Router.push('/fujifilm')
          }
        })
        .catch(error => {
          console.log(`${config.ApiPath}/check-code-package`, error)
        })
    } catch (error) {
      console.error('Error sending API request', error)
    }
  }

  const handleEventCheckCodePackageSuccess = async (): Promise<void> => {
    await axios.get('http://localhost:3000/unlockScreen').catch(e => console.log(e, 'unlockScreen'))
    await axios.get('http://localhost:3000/killBrowser').catch(e => console.log(e, 'killBrowser'))
    Router.push('/fujifilm')
  }

  const homepage = (): void => {
    Router.push(`/fujifilm`)
  }

  return (
    <div className={Style['container']}>
      <div className={Style['_item-center']}>
        <div className={Style['_card']}>
          <div className={Style['_modal']}>
            <h2 className={`${Style['title']} ${Style['_item-center']}`}>Coupon & Promo Code</h2>
            <div className={Style['_item-center']}>
              <div className={Style['input-container']}>
                <input type="text" placeholder="Please enter your code" value={inputValue} onChange={e => setInputValue(e.target.value)} className={Style['tax-box']} />
              </div>
              <div className={Style['button-container']}>
                <button className={Style['send-btn']} onClick={() => checkDataCodePackage()}>
                  Submit
                </button>
                <button className={Style['cancel-button']} onClick={() => homepage()}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PackageCodeAndCoupon
