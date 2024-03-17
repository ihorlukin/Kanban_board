import { Container, Box, Button } from '@mui/material'
import { useState, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import authUtils, { EN_FLAG, UA_FLAG } from '../../utils/authUtils'
import Loading from '../common/Loading'
import assets from '../../assets'
import { useTranslation } from 'react-i18next'

const AuthLayout = () => {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      const isAuth = await authUtils.isAuthenticated()
      console.log(isAuth)
      if (!isAuth) {
        setLoading(false)
      } else {
        navigate('/')
      }
    }
    checkAuth()
  }, [navigate])

  return (
    loading ? (
      <Loading fullHeight />
    ) : (
      <Container component='main' maxWidth='xs'>
        <Box sx={{display: "flex", paddingTop:2, justifyContent: "center"}}>
          <Button onClick={() => i18n.changeLanguage("ua")}>
          {UA_FLAG}
          </Button>
          <Button onClick={() => i18n.changeLanguage("en")}>
          {EN_FLAG}
          </Button>
        </Box>
        <Box sx={{
          marginTop: 8,
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column'
        }}>
          <img src={assets.images.logoDark} style={{ width: '100px' }} alt='app logo' />
          <Outlet />
        </Box>
      </Container>
    )
  )
}

export default AuthLayout