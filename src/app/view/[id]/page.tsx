// src/app/view/[id]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'

export default async function ViewCertificatePage({
  params,
}: {
  // Tell TS that params is actually a Promise
  params: Promise<{ id: string }>
}) {
  // ✅ Now `await params` is valid
  const { id } = await params

  const res = await fetch(`https://gateway.pinata.cloud/ipfs/${id}`, {
    cache: 'no-store',
  })

  const contentType = res.headers.get('content-type') ?? ''
  if (!res.ok || contentType.includes('application/json')) {
    return notFound()
  }

  return (
    <section className="min-h-screen bg-[#121212] text-white px-4 py-10 flex justify-center items-center">
      <div className="relative w-full max-w-3xl text-center space-y-6 bg-[#1a1a1a] p-6 rounded-xl shadow-lg border border-white/10">
        <Link
          href="/view"
          className="absolute top-4 right-4 text-white bg-white/10 hover:bg-white/20 rounded-full p-1.5 transition"
          title="Close and go back"
        >
          <span className="text-2xl leading-none">×</span>
        </Link>

        <h1 className="text-3xl sm:text-4xl font-bold">📄 Organic Certificate</h1>

        <div className="w-full overflow-hidden rounded-xl border border-white/10 bg-white/5">
          <img
            src={`https://gateway.pinata.cloud/ipfs/${id}`}
            alt="Certificate"
            className="w-full max-h-[600px] object-contain"
          />
        </div>

        <p className="text-gray-400 break-all text-sm">
          <strong className="text-white">IPFS Hash:</strong> {id}
        </p>

        <a
          href={`https://gateway.pinata.cloud/ipfs/${id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-green-400 underline hover:text-green-300 mt-2"
        >
          View on IPFS ↗
        </a>
      </div>
    </section>
  )
}
