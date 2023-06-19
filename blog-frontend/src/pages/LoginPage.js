import AuthTemplate from '../components/auth/AuthTemplate.js';
import LoginForm from '../containers/auth/LoginForm.js';

const LoginPage = () => {
  return (
    <AuthTemplate>
      <LoginForm />
    </AuthTemplate>
  );
};

export default LoginPage;
