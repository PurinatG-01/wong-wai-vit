import PageLayout from '../components/PageLayout'
import GridCard from '../components/GridCard';
import Firebase from '../components/Firebase'

const db = Firebase.firestore()


export default function Home({xproducts}) {
  return (
    <PageLayout>
        <GridCard data={xproducts} />
    </PageLayout>
  )
}

export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  let xproducts = []
  await db.collection("products").get().then((query) => {
      query.forEach((doc) => {
          xproducts.push(doc.data())
      })
  })

  // By returning { props: posts }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      xproducts,
    },
    revalidate: 1
  }
}