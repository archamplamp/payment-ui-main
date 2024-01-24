// hook
import Router from 'next/router'
import React, { useEffect } from 'react'
import Image from 'next/image' // Import the next/image module
import Style from './fail.module.scss'
import classNames from 'classnames'
import warning from '../../public/warning.png'

const TransactionFail = (): JSX.Element => {
  // use effect
  useEffect(() => {
    setTimeout(() => Router.push('/fujifilm'), 2000)
  }, [])

  return (
    <div className={Style['error-card']}>
      <div className={Style['fail-container']}>
        <Image src={warning} alt="Warning" className={Style['img-fail']} width={warning.width / 4} height={warning.height / 4} />
      </div>
      <div className={classNames(Style['alert-box'], Style['error'], Style['font-medium'])}>
        <span>Error: </span>
        Information you entered is incorrect. Please try again!
      </div>
    </div>
  )
}

export default TransactionFail
