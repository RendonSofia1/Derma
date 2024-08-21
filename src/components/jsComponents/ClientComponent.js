import { useEffect } from "react";


const ClientComponent = () => {


    useEffect(() => {
        const form = document.getElementById('myForm');

        form.addEventListener('submit', function (event) {
            event.preventDefault();

            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const passwordError = document.getElementById('passwordError');

            if (password !== confirmPassword) {
                passwordError.textContent = "Las contraseñas no coinciden.";
            } else {
                passwordError.textContent = "";

                // // Muestra el modal de registro exitoso
                // var registroExitosoModal = new bootstrap.Modal(document.getElementById('registroExitosoModal'));
                // registroExitosoModal.show();

                registerUser();
                document.getElementById('userName').value = '';
                document.getElementById('userCel').value = '';
                document.getElementById('userEmail').value = '';
                document.getElementById('dateB').value = '';
                document.getElementById('password').value = '';
                document.getElementById('confirmPassword').value = '';

                alert('Registro exitoso!');
            }
        });
    }, []);

    function registerUser() {
        var nombre = document.getElementById('userName').value;
        var cel = document.getElementById('userCel').value;
        var password = document.getElementById('password').value;
        var email = document.getElementById('userEmail').value;
        var nacimiento = document.getElementById('dateB').value;

        if (nombre && password) {
            // Almacena los datos del usuario en localStorage (no seguro)
            localStorage.setItem('username', nombre);
            localStorage.setItem('password', password);
            console.log('Registro');
        }

    }

    return null; // No se renderiza nada en la página para este componente
};

export default ClientComponent;
