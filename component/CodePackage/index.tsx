import Router from 'next/router'
import Style from './index.module.scss'

import indexPic from '../../public/index.png'
import Modal from 'react-modal'
import { useState } from 'react'

// component
import TermAndCondition from '../PDPA/TermAndCondition'
import PrivacyPolicy from '../PDPA/PrivacyPolicy'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
}

const PaymentIndex = (): JSX.Element => {
  // state
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [tab, setTab] = useState<string>('TermAndCondition')

  const redirect = (): void => {
    Router.push('/code-package')
  }

  // sub Component

  return (
    <div className={Style['container']}>
      <img src={indexPic.src} className={Style['img-index']} onClick={() => setIsOpen(true)}></img>
      <div className={Style['_item-center']}>
        <Modal isOpen={isOpen} style={customStyles}>
          <div className={Style['_modal']}>
            <div className={Style['_item-center']}>
              <div className={Style['_tab']} style={{ backgroundColor: tab === 'TermAndCondition' ? 'ButtonHighlight' : '' }} onClick={() => setTab('TermAndCondition')}>
                {' '}
                {'ข้อกำหนดและเงื่อนไข (Terms & Conditions)'}{' '}
              </div>
              <div className={Style['_tab']} style={{ marginLeft: '15px', backgroundColor: tab === 'PrivacyPolicy' ? 'ButtonHighlight' : '' }} onClick={() => setTab('PrivacyPolicy')}>
                {' '}
                {'นโยบายความเป็นส่วนตัว'}{' '}
              </div>
            </div>
            {tab === 'TermAndCondition' && <TermAndCondition />}
            {tab === 'PrivacyPolicy' && <PrivacyPolicy />}
            <div className={Style['_item-center']} style={{ marginTop: '10px', padding: '10px' }}>
              <button onClick={() => setIsOpen(false)}> ไม่ยินยอม </button>
              <button style={{ marginLeft: '10px' }} onClick={() => redirect()}>
                {' '}
                ยินยอม{' '}
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  )
}

export default PaymentIndex
