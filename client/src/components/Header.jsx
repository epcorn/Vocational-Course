import { Link } from "react-router-dom";
import { Button } from "./Button";
import { Container } from "./Container";
import { Logo } from "./Logo";

export function Header() {
  return (
    <header className="relative z-50 lg:pt-4">
      <Container className="flex flex-wrap items-center justify-center sm:justify-between lg:flex-nowrap">
        <div className="mt-10 lg:mt-0 lg:grow lg:basis-0">
          <Link to="/">
            <Logo className="h-12 w-auto text-slate-900" />
          </Link>
        </div>
        <div className="order-first -mx-4 flex flex-auto basis-full overflow-x-auto whitespace-nowrap border-b border-blue-600/10 py-4 font-mono text-sm text-blue-600 sm:-mx-6 lg:order-none lg:mx-0 lg:basis-auto lg:border-0 lg:py-0">
          <div className="mx-auto flex items-center gap-4 px-4 font-semibold md:text-xl">
            <Button href="/admission">Admission Form</Button>
          </div>
        </div>
        <div className="hidden sm:mt-10 sm:flex lg:mt-0 lg:grow lg:basis-0 lg:justify-end">
          <Button
            className="bg-green-600 hover:bg-green-500"
            href="https://res.cloudinary.com/epcorn/image/upload/v1701693934/signature/Final_Prospectus_suqeg2.pdf"
          >
            Prospectus
          </Button>
        </div>
      </Container>
    </header>
  );
}
