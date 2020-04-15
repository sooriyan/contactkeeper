import React from 'react'
import { Spinner } from 'reactstrap';
const SpinnerComponent = () => {
    return (
        <div className="spinner_margin text-center">
            <Spinner style={{ width: '3rem', height: '3rem' }} />{' '}
        </div>
    )
}

export default SpinnerComponent
