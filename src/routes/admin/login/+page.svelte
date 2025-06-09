<script>
  import { authClient } from '$lib/client/firebase';
  import { signInWithEmailAndPassword } from 'firebase/auth';
  import { goto } from '$app/navigation';
  let email = '';
  let password = '';
  let error = '';
  let loading = false;
  async function handleLogin() {
    loading = true;
    error = '';
    try {
      const userCredential = await signInWithEmailAndPassword(authClient, email, password);
      const idToken = await userCredential.user.getIdToken();
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken })
      });
      if (response.ok) {
        await goto('/admin/dashboard');
      } else {
        const result = await response.json();
        throw new Error(result.message || 'Login failed.');
      }
    } catch (e) {
      error = e.message.replace('Firebase: ', '');
    } finally {
      loading = false;
    }
  }
</script>
<svelte:head><title>Admin Login</title></svelte:head>
<div class="min-h-screen flex items-center justify-center bg-gray-800">
  <div class="w-full max-w-md p-8 space-y-6 bg-gray-900 rounded-lg shadow-lg">
    <h1 class="text-2xl font-bold text-center text-white">Admin Login</h1>
    <form on:submit|preventDefault={handleLogin} class="space-y-6">
      <div>
        <label for="email" class="text-sm font-medium text-gray-300 block mb-2">Email</label>
        <input type="email" id="email" bind:value={email} required class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition">
      </div>
      <div>
        <label for="password" class="text-sm font-medium text-gray-300 block mb-2">Password</label>
        <input type="password" id="password" bind:value={password} required class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition">
      </div>
      {#if error}<p class="text-sm text-red-400">{error}</p>{/if}
      <button type="submit" disabled={loading} class="w-full py-2 px-4 bg-cyan-600 hover:bg-cyan-700 rounded-md text-white font-semibold transition duration-200 disabled:bg-gray-500 disabled:cursor-not-allowed">
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  </div>
</div>
<!-- Blok <style> dihapus karena kelas dipindahkan langsung ke elemen -->