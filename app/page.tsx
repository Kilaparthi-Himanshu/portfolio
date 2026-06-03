import SmoothScroll from "./components/misc/SmoothScroll";
import About from "./sections/About";
// import Projects from "./sections/Projects";
// import NoteToGoSection from "./sections/NoteToGoSection";
import Opening from "./sections/Opening";
import ProjectsContents from "./sections/ProjectsContents";
// import ProjectsWrapper from "./components/archive/ProjectsWrapper";
import Skills from "./sections/Skills";
import { ProjectsModalRenderer } from "./sections/ProjectsModal";
import Contact from "./sections/Contact";

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

            {/* <Projects /> */}
          {/* </ProjectsWrapper> */}

          {/* <section
            className="relative min-h-screen w-full overflow-hidden text-white"
          ></section> */}

          <ProjectsModalRenderer />

          <Contact />
        </div>
      </SmoothScroll>
    </>
  );
}