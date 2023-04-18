import { FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import TextField from '@mui/material/TextField'
import { Controller, useForm } from 'react-hook-form'
import { FormattedMessage } from 'react-intl'
import { IGenderParams, ILocationParams, ISignUpParams } from '../../../models/auth'
import { validEmailRegex } from '../../../utils'
import { GENDER } from '../../intl/constants'
import SwitchLanguage from './SwitchLanguage'

interface Props {
    onSignUp(values: ISignUpParams): void,
    loading: boolean,
    errorMessage: string,
    locations: Array<ILocationParams>,
    states: Array<ILocationParams>,
    onChangeRegion(idRegion: string): void
}

const SignUpFormV2 = (props: Props) => {
    const { onSignUp, loading, errorMessage, locations, states, onChangeRegion } = props

    const { control, handleSubmit, formState: { errors }, watch, setValue } = useForm<ISignUpParams>({
        defaultValues: {
            email: "",
            password: "",
            repeatPassword: "",
            name: "",
            gender: "",
            region: "",
            state: "",
        }
    })


    const changeRegion = (e: SelectChangeEvent) => {
        onChangeRegion(e.target.value)

        setValue("region", e.target.value as string)
    }

    const region = watch("region")
    const password = watch("password")

    const onSubmit = (data: ISignUpParams) => {
        onSignUp(data);
    }

    const renderGender = () => {
        const arrGender: JSX.Element[] = []
        // eslint-disable-next-line array-callback-return
        GENDER.map((g: IGenderParams, index: number) => {
            arrGender.push(
                <MenuItem value={g.value} key={index}>
                    {g.label}
                </MenuItem>
            )
        })
        return arrGender;
    }

    const renderRegion = () => {
        const arrRegion: JSX.Element[] = []
        // eslint-disable-next-line array-callback-return
        locations.map((location: ILocationParams, index: number) => {
            arrRegion.push(
                <MenuItem value={location.id} key={index}>
                    {location.name}
                </MenuItem>
            )
        })
        return arrRegion;
    }


    const renderState = () => {
        const arrState: JSX.Element[] = []
        // eslint-disable-next-line array-callback-return
        states.map((state: ILocationParams, index: number) => {
            arrState.push(
                <MenuItem value={state.id} key={index}>
                    {state.name}
                </MenuItem>
            )
        })
        return arrState;
    }
    return (
        <form
            style={{ maxWidth: '560px', width: '100%' }}
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            className="row g-3 needs-validation"
        >
            {!!errorMessage && (
                <div className="alert alert-danger" role="alert" style={{ width: '100%' }}>
                    {errorMessage}
                </div>
            )}

            <SwitchLanguage />
            <Controller
                name='email'
                control={control}
                rules={{ required: true, pattern: validEmailRegex }}
                render={({ field }) => (
                    <TextField
                        {...field}
                        id='inputEmail'
                        label={<FormattedMessage id="email" />}
                        variant='outlined'
                        fullWidth
                        margin='normal'
                        error={Boolean(errors.email)}
                        helperText={errors.email ? (errors.email.type === "required" ? <FormattedMessage id="emailRequire" /> : <FormattedMessage id="emailInvalid" />) : ""}
                    />
                )}
            />

            <Controller
                name="password"
                control={control}
                rules={{ required: true, minLength: 4 }}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label={<FormattedMessage id="password" />}
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        error={Boolean(errors.password)}
                        helperText={errors.password ? (errors.password.type === "required" ? <FormattedMessage id="passwordRequire" /> : <FormattedMessage id="minPasswordInvalid" />) : ""}
                    />
                )}
            />
            <Controller
                name="repeatPassword"
                control={control}
                rules={{
                    required: true,
                    validate: (value) => value === password,
                }}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label={<FormattedMessage id="repeatPassword" />}
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin='normal'
                        error={Boolean(errors.repeatPassword)}
                        helperText={errors.repeatPassword ? <FormattedMessage id="matchPasswordInvalid" /> : ""}
                    />
                )}
            />

            <Controller
                name="name"
                control={control}
                rules={{
                    required: true,
                }}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label={<FormattedMessage id="name" />}
                        type="text"
                        variant="outlined"
                        fullWidth
                        margin='normal'
                        error={Boolean(errors.name)}
                        helperText={errors.name ? <FormattedMessage id="nameRequire" /> : ""}
                    />
                )}
            />

            <Controller
                name="gender"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                    <FormControl margin='normal' error={Boolean(errors.gender)}>
                        <InputLabel id="inputGender">
                            <FormattedMessage id="gender" />
                        </InputLabel>
                        <Select {...field} labelId='inputGender' label={<FormattedMessage id="gender" />}>
                            {renderGender()}
                        </Select>
                        {errors.gender &&
                            <FormHelperText>
                                <FormattedMessage id="genderRequire" />
                            </FormHelperText>}
                    </FormControl>
                )}
            />

            <Controller
                name="region"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                    <FormControl margin='normal' error={Boolean(errors.region)}>
                        <InputLabel id="inputRegion">
                            <FormattedMessage id="region" />
                        </InputLabel>
                        <Select
                            {...field}
                            labelId='inputGender'
                            label={<FormattedMessage id="gender" />}
                            value={field.value}
                            onChange={changeRegion}
                        >
                            {renderRegion()}
                        </Select>
                        {errors.region &&
                            <FormHelperText>
                                <FormattedMessage id="regionRequire" />
                            </FormHelperText>}
                    </FormControl>
                )}
            />

            {region ? <Controller
                name="state"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                    <FormControl margin='normal' error={Boolean(errors.state)}>
                        <InputLabel id="inputState">
                            <FormattedMessage id="state" />
                        </InputLabel>
                        <Select {...field} labelId='inputState' label={<FormattedMessage id="state" />}>
                            {renderState()}
                        </Select>
                        {errors.state &&
                            <FormHelperText>
                                <FormattedMessage id="stateRequire" />
                            </FormHelperText>}
                    </FormControl>
                )}
            /> : ""}

            <div className="row justify-content-md-center" style={{ margin: "16px 0" }}>
                <div className="col-md-auto">
                    <button
                        className='btn btn-primary'
                        type='submit'
                        style={{ minWidth: "160px", display: "flex", alignItems: "center", justifyContent: "center" }}
                        disabled={loading}
                    >
                        {loading && <div className='spinner-border spinner-border-sm text-light mr-2' role='status'></div>}
                        <FormattedMessage id='register' />
                    </button>
                </div>
            </div>
        </form>
    )
}

export default SignUpFormV2