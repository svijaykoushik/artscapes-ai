
import React, { useEffect } from 'react';
import { APP_TITLE } from '../constants';

const AboutPage: React.FC = () => {
  useEffect(() => {
    document.title = `About - ${APP_TITLE}`;
  }, []);

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="max-w-3xl mx-auto bg-secondary-lt dark:bg-secondary p-6 sm:p-8 md:p-10 border border-border-light dark:border-border-dark"> 
        <h1 className="text-4xl font-bold text-accent dark:text-accent-lt mb-6 text-center tracking-tight">About {APP_TITLE}</h1>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-text-lt dark:text-light-text mb-3 border-b-2 border-border-light dark:border-border-dark pb-2">Purpose of the Site</h2>
          <p className="text-muted-text-lt dark:text-muted-text leading-relaxed">
            {APP_TITLE} is a curated showcase of stunning, AI-generated wallpapers designed to bring unique digital art to your screens. 
            This project serves as a personal exploration into modern web development practices, focusing on React, TypeScript, and Tailwind CSS, 
            while also celebrating the creative potential of artificial intelligence in art generation.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-text-lt dark:text-light-text mb-3 border-b-2 border-border-light dark:border-border-dark pb-2">How Wallpapers Are Generated</h2>
          <p className="text-muted-text-lt dark:text-muted-text leading-relaxed mb-2">
            The wallpapers featured on this site are created using a variety of cutting-edge AI image generation models and tools. This typically involves:
          </p>
          <ul className="list-disc list-inside text-muted-text-lt dark:text-muted-text space-y-1 pl-4">
            <li>Utilizing generative adversarial networks (GANs) or diffusion models (e.g., Stable Diffusion, Midjourney).</li>
            <li>Crafting detailed text prompts to guide the AI in generating specific themes, styles, and moods.</li>
            <li>Iterative refinement and upscaling processes to achieve high-resolution, visually appealing results.</li>
            <li>Specific tools used may include Midjourney v6, Stable Diffusion XL, and other AI image synthesis platforms.</li>
          </ul>
          <p className="text-muted-text-lt dark:text-muted-text leading-relaxed mt-2">
            The goal is to explore diverse artistic styles, from futuristic cyberpunk landscapes to serene natural vistas and abstract cosmic wonders.
            All wallpapers on this site are provided for personal use. Please enjoy them!
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-text-lt dark:text-light-text mb-3 border-b-2 border-border-light dark:border-border-dark pb-2">About the Developer</h2>
          <p className="text-muted-text-lt dark:text-muted-text leading-relaxed mb-2">
            This website was developed by The ArtScapes AI Team as a portfolio project. My role focused on full-stack development, encompassing:
          </p>
          <ul className="list-disc list-inside text-muted-text-lt dark:text-muted-text space-y-1 pl-4 mb-2">
            <li>Frontend Development: React, TypeScript, Tailwind CSS, state management, and component design.</li>
            <li>UI/UX Design: Ensuring a visually appealing and user-friendly experience.</li>
            <li>(If applicable) Backend integration for potential future features like user accounts or dynamic content.</li>
          </ul>
           <p className="text-muted-text-lt dark:text-muted-text leading-relaxed">
            I built this project to showcase my skills in modern web technologies and my passion for the intersection of art and artificial intelligence.
            I enjoy building beautiful, functional, and user-friendly web applications. This project demonstrates my ability to create a complete SPA from concept to deployment. 
            Feel free to connect or check out other projects on GitHub!
          </p>
        </section>
        
        <div className="mt-10 text-center">
            <a 
                href="https://github.com/your-username"  // Replace with actual username
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-accent hover:bg-sky-600 dark:bg-accent-lt dark:hover:bg-sky-500 text-dark-text dark:text-text-on-accent-lt font-semibold py-3 px-6 transition-colors duration-300"
            >
                View My GitHub
            </a>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
