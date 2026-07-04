import PostsTable from '../../components/posts-table'

export const metadata = {
  title: 'Dashboard',
}

export default function Page() {
  return (
    <main className="min-h-screen p-6 bg-gray-50">
      <div className="mx-auto w-full max-w-4xl">
        <PostsTable />
      </div>
    </main>
  )
}
