import Router from 'next/router'
import Style from './login.module.scss'
import { useState } from 'react'
import axios from 'axios'
import config from '../../config/index'

const loginService = (): JSX.Element => {
  const [inputUsername, setInputUsername] = useState<string>('')
  const [inputPassword, setInputPassword] = useState<string>('')

  const adminLoginService = async (): Promise<void> => {
    try {
      const apiUrl = `${config.ApiPath}/login`
      console.log('--> FUNCTION LOGIN SERVICE ', { apiUrl })
      const response = await axios.post(
        apiUrl,
        {
          username: inputUsername,
          password: inputPassword
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      console.log('--> LOG', { response })

      if (response.status === 200) {
        const responseData = response.data
        console.log(responseData)

        if (responseData.res_code === '0000') {
          Router.push('/admin/code')
        } else {
          Router.push('/admin/fail')
        }
      } else {
        // Handle errors if the API request was not successful
        console.error('API request failed')
        Router.push('/admin/fail')
      }
    } catch (error) {
      console.error('Error sending API request', error)
    }
  }

  const homepage = (): void => {
    Router.push('/')
  }

  return (
    <div className={Style['container']}>
      <div className={Style['_item-center']}>
        <div className={Style['_card']}>
          <div className={Style['_modal']}>
            <h2 className={`${Style['title']} ${Style['_item-center']}`}>ADMIN </h2>
            <div className={Style['_item-center']}>
              <div className={Style['input-container']}>
                <input type="text" placeholder="username" value={inputUsername} onChange={e => setInputUsername(e.target.value)} className={Style['tax-box']} />
              </div>
              <div className={Style['input-container']}>
                <input type="password" placeholder="password" value={inputPassword} onChange={e => setInputPassword(e.target.value)} className={Style['tax-box']} />
              </div>
              <div className={Style['button-container']}>
                <button className={Style['send-btn']} onClick={() => adminLoginService()}>
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

export default loginService
