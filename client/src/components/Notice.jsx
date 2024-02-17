import Marquee from "react-fast-marquee"

export default function Notice() {
  return (
    <div className="max-w-6xl mx-auto bold text-2xl ">
      <Marquee pauseOnHover direction="left" speed={50} >
        <span className="blinking-text">Addmision Open!</span>
      </Marquee>
    </div>
  )
}
