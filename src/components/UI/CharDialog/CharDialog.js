import React from 'react';
import Backdrop from '../../_MsLib/UI/Backdrop/Backdrop';
import Dialog from '../../_MsLib/UI/Dialog/Dialog';
import Logo from '../../_MsLib/UI/Logo/Logo';

const CharDialog = (props) => {
    return (
        <Backdrop
            show={props.show}
            click={props.click}
        >
            <Dialog
                click={props.click}
                title={props.message}
                styles={`u-text-center u-color-5-text`}
                buttonText={props.buttonText}
            >
                <div className="Dialog-logo">
                    <Logo />
                </div>
            </Dialog>
        </Backdrop>
    );
};

export default CharDialog;