import React, { useCallback, useState } from 'react'
import { IGenderParams, ILocationParams, ISignUpParams } from '../../../models/auth'
import { FormattedMessage } from 'react-intl'
import { GENDER } from '../../intl/constants'
import { validSignUp, validateSignUp } from '../utils'

interface Props {
    onSignUp(values: ISignUpParams): void,
    loading: boolean,
    errorMessage: string,
    locations: Array<ILocationParams>,
    states: Array<ILocationParams>,
    onChangeRegion(idRegion: string): void
}

const SignUpForm = (props: Props) => {
    const { onSignUp, loading, errorMessage, locations, states, onChangeRegion } = props

    const [formValues, setFormValues] = useState<ISignUpParams>({
        email: "",
        password: "",
        repeatPassword: "",
        name: "",
        gender: "",
        region: "",
        state: "",
    })


    const [validate, setValidate] = useState<ISignUpParams>()

    const onSubmit = useCallback(() => {
        const validate = validateSignUp(formValues);
        setValidate(validate);
        if (!validSignUp(validate)) {
            return;
        }
        onSignUp(formValues)
    }, [formValues, onSignUp])

    const renderGender = () => {
        const arrGender: JSX.Element[] = [
            <option disabled selected value={''} key={''}>
                {" "}
                -- select an option -- {' '}
            </option>
        ]
        // eslint-disable-next-line array-callback-return
        GENDER.map((g: IGenderParams, index: number) => {
            arrGender.push(
                <option value={g.value} key={index}>
                    {g.label}
                </option>
            )
        })
        return arrGender;
    }
    const renderRegion = () => {
        const arrRegion: JSX.Element[] = [
            <option disabled selected value={''} key={''}>
                {" "}
                -- select an option -- {' '}
            </option>
        ]
        // eslint-disable-next-line array-callback-return
        locations.map((location: ILocationParams, index: number) => {
            arrRegion.push(
                <option value={location.id} key={index}>
                    {location.name}
                </option>
            )
        })
        return arrRegion;
    }

    const changeRegion = () => (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChangeRegion(e.target.value);
        setFormValues({ ...formValues, region: e.target.value })
    }
    const renderState = () => {
        const arrState: JSX.Element[] = [
            <option disabled selected value={''} key={''}>
                {" "}
                -- select an option -- {' '}
            </option>
        ]
        // eslint-disable-next-line array-callback-return
        states.map((state: ILocationParams, index: number) => {
            arrState.push(
                <option value={state.id} key={index}>
                    {state.name}
                </option>
            )
        })
        return arrState;
    }
    return (
        <form
            style={{ maxWidth: '560px', width: '100%' }}
            noValidate
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit()
            }}
            className="row g-3 needs-validation"
        >

            {!!errorMessage && (
                <div className="alert alert-danger" role="alert" style={{ width: '100%' }}>
                    {errorMessage}
                </div>
            )}
            <div className='col-md-12'>
                <label htmlFor='inputEmail' className='form-label'>
                    <FormattedMessage id="email" />
                </label>
                <input
                    type='text'
                    className='form-control'
                    id="inputEmail"
                    value={formValues.email}
                    onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
                />

                {!!validate?.email && (
                    <small className="text-danger">
                        <FormattedMessage id={validate?.email} />
                    </small>
                )}
            </div>

            <div className='col-md-12'>
                <label className='form-label' htmlFor="inputPassword">
                    <FormattedMessage id='password' />
                </label>
                <input
                    type='password'
                    className='form-control'
                    id="inputPassword"
                    value={formValues.password}
                    onChange={(e) => setFormValues({ ...formValues, password: e.target.value })}
                />

                {!!validate?.password && (
                    <small className="text-danger">
                        <FormattedMessage id={validate?.password} />
                    </small>
                )}
            </div>

            <div className='col-md-12'>
                <label className='form-label' htmlFor="inputRepeatPassword">
                    <FormattedMessage id='repeatPassword' />
                </label>
                <input
                    type='password'
                    className='form-control'
                    id="inputRepeatPassword"
                    value={formValues.repeatPassword}
                    onChange={(e) => setFormValues({ ...formValues, repeatPassword: e.target.value })}
                />

                {!!validate?.repeatPassword && (
                    <small className="text-danger">
                        <FormattedMessage id={validate?.repeatPassword} />
                    </small>
                )}
            </div>
            <div className='col-md-12'>
                <label className='form-label' htmlFor="inputName">
                    <FormattedMessage id='name' />
                </label>
                <input
                    type='text'
                    className='form-control'
                    id="inputName"
                    value={formValues.name}
                    onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
                />

                {!!validate?.name && (
                    <small className="text-danger">
                        <FormattedMessage id={validate?.name} />
                    </small>
                )}
            </div>

            <div className='col-md-12'>
                <label className='form-label' htmlFor="selectGender">
                    <FormattedMessage id='gender' />
                </label>
                <select
                    className='form-control'
                    id="selectGender"
                    value={formValues.gender}
                    onChange={(e) => setFormValues({ ...formValues, gender: e.target.value })}
                >
                    {renderGender()}
                </select>

                {!!validate?.gender && (
                    <small className="text-danger">
                        <FormattedMessage id={validate?.gender} />
                    </small>
                )}
            </div>

            <div className='col-md-12'>
                <label className='form-label' htmlFor="selectRegion">
                    <FormattedMessage id='region' />
                </label>
                <select
                    className='form-control'
                    id="selectRegion"
                    value={formValues.region}
                    onChange={changeRegion()}
                >
                    {renderRegion()}
                </select>

                {!!validate?.region && (
                    <small className="text-danger">
                        <FormattedMessage id={validate?.region} />
                    </small>
                )}
            </div>

            {formValues.region ? <div className='col-md-12'>
                <label className='form-label' htmlFor="selectState">
                    <FormattedMessage id='state' />
                </label>
                <select
                    className='form-control'
                    id="selectState"
                    value={formValues.state}
                    onChange={(e) => setFormValues({ ...formValues, state: e.target.value })}
                >
                    {renderState()}
                </select>

                {!!validate?.state && (
                    <small className="text-danger">
                        <FormattedMessage id={validate?.state} />
                    </small>
                )}
            </div> : null}

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

export default SignUpForm