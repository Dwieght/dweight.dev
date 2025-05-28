export const IntegrationExperience = () => {
  return (
    <section className="py-12 space-y-8 bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-xl p-8">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          AI Integration Experience
        </h2>
        <p className="text-muted-foreground max-w-[800px]">
          I have experience integrating and working with cutting-edge AI
          technologies
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-center">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm flex items-center gap-4 w-full md:w-auto">
          <div className="rounded-full bg-primary/10 p-3">
            <svg
              className="h-8 w-8 text-primary"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2L1 21H23L12 2Z" fill="currentColor" />
            </svg>
          </div>
          <div>
            <h3 className="font-bold text-lg">GroqAI</h3>
            <p className="text-sm text-muted-foreground">
              Integrated & Implemented
            </p>
          </div>
        </div>

        <div className="flex-1">
          <p className="text-muted-foreground">
            I have successfully integrated GroqAI into applications, leveraging
            its powerful capabilities to enhance user experiences and
            application functionality. My experience includes implementing
            AI-driven features that improve performance and provide intelligent
            solutions.
          </p>
        </div>
      </div>
    </section>
  );
};
