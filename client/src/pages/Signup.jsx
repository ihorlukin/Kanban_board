import { Box, Button, TextField } from '@mui/material'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LoadingButton from '@mui/lab/LoadingButton'
import authApi from '../api/authApi'
import { useTranslation } from 'react-i18next'

const Signup = () => {
  const navigate = useNavigate()
  const {t, i18n } = useTranslation()
  const [loading, setLoading] = useState(false)
  const [usernameErrText, setUsernameErrText] = useState('')
  const [passwordErrText, setPasswordErrText] = useState('')
  const [confirmPasswordErrText, setConfirmPasswordErrText] = useState('')
  const [emailErrText, setEmailErrText] = useState('')
  const handleSubmit = async (e) => {
    e.preventDefault()
    setUsernameErrText('')
    setPasswordErrText('')
    setConfirmPasswordErrText('')

    const data = new FormData(e.target)
    const username = data.get('username').trim()
    const password = data.get('password').trim()
    const confirmPassword = data.get('confirmPassword').trim()
    const email = data.get('email').trim()
    let err = false

    if (username === '') {
      err = true
      setUsernameErrText(t("signup.emptyField"))
    }
    if (email === '') {
      setEmailErrText('email empty')
    }
    if (password === '') {
      err = true
      setPasswordErrText(t("signup.emptyField"))
    }
    if (confirmPassword === '') {
      err = true
      setConfirmPasswordErrText(t("signup.emptyField"))
    }
    if (password !== confirmPassword) {
      err = true
      setConfirmPasswordErrText(t("signup.confirmPasswordField"))
    }

    if (err) return

    setLoading(true)

    try {
      const res = await authApi.signup({
        email, username, password, 
      })
      setLoading(false)
      console.log(res)
      localStorage.setItem('token', res.token)
      navigate('/')
    } catch (err) {
      console.log(err)
      // const errors = err.data.errors
      // errors.forEach(e => {
      //   if (e.param === 'username') {
      //     setUsernameErrText(e.msg)
      //   }
      //   if (e.param === 'password') {
      //     setPasswordErrText(e.msg)
      //   }
      //   if (e.param === 'email') {
      //     setEmailErrText(e.msg)
      //   }
      //   if (e.param === 'confirmPassword') {
      //     setConfirmPasswordErrText(e.msg)
      //   }
      // })
      setLoading(false)
    }
  }

  return (
    <>
      <Box
        component='form'
        sx={{ mt: 1 }}
        onSubmit={handleSubmit}
        noValidate
      >
        <TextField
          margin='normal'
          required
          fullWidth
          id='username'
          label={t("signup.username")}
          name='username'
          disabled={loading}
          error={usernameErrText !== ''}
          helperText={usernameErrText}
        />
        <TextField
          margin='normal'
          required
          fullWidth
          id='email'
          label={'Email'}
          name='email'
          disabled={loading}
          error={usernameErrText !== ''}
          helperText={usernameErrText}
        />
        <TextField
          margin='normal'
          required
          fullWidth
          id='password'
          label='Password'
          name='password'
          type='password'
          disabled={loading}
          error={passwordErrText !== ''}
          helperText={passwordErrText}
        />
        <TextField
          margin='normal'
          required
          fullWidth
          id='confirmPassword'
          label='Confirm Password'
          name='confirmPassword'
          type='password'
          disabled={loading}
          error={confirmPasswordErrText !== ''}
          helperText={confirmPasswordErrText}
        />
        <LoadingButton
          sx={{ mt: 3, mb: 2 }}
          variant='outlined'
          fullWidth
          color='success'
          type='submit'
          loading={loading}
        >
          Signup
        </LoadingButton>
      </Box>
      <Button
        component={Link}
        to='/login'
        sx={{ textTransform: 'none' }}
      >
        {t("signup.changeButtonValue")}
      </Button>
    </>
  )
}

export default Signup