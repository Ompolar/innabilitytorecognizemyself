<script>
    import { fade } from 'svelte/transition';
    export let data;
    const { portfolio } = data;
  </script>
  
  <svelte:head>
    <title>{portfolio?.name || "Portfolio"} | innabilitytorecognizemyself</title>
    <meta name="description" content={portfolio?.aboutme?.substring(0, 150) || "A personal portfolio."}>
  </svelte:head>
  
  <div class="min-h-screen bg-gray-900 text-gray-200 font-light">
    <main class="max-w-4xl mx-auto p-6 md:p-12 space-y-16">
      <header class="text-center space-y-2" in:fade={{ duration: 500, delay: 200 }}>
        <h1 class="text-4xl md:text-5xl font-bold text-white tracking-tight">{portfolio?.name}</h1>
        <p class="text-xl text-cyan-400">{portfolio?.title}</p>
        <p class="text-sm text-gray-500 pt-2 tracking-widest">innabilitytorecognizemyself</p>
      </header>
  
      <section id="about" class="prose prose-invert max-w-none prose-p:text-gray-300" in:fade={{ duration: 500, delay: 400 }}>
        <h2 class="text-2xl font-semibold text-white border-b-2 border-cyan-500 pb-2 mb-6">About Me</h2>
        <p class="whitespace-pre-line">{portfolio?.aboutme}</p>
      </section>
  
      <section id="experience" in:fade={{ duration: 500, delay: 600 }}>
        <h2 class="text-2xl font-semibold text-white border-b-2 border-cyan-500 pb-2 mb-6">Experience</h2>
        <div class="space-y-8">
          {#if portfolio?.experience?.length > 0}
            {#each portfolio.experience as exp}
              <div class="relative pl-8 border-l-2 border-gray-700">
                <div class="absolute w-4 h-4 bg-cyan-500 rounded-full -left-2 top-1"></div>
                <p class="text-sm text-gray-400 mb-1">{exp.year}</p>
                <h3 class="text-lg font-bold text-white">{exp.role}</h3>
                <p class="text-md text-cyan-400 mb-2">{exp.company}</p>
                <p class="text-gray-300 leading-relaxed">{exp.description}</p>
              </div>
            {/each}
          {:else}
              <p>No experience data available.</p>
          {/if}
        </div>
      </section>
      
      <section id="education" in:fade={{ duration: 500, delay: 800 }}>
        <h2 class="text-2xl font-semibold text-white border-b-2 border-cyan-500 pb-2 mb-6">Education</h2>
        <div class="space-y-6">
          {#if portfolio?.education?.length > 0}
            {#each portfolio.education as edu}
              <div>
                <p class="text-sm text-gray-400">{edu.year}</p>
                <h3 class="text-lg font-bold text-white">{edu.school}</h3>
                <p class="text-cyan-400">{edu.degree}</p>
              </div>
            {/each}
          {:else}
              <p>No education data available.</p>
          {/if}
        </div>
      </section>
  
      <section id="contact" in:fade={{ duration: 500, delay: 1000 }}>
        <h2 class="text-2xl font-semibold text-white border-b-2 border-cyan-500 pb-2 mb-6">Contact</h2>
        {#if portfolio?.contact}
        <div class="flex flex-col md:flex-row gap-8">
            <p><strong>Email:</strong> <a href="mailto:{portfolio.contact.email}" class="text-cyan-400 hover:underline">{portfolio.contact.email}</a></p>
            <p><strong>Phone:</strong> <span class="text-cyan-400">{portfolio.contact.phone}</span></p>
            <p><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/{portfolio.contact.linkedin}" target="_blank" rel="noopener noreferrer" class="text-cyan-400 hover:underline">{portfolio.contact.linkedin}</a></p>
        </div>
        {:else}
          <p>No contact information available.</p>
        {/if}
      </section>
    </main>
  </div>