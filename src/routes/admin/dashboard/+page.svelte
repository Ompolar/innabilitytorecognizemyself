<script>
    import { enhance } from '$app/forms';
    import { fade } from 'svelte/transition';
    export let data;
    export let form;
  
    // --- PERBAIKAN ---
    // Kita membuat struktur default yang lengkap untuk mencegah error jika
    // data dari server kosong atau tidak lengkap.
    const defaults = {
      name: '',
      title: '',
      aboutme: '',
      contact: { email: '', phone: '', linkedin: '' },
      experience: [],
      education: []
    };
  
    // Gabungkan data dari server dengan struktur default.
    // Ini memastikan `portfolio.contact` tidak akan pernah `undefined`.
    let portfolio = {
      ...defaults,
      ...data.portfolio,
      contact: {
        ...defaults.contact,
        ...(data.portfolio?.contact || {}),
      },
    };
  
    // Pastikan `experience` dan `education` selalu berupa array dan punya setidaknya
    // satu item kosong jika array-nya kosong, agar form bisa ditampilkan.
    let experience = portfolio.experience?.length > 0 ? portfolio.experience : [{ year: '', role: '', company: '', description: '' }];
    let education = portfolio.education?.length > 0 ? portfolio.education : [{ year: '', school: '', degree: '' }];
    
    function addExperience() { experience = [...experience, { year: '', role: '', company: '', description: '' }]; }
    function removeExperience(index) { experience = experience.filter((_, i) => i !== index); }
    function addEducation() { education = [...education, { year: '', school: '', degree: '' }]; }
    function removeEducation(index) { education = education.filter((_, i) => i !== index); }
  </script>
  <svelte:head><title>Admin Dashboard</title></svelte:head>
  <div class="min-h-screen bg-gray-800 p-4 sm:p-8">
    <div class="max-w-4xl mx-auto">
      <header class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-white">Admin Dashboard</h1>
        <form action="/api/logout" method="POST">
          <button type="submit" class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition">Logout</button>
        </form>
      </header>
      {#if form?.success}
        <div class="bg-green-800 border border-green-600 text-green-200 px-4 py-3 rounded-lg relative mb-6" role="alert" in:fade>
          <span>{form.message}</span>
        </div>
      {/if}
      {#if form?.error}
        <div class="bg-red-800 border border-red-600 text-red-200 px-4 py-3 rounded-lg relative mb-6" role="alert" in:fade>
          <span>{form.error}</span>
        </div>
      {/if}
      <form method="POST" action="?/update" use:enhance class="space-y-8 bg-gray-900 p-8 rounded-xl shadow-2xl">
        <input type="hidden" name="experience" value={JSON.stringify(experience)} />
        <input type="hidden" name="education" value={JSON.stringify(education)} />
        
        <section class="space-y-4">
          <h2 class="text-2xl font-semibold text-white border-b border-gray-700 pb-2">General</h2>
          <div><label for="name" class="block text-sm font-medium text-gray-300 mb-1">Name</label><input id="name" name="name" bind:value={portfolio.name} class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition" /></div>
          <div><label for="title" class="block text-sm font-medium text-gray-300 mb-1">Professional Title</label><input id="title" name="title" bind:value={portfolio.title} class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition" /></div>
          <div><label for="aboutme" class="block text-sm font-medium text-gray-300 mb-1">About Me</label><textarea id="aboutme" name="aboutme" bind:value={portfolio.aboutme} rows="6" class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"></textarea></div>
        </section>
  
        <section class="space-y-4">
          <h2 class="text-2xl font-semibold text-white border-b border-gray-700 pb-2">Experience</h2>
          {#each experience as exp, i}
            <div class="p-4 border border-gray-700 rounded-lg space-y-3 relative">
              <button type="button" on:click={() => removeExperience(i)} class="absolute top-3 right-3 text-red-400 hover:text-red-300 text-xl font-bold">&times;</button>
              <h3 class="font-semibold text-gray-200">Experience #{i + 1}</h3>
              <input placeholder="Year" bind:value={exp.year} class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition" />
              <input placeholder="Role" bind:value={exp.role} class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition" />
              <input placeholder="Company" bind:value={exp.company} class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition" />
              <textarea placeholder="Description" bind:value={exp.description} class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"></textarea>
            </div>
          {/each}
          <button type="button" on:click={addExperience} class="py-2 px-4 bg-gray-600 hover:bg-gray-700 rounded-md text-white font-semibold transition duration-200">Add Experience</button>
        </section>
  
        <section class="space-y-4">
          <h2 class="text-2xl font-semibold text-white border-b border-gray-700 pb-2">Education</h2>
          {#each education as edu, i}
            <div class="p-4 border border-gray-700 rounded-lg space-y-3 relative">
              <button type="button" on:click={() => removeEducation(i)} class="absolute top-3 right-3 text-red-400 hover:text-red-300 text-xl font-bold">&times;</button>
              <h3 class="font-semibold text-gray-200">Education #{i + 1}</h3>
              <input placeholder="Year" bind:value={edu.year} class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition" />
              <input placeholder="School/University" bind:value={edu.school} class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition" />
              <input placeholder="Degree/Major" bind:value={edu.degree} class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition" />
            </div>
          {/each}
          <button type="button" on:click={addEducation} class="py-2 px-4 bg-gray-600 hover:bg-gray-700 rounded-md text-white font-semibold transition duration-200">Add Education</button>
        </section>
        
        <section class="space-y-4">
          <h2 class="text-2xl font-semibold text-white border-b border-gray-700 pb-2">Contact</h2>
          <input placeholder="Email" name="contact.email" bind:value={portfolio.contact.email} class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition" />
          <input placeholder="Phone" name="contact.phone" bind:value={portfolio.contact.phone} class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition" />
          <input placeholder="LinkedIn Username" name="contact.linkedin" bind:value={portfolio.contact.linkedin} class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition" />
        </section>
  
        <button type="submit" class="w-full py-3 px-4 bg-cyan-600 hover:bg-cyan-700 rounded-md text-white font-semibold transition duration-200 disabled:bg-gray-500">Save Changes</button>
      </form>
    </div>
  </div>
  <!-- Blok <style> dihapus karena kelas dipindahkan langsung ke elemen -->