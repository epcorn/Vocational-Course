import { Container } from './Container'

import logoStaticKit from '../images/logo1.png'
import logoTransistor from '../images/logo2.jpeg'
import logoTuple from '../images/logo25.jpeg'

const sponsors = [
  { name: 'StaticKit', logo: logoStaticKit },
  { name: 'EPPL', logo: logoTransistor },
  { name: 'GHF', logo: logoTuple },
]

export function Sponsors() {
  return (
    <section id="sponsors" aria-label="Sponsors" className="pb-5 pt-10">
      <Container>
        <h2 className="mx-auto max-w-2xl text-center font-display text-4xl font-medium tracking-tighter text-blue-600 sm:text-5xl">
          Partners
        </h2>
        <div className="mx-auto mt-5 grid max-w-max grid-cols-3 place-content-center gap-y-12 gap-x-16 lg:gap-x-32">
          {sponsors.map((sponsor) => (
            <div
              key={sponsor.name}
              className="flex w-20 items-center justify-center md:w-40"
            >
              <img src={sponsor.logo} alt={sponsor.name} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
