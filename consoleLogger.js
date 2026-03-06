document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('formValid', function(event) {
        const formData = event.detail;

        console.clear();
        console.log('Имя:', formData.name);
        console.log('Email:', formData.email);
        console.log('Пароль:', formData.password);
    });
});