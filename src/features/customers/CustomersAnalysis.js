import CustAnalysisContainer from './CustAnalysisContainer';
import DashTableContent from '../auth/dashboard/DashTableContent';
import useTitle from '../../hooks/useTitle';

// Customer Analysis
const CustomersAnalysis = () => {

  useTitle('KGTech: Customers Analysis');

  const content = <CustAnalysisContainer />;

  return (
    <>
      <DashTableContent title="Customers Analysis" subTitle={'Analysis'} content={content} />
    </>
  )
}

export default CustomersAnalysis
