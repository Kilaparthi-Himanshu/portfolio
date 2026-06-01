import SmoothScroll from "./components/misc/SmoothScroll";
import About from "./sections/About";
import Projects from "./sections/Projects";
import NoteToGoSection from "./sections/NoteToGoSection";
import Opening from "./sections/Opening";
import ProjectsContents from "./sections/ProjectsContents";
import ProjectsWrapper from "./sections/ProjectsWrapper";
import Skills from "./sections/Skills";

export default function Home() {
  return (
    <>
      <SmoothScroll>
        <div className="bg-stone-800">
          <Opening />

          <About />

          <Skills />

          {/* <ProjectsWrapper> */}
            <ProjectsContents />

            <Projects />
          {/* </ProjectsWrapper> */}

          <section
            className="relative min-h-screen w-full overflow-hidden text-white"
          ></section>
        </div>
      </SmoothScroll>
    </>
  );
}