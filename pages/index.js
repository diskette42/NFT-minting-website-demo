import Image from 'next/image'

export default function Home() {
  return (
    <div>
      <img src="/img/home-bg.png"  className="w-full page-wrap object-cover" width={100} height={100} />
      <style jsx>
    {`
      .page-wrap {
        height: calc(100vh - 60px);
      }
    `}
    </style>
    </div>
  )
}
