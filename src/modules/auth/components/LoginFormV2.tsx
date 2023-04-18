import { useState } from 'react';
import { useForm } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import { ILoginParams, ILoginValidation } from "../../../models/auth";
import { validLogin, validateLogin } from "../utils";


interface Props {
    onLogin(values: ILoginParams): void;
    loading: boolean;
    errorMessage: string
}

const LoginFormV2 = (props: Props) => {
    const { register, handleSubmit } = useForm<ILoginParams>();
    const [validate, setValidate] = useState<ILoginValidation>();
    const { onLogin, loading, errorMessage } = props;

    const onSubmit = (data: ILoginParams) => {
        const validate = validateLogin(data)

        setValidate(validate)

        if (!validLogin(validate)) {
            return
        }
        onLogin(data)
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ maxWidth: '560px', width: '100%' }}
            className="row g-3 needs-validation"
        >
            {!!errorMessage && (
                <div className="alert alert-danger" role="alert" style={{ width: '100%' }}>
                    {errorMessage}
                </div>
            )}
            <div className="col-md-12">
                <label htmlFor='inputEmail' className='form-label'>Email</label>
                <input
                    type='text'
                    className='form-control'
                    {...register("email")}
                />
                {!!validate?.email && (
                    <small className="text-danger">
                        <FormattedMessage id={validate?.email} />
                    </small>
                )}
            </div>
            <div className="col-md-12">
                <label htmlFor='inputPassword' className='form-label'>Password</label>
                <input
                    type='password'
                    className='form-control'
                    {...register("password")}
                />
                {!!validate?.password && (
                    <small className="text-danger">
                        <FormattedMessage id={validate?.password} />
                    </small>
                )}
            </div>
            <div className='col-12'>
                <div className="form-check">
                    <input type="checkbox" className='form-check-input' id='invalidCheck' value="" />
                    <label htmlFor="invalidCheck" className='form-check-label'>
                        <FormattedMessage id='rememberMe' />
                    </label>
                </div>
            </div>

            <div className="row justify-content-md-center" style={{ margin: "16px 0" }}>
                <div className="col-md-auto">
                    <button
                        className="btn btn-primary"
                        style={{ minWidth: "160px", display: "flex", alignItems: "center", justifyContent: "center" }}
                        disabled={loading}
                        type="submit"

                    >
                        {loading && <div className='spinner-border spinner-border-sm text-light mr-2' role='status'></div>}
                        <FormattedMessage id='login' />
                    </button>
                </div>
            </div>
        </form>
    );
};

export default LoginFormV2

