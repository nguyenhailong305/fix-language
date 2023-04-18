import { replace } from 'connected-react-router'
import Cookies from 'js-cookie'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { Action } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { API_PATHS } from '../../../configs/api'
import { ROUTES } from '../../../configs/routes'
import logo from '../../../logo-420-x-108.png'
import { ISignUpParams } from '../../../models/auth'
import { AppState } from '../../../redux/reducer'
import { getErrorMessageResponse } from '../../../utils'
import { ACCESS_TOKEN_KEY } from '../../../utils/constants'
import { RESPONSE_STATUS_SUCCESS } from '../../../utils/httpResponseCode'
import { fetchThunk } from '../../common/redux/thunk'
import SignUpFormV2 from '../components/SignUpFormV2'
import { setUserInfo } from '../redux/authReducer'
import { setLocale } from '../../intl/redux/intlReducer'

const SignUpPage = () => {
    const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>()
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("");
    const [locations, setLocations] = useState([])
    const [states, setStates] = useState([])
    const [idRegion, setIdRegion] = useState("")

    const getLocation = useCallback(async (idRegion?: string) => {
        setLoading(true)

        const json = await dispatch(
            fetchThunk(idRegion ? `${API_PATHS.getLocation}?pid=${idRegion}` : API_PATHS.getLocation, 'get')
        )

        setLoading(false)

        if (json?.code === RESPONSE_STATUS_SUCCESS) {

            console.log(json.data);

            idRegion ? setStates(json.data) : setLocations(json.data)
            return;
        }
    }, [dispatch])

    useEffect(() => {
        getLocation(idRegion)
    }, [dispatch, getLocation, idRegion])

    

    const onSignUp = useCallback(
        async (values: ISignUpParams) => {
            setErrorMessage("");
            setLoading(true);

            const json = await dispatch(
                fetchThunk(API_PATHS.signUp, 'post', values)
            )

            setLoading(false)

            if (json?.code === RESPONSE_STATUS_SUCCESS) {
                dispatch(setUserInfo(json.data))

                Cookies.set(ACCESS_TOKEN_KEY, json.data.token)
                dispatch(replace(ROUTES.home))
                toast.success("Chúc mừng bạn đăng kí thành công")
                return;
            }
            setErrorMessage(getErrorMessageResponse(json))
        }
        , [dispatch])

    const onChangeRegion = (idRegion: string) => {
        setIdRegion(idRegion)
    }
    return (
        <div
            className='container'
            style={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
            }}
        >
            <img src={logo} alt="" style={{ maxWidth: "250px", margin: '32px' }} />

            {/* <SignUpForm
                onSignUp={onSignUp}
                loading={loading}
                errorMessage={errorMessage}
                locations={locations}
                onChangeRegion={onChangeRegion}
                states={states}
            /> */}
            <SignUpFormV2
                onSignUp={onSignUp}
                loading={loading}
                errorMessage={errorMessage}
                locations={locations}
                onChangeRegion={onChangeRegion}
                states={states}
            />
        </div>
    )
}

export default SignUpPage