import styles from './PasswordStrength.module.scss';

const passwordStrengthRules = [
  (pass: string): number => {
    return pass.match(/^(?=.*[0-9])/) ? 1 : 0;
  },
  (pass: string): number => {
    return pass.match(/^(?=.*[A-ZА-Я])/) ? 1 : 0;
  },
  (pass: string): number => {
    return pass.match(/^(?=.*[a-zа-я])/) ? 1 : 0;
  },
  (pass: string): number => {
    return pass.match(/^(?=.*[!@#$%^&*(),.?":{}|<>+=])/) ? 1 : 0;
  },
];

const PasswordStrength = ({ password }: { password: string }) => {
  const strength = passwordStrengthRules.reduce(
    (s, r) => s + r(password ?? ''),
    0
  );

  console.log(password);
  console.log(strength);

  return (
    <progress
      max={passwordStrengthRules.length}
      className={styles.progress}
      value={strength}
    />
  );
};

export default PasswordStrength;
