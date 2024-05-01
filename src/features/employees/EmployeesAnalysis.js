import EmpAnalysisContainer from './EmpAnalysisContainer';
import DashTableContent from '../auth/dashboard/DashTableContent';
import useTitle from '../../hooks/useTitle';

// Employees Analysis
const EmployeesAnalysis = () => {

    useTitle('KGTech: Employees Analysis');

    const content = <EmpAnalysisContainer />;
  return (
    <>
      <DashTableContent title="Employees Analysis" subTitle={'Analysis'} content={content} />
    </>
  )
}

export default EmployeesAnalysis
