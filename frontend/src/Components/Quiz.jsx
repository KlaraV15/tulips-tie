import { Link } from "react-router-dom"

export default function Quiz() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-bold">Choose Quiz Mode</h1>
      <div className="flex gap-4">
        <Link to="/easy">
          <button className="px-6 py-3 bg-green-500 text-white rounded">Easy</button>
        </Link>
        <Link to="/medium">
          <button className="px-6 py-3 bg-yellow-500 text-white rounded">Medium</button>
        </Link>
        <Link to="/hard">
          <button className="px-6 py-3 bg-red-500 text-white rounded">Hard</button>
        </Link>
      </div>
    </div>
  )
}
