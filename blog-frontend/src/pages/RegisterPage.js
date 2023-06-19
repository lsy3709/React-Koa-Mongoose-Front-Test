import AuthTemplate from '../components/auth/AuthTemplate.js';
import RegisterForm from '../containers/auth/RegisterForm.js';

const RegisterPage = () => {
  return (
    <AuthTemplate>
      <RegisterForm />
    </AuthTemplate>
  );
};

export default RegisterPage;
