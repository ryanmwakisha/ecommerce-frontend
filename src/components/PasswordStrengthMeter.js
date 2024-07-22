import React from 'react';

const PasswordStrengthMeter = ({ password }) => {
  const calculateStrength = (password) => {
    let strength = 0;
    if (password.length > 7) strength++;
    if (password.match(/[a-z]+/)) strength++;
    if (password.match(/[A-Z]+/)) strength++;
    if (password.match(/[0-9]+/)) strength++;
    if (password.match(/[$@#&!]+/)) strength++;
    return strength;
  };

  const strength = calculateStrength(password);

  return (
    <div className="password-strength-meter">
      <div className={`strength-${strength}`}></div>
      <label>
        {strength === 0 && 'Very Weak'}
        {strength === 1 && 'Weak'}
        {strength === 2 && 'Fair'}
        {strength === 3 && 'Good'}
        {strength === 4 && 'Strong'}
        {strength === 5 && 'Very Strong'}
      </label>
    </div>
  );
};

export default PasswordStrengthMeter;
