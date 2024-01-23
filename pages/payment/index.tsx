// hook
import Router from 'next/router'
import React, { useState, useEffect } from 'react'

// component
import Card from '../../component/Cards'
import Timer from '../../component/Payment/Timer'

// style
import Style from './payment.module.scss'

// service
import { getConfigPayment } from '../../service/payment.service'
import config from '../../config/index'

// lib
import axios from 'axios'

//image
import recPic from '../../public/rec.png'
import rightopPic from '../../public/right-top.png'
import menuPic from '../../public/menu.png'
import logoPic from '../../public/logo.png'

// interface
interface IProps {
  price?: number
  expiredTime?: number
  qrCodeUrl: string
  source?: string
}

// life circle
// getServerSideProps -> props -> script file -> state -> render -> useEffect
const Payment = ({ price, expiredTime, qrCodeUrl, source }: IProps): JSX.Element => {
  // state
  type EnumStatusPayment = 'failed' | 'pending' | 'success'
  const [qrCode, setQrCode] = useState<string>(qrCodeUrl)
  const [paymentCompleted, setPaymentCompleted] = useState<EnumStatusPayment>('pending')
  // interval check function
  const intervalCheckPayment = (): void => {
    //10 is source_id for check payment
    axios.post(`${config.ApiPath}/checkPaymentStatus/${source}`).then(res => {
      if (res.data.status === 'failed' || res.data.status === 'expired') setPaymentCompleted('failed')
      else if (res.data.status === 'successful') setPaymentCompleted('success')
    })
  }

  const callApiLockScreen = (): void => {
    axios
      .get('http://localhost:3000/lockScreen')
      .then(res => {
        console.log('Lock screen completed')
      })
      .catch(error => {
        console.log(error)
      })
  }

  const handleEventPaymentSuccess = async (): Promise<void> => {
    await axios.get('http://localhost:3000/unlockScreen').catch(e => console.log(e, 'unlockScreen'))
    await axios.get('http://localhost:3000/killBrowser').catch(e => console.log(e, 'killBrowser'))
    Router.push('/')
  }

  // use effect
  useEffect(() => {
    //completed
    if (paymentCompleted === 'success') {
      console.log('callApiLockScreen')
      handleEventPaymentSuccess()
    } else if (paymentCompleted === 'failed') {
      Router.push('/payment/fail')
    }
    const interval = setInterval(intervalCheckPayment, 10000)
    return () => clearInterval(interval)
  }, [paymentCompleted])

  return (
    <div className={Style['container']}>
      <div className={Style['box']}>
        <div className={Style['box-nav']}>
          <div className={Style['left']}>
            <img src={recPic.src} className={Style['img-rec']}></img>
          </div>
          <div className={Style['right']}>
            <img src={rightopPic.src} className={Style['img-rightop']}></img>
          </div>
        </div>
        <div className={Style['box-container']}>
          <div className={Style['box-left']}>
            <div className={Style['qr-header']}> สแกน QR เพื่อ ชำระเงิน </div>
            <div className={Style['price']}> ยอดชำระ {price} THB </div>
          </div>
          <div className={Style['img-qrcode']}>
            <div id="2">
              <Card name={'Payment'} />
              <img src={qrCode} height="500px" />
            </div>
          </div>
          <div className={Style['box-right']}>
            <Timer initialMinute={expiredTime} />
          </div>
        </div>
        <div className={Style['box-nav']}>
          <div className={Style['foot-right']}>
            <img src={menuPic.src} className={Style['img-righfoot']}></img>
          </div>
        </div>
      </div>
      <div className={Style['foot-center']}>
        <img src={logoPic.src} className={Style['img-centerfoot']}></img>
      </div>
    </div>
  )
}

interface SideProps {
  props: IProps
}

export async function getServerSideProps(): Promise<SideProps> {
  const configPayment = await getConfigPayment()
  const data = await axios.get(`${config.ApiPath}/qrCode`).then(res => res.data)
  return {
    props: {
      ...configPayment,
      qrCodeUrl: data.qrCode,
      source: data.source
    }
  }
}

export default Payment

function then(arg0: (error: any) => void): ((reason: any) => PromiseLike<never>) | null | undefined {
  throw new Error('Function not implemented.')
}
