import Router from 'next/router'
import Style from './package.module.scss'
import { useState } from 'react'
import axios from 'axios'
import config from '../../config/index'

const PackageCode = (): JSX.Element => {
  const [inputValue, setInputValue] = useState<string>('')

  const checkDataCodePackage = (): void => {
    try {
      axios
        .post(`${config.ApiPath}:4040/check-code-package`, {
          codePackage: inputValue
        })
        .then(response => {
          if (response.status === 200) {
            const responseData = response.data
            console.log('******************')
            console.log({ responseData })
            if (responseData.res_code === '0000') {
              handleEventCheckCodePackageSuccess()
            } else {
              Router.push('/code-package/fail')
            }
          } else {
            // Handle errors if the API request was not successful
            console.error('API request failed')
            Router.push('/')
          }
        })
        .catch(error => {
          console.log(`${config.ApiPath}:4040/check-code-package`, error)
        })

      // const apiUrl = `${config.ApiPath}:4040/check-code-package`;
      // // const apiUrl = 'http://43.229.133.171:4040/check-code-package'; // Fix the URL by removing the extra colon
      // console.log({ apiUrl });

      // const response = await axios.post(apiUrl, {
      //   codePackage: inputValue,
      // }, {
      //   headers: {
      //     'Content-Type': 'application/json',
      //   }
      // });

      // if (response.status === 200) {
      //   const responseData = response.data;
      //   console.log("******************");
      //   console.log(responseData);

      //   if (responseData.res_code === "0000") {
      //     handleEventCheckCodePackageSuccess();
      //   } else {
      //     Router.push('/code-package/fail');
      //   }
      // } else {
      //   // Handle errors if the API request was not successful
      //   console.error('API request failed');
      //   Router.push('/');
      // }
    } catch (error) {
      console.error('Error sending API request', error)
    }
  }

  const handleEventCheckCodePackageSuccess = async (): Promise<void> => {
    await axios.get('http://localhost:3000/unlockScreen').catch(e => console.log(e, 'unlockScreen'))
    await axios.get('http://localhost:3000/killBrowser').catch(e => console.log(e, 'killBrowser'))
    Router.push('/')
  }

  const homepage = (): void => {
    Router.push(`/`)
  }

  return (
    <div className={Style['container']}>
      <div className={Style['_item-center']}>
        <div className={Style['_card']}>
          <div className={Style['_modal']}>
            <h2 className={`${Style['title']} ${Style['_item-center']}`}>Please Enter Your Information.</h2>
            <div className={Style['_item-center']}>
              <div className={Style['input-container']}>
                <input type="text" placeholder="Enter code!" value={inputValue} onChange={e => setInputValue(e.target.value)} className={Style['tax-box']} />
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

export default PackageCode
