import { NextPage } from 'next';
import { Home, HomeProps } from '@components/templates/Home';

const HomePage: NextPage<HomeProps> = ({ pageContext }) => {
  return <Home pageContext={pageContext} />;
};

export default HomePage;
