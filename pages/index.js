import PageLayout from '../components/PageLayout'
import Typography from '@material-ui/core/Typography'
import Card from "../components/Card";
import GridCard from '../components/GridCard';

export default function Home() {
  return (
    <PageLayout>
        <Typography color="primary" variant="h6">Landing page</Typography>
        <GridCard />
    </PageLayout>
  )
}
