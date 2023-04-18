import { replace } from 'connected-react-router';
import Cookies from 'js-cookie';
import { useCallback, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { API_PATHS } from '../../../configs/api';
import { ROUTES } from '../../../configs/routes';
import logo from '../../../logo-420-x-108.png';
import { ILoginParams } from '../../../models/auth';
import { AppState } from '../../../redux/reducer';
import { getErrorMessageResponse } from '../../../utils';
import { ACCESS_TOKEN_KEY } from '../../../utils/constants';
import { RESPONSE_STATUS_SUCCESS } from '../../../utils/httpResponseCode';
import { fetchThunk } from '../../common/redux/thunk';
import LoginForm from '../components/LoginForm';
import { setUserInfo } from '../redux/authReducer';
const LoginPage = () => {
    const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>()
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const onLogin = useCallback(
        async (values: ILoginParams) => {
            setErrorMessage("")
            setLoading(true)

            const json = await dispatch(
                fetchThunk(API_PATHS.signIn, 'post', { email: values.email, password: values.password })
            )

            setLoading(false)

            if (json?.code === RESPONSE_STATUS_SUCCESS) {
                dispatch(setUserInfo(json.data)); //dispatch action set user data

                Cookies.set(ACCESS_TOKEN_KEY, json.data.token, { expires: values.rememberMe ? 7 : undefined })

                dispatch(replace(ROUTES.home));
                toast.success("Đăng nhập thành công")
                return;
            }

            setErrorMessage(getErrorMessageResponse(json))
        }, [dispatch])
    return (
        <div
            className='container'
            style={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
            }
            }
        >
            <img src={logo} alt="" style={{ maxWidth: "250px", margin: '32px' }} />
            <LoginForm onLogin={onLogin} loading={loading} errorMessage={errorMessage} />
            {/* <LoginFormV2 onLogin={onLogin} loading={loading} errorMessage={errorMessage} /> */}
            <a href="/sign-up">
                <FormattedMessage id='register' />
            </a>
        </div >
    )
}

export default LoginPage