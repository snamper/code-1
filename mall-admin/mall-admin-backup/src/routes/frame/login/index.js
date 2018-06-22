import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Button, Row, Form, Input, message } from 'antd'
import { routerRedux } from 'dva/router'
import { footerText, loginTitle } from '@/utils/config'
import styles from './index.less'

const FormItem = Form.Item
const Login = ({
  loading,
  dispatch,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
  },
}) => {
  function handleOk () {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      dispatch({ type: 'login/login', payload: values })
      .then((result) => {
        if(result.message === '成功'){
          const userMessage = {
            "userId":result.data.id,
						"phone":result.data.phone,
						"name": escape(result.data.name)
          }
          const d = new Date();
          d.setTime(d.getTime()+(1*24*60*60*1000));
          var expires = "expires="+d.toGMTString();
          document.cookie = "userMessage=" + JSON.stringify(userMessage) + "; " + expires +";path=/";
          localStorage.setItem("userType",1)
          dispatch(routerRedux.push({
            pathname:'/'
          }))
        }else{
          message.error(result.message)
        }
      })
    })
  }

  return (
    <div className={styles.form}>
      <div className={styles.logo}>
        <span>{loginTitle}</span>
      </div>
      <form>
        <FormItem hasFeedback>
          {getFieldDecorator('account', {
            rules: [
              {
                required: true,
              },
            ],
          })(<Input onPressEnter={handleOk} placeholder="用户名" autoComplete="off" />)}
        </FormItem>
        <FormItem hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
              },
            ],
          })(<Input type="password" onPressEnter={handleOk} placeholder="密码" autoComplete="off" />)}
        </FormItem>
        <Row>
          <Button type="primary" onClick={handleOk} loading={loading.effects.login}>
            登 录
          </Button>
          <p>
            <span>{footerText}</span>
          </p>
        </Row>

      </form>
    </div>
  )
}

Login.propTypes = {
  form: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ loading }) => ({ loading }))(Form.create()(Login))
