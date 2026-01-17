return (async () => {
    try {
        // 1. Select all target forms
        const forms = document.querySelectorAll('form[action$="/delete"]');
        
        // Oracle: If no forms found, report immediately
        if (forms.length === 0) return 'No posts found to delete.';

        const deletionPromises = Array.from(forms).map(form => {
            const tokenInput = form.querySelector('input[name="token"]');
            
            if (!tokenInput) return Promise.resolve({ status: "skipped", id: form.action });

            const formData = new FormData();
            formData.append('token', tokenInput.value);

            return fetch(form.action, {
                method: 'POST',
                body: formData,
                redirect: 'manual'
            }).then(res => ({
                status: res.status,
                url: form.action
            })).catch(err => ({
                status: "error",
                error: err.toString()
            }));
        });

        // 2. Execute all requests in parallel
        const results = await Promise.all(deletionPromises);
        
        return 'The JS code runs as success.';

    } catch (e) {
        return 'Error: ' + e.message;
    }
})();
