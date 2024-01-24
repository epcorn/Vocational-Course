import { Container } from './Container'

const TrainingVideos = () => {
  return (
    <div className="py-1">
      <Container>
        <div className="mx-auto">
          <h2
            id="speakers-title"
            className="mb-5 font-display text-4xl font-medium tracking-tighter text-blue-600 sm:text-5xl"
          >
            Training Videos
          </h2>
          <div className="grid grid-cols-2">
            <div>
              <h4 className="mb-3 text-center font-display text-2xl tracking-tight text-blue-900">
                On-Site Classroom Training
              </h4>
              <div className="flex justify-center">
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/95e9hfwHdJI"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
            <div>
              <h4 className="mb-3 text-center font-display text-2xl tracking-tight text-blue-900">
                On-Site Equipment Training
              </h4>
              <div className="flex justify-center">
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/Z9nPna_ko0M"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
export default TrainingVideos
