// hook
import Router from 'next/router'
import React, { useEffect } from 'react'

// style
import Style from './payment.module.scss'

import classNames from 'classnames'

//image
import errorPic from '../../public/error.jpg'

const FailPayment = (): JSX.Element => {
  // use effect
  useEffect(() => {
    setTimeout(() => Router.push('/'), 10000)
  }, [])

  return (
    // <div>
    //   <div
    //     className={classNames(
    //       Style['alert-box'],
    //       Style['error'],
    //       Style['font-medium'],
    //     )}
    //   >
    //     <span>error: </span>
    //     ทำรายการไม่สำเร็จ !!!
    //   </div>
    // </div>
    <div className={Style['fail-container']}>
      <img
        src={errorPic.src}
        className={Style['img-fail']}
      ></img>
    </div>

  )
}

export default FailPayment