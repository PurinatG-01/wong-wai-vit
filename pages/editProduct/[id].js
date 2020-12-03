import PageLayout from '../../components/PageLayout'
import EditForm from '../../components/EditForm'
import Firebase from '../../components/Firebase'
import { useRouter } from 'next/router'

const db = Firebase.firestore()

export default function editProduct() {
    return (
        <PageLayout>
            <EditForm />
        </PageLayout>

    )
}

// export async function getStaticPaths() {
//   const paths = []
//   await db.collection("products").get().then((query) => {
//     query.forEach((doc) => {
//       paths.push({params: {id: doc.data().id.toString()}},)
//     })
//   })
//   //console.log(paths)
//   return {
//     paths,
//     fallback: false
//   }
// }

// export async function getStaticProps({ params }) {
//   // Call an external API endpoint to get posts.
//   // You can use any data fetching library
//   let productData = []
//   await db.collection("products").doc(params.id).get().then((doc) =>
//     productData.push(doc.data())
//   )
//   // By returning { props: posts }, the Blog component
//   // will receive `posts` as a prop at build time
//   return {
//     props: {
//       productData,
//     },
//     revalidate: 1
//   }
// }