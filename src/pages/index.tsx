import { Container } from "src/uikits";

export default function Home() {
  return (
    <Container>
      <div className="prose">
        <h1>Welcome to home page!</h1>
        <h2>Next.js + TypeScript + Tailwind CSS + daisyUI</h2>
      </div>
      <button className="btn btn-primary">Hello daisyUI</button>
    </Container>
  );
}
