const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
let deferredPrompt;

// Event handler for the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the mini-infobar from appearing on mobile
  event.preventDefault();
  // Stash the event so it can be triggered later
  deferredPrompt = event;
  // Update UI to notify the user they can install the PWA
  butInstall.style.display = 'block';
});

// Click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
  if (deferredPrompt) {
    // Show the install prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    // Optionally, send analytics event with outcome of user choice
    console.log(`User response to the install prompt: ${outcome}`);
    // Reset the deferred prompt variable, since it can only be used once
    deferredPrompt = null;
    // Hide the install button
    butInstall.style.display = 'none';
  }
});

// Handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  // Clear the deferred prompt since the app is installed
  deferredPrompt = null;
  // Optionally, send analytics event to indicate successful installation
  console.log('PWA was installed successfully');
});
