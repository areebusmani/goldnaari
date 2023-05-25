// Required for running the app on namecheap server
async function loadApp() {
    await import('/app.js');
}

loadApp();
