import PageLayout from '../components/PageLayout'
import Typography from '@material-ui/core/Typography'
import Card from "../components/Card";
import GridCard from '../components/GridCard';
import SelectCondition from '../components/SelectCondition'

export default function Home() {
  return (
    <PageLayout>
        <SelectCondition/>
        <GridCard />
    </PageLayout>
  )
}
