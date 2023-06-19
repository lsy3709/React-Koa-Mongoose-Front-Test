import AuthTemplate from '../components/auth/AuthTemplate.js';
import AuthForm from '../components/auth/AuthForm.js';

const RegisterPage = () => {
  return (
    <AuthTemplate>
      <AuthForm type="register" />
    </AuthTemplate>
  );
};

export default RegisterPage;
