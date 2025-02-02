import React from 'react';
import styles from './Button.module.scss';

interface IButtonProps {
  text: string;
  callback?: () => void;
  disabled?: boolean;
  submit?: boolean;
}

interface IButtonState {
  text: string;
  callback?: () => void;
  disabled?: boolean;
  submit?: boolean;
}

class Button extends React.Component<IButtonProps, IButtonState> {
  declare state: IButtonState;

  constructor(props: IButtonProps) {
    super(props);

    this.state = {
      text: props.text,
      callback: props.callback,
      disabled: props.disabled ?? false,
      submit: props.submit ?? false,
    };
  }

  render() {
    return (
      <button
        className={styles.button}
        type={this.state.submit ? 'submit' : 'button'}
        onClick={this.state.callback}
        disabled={this.state.disabled}
      >
        {this.state.text}
      </button>
    );
  }
}

export default Button;
