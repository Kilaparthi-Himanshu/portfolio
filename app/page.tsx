import SmoothScroll from "./components/misc/SmoothScroll";
import About from "./sections/About";
import NoteToGo from "./sections/NoteToGo";
import NoteToGoSection from "./sections/NoteToGoSection";
import Opening from "./sections/Opening";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";

export default function Home() {
  return (
    <>
      <SmoothScroll>
        <div className="bg-stone-800">
          <Opening />

          <About />

          <Skills />

          <Projects />

          {/* <NoteToGoSection /> */}

          {/* <NoteToGo /> */}
        </div>
      </SmoothScroll>
    </>
  );
}