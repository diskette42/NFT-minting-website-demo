import First from '../components/HomePage/First'
import Second from '../components/HomePage/Second'
import Third from '../components/HomePage/Third'
export default function Home() {
  return (
    <div className="home-img-wrap flex flex-col">
      <First />
      <Second />
      <Third />
      <style jsx>
        {`
          .home-img-wrap {
            height: auto;
            width: calc(100% - 5rem);
            float: right;
          }
        `}
      </style>
    </div>
  )
}
