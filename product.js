(function() {
    function fillField(selector, value) {
        const element = document.querySelector(selector);
        if (element) {
            element.value = value;
            // Crucial: Dispatch events so the UI framework (KnockoutJS) 
            // recognizes the change. Without this, the form submits empty.
            element.dispatchEvent(new Event('input', { bubbles: true }));
            element.dispatchEvent(new Event('change', { bubbles: true }));
        }
    }
    
    fillField('#firstname', 'Nicholas');
    fillField('#lastname', 'Newton');
    fillField('#telephone', '555-0123');
    fillField('#street_1', '1337 Lane');
    fillField('#city', 'Cyberville');
    fillField('#zip', '90210');

    const defaultShipping = document.querySelector('#primary_shipping');
    if (defaultShipping && !defaultShipping.checked) {
        defaultShipping.click(); 
    }

    const saveButton = document.querySelector('button.action.save.primary');
    if (saveButton) {
        saveButton.click();
    }
})();
