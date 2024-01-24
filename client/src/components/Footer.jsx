import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="py-2">
      <Container className="flex flex-col items-center justify-center md:flex-row">
        <p className="mr-2 mt-6 text-xs md:mt-0  md:text-base">
          Copyright &copy; {new Date().getFullYear()} Serampore College & S-Mark
        </p>
      </Container>
    </footer>
  );
}
