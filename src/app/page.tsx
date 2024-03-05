import Link from 'next/link'

export default function Home() {
    return (
        <main className="flex flex-col items-center justify-between p-24">
            <h1 className="p-12">Project list landing page</h1>

            <h5 className="p-6">Projects list</h5>
            <ul>
                <li><Link href="/speech">Text to Speech</Link></li>
            </ul>
        </main>
    )
}
