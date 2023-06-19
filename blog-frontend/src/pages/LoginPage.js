import AuthTemplate from '../components/auth/AuthTemplate.js';
import AuthForm from '../components/auth/AuthForm.js';

const LoginPage = () => {
  return (
    <AuthTemplate>
      <AuthForm type="login" />
    </AuthTemplate>
  );
};

export default LoginPage;
