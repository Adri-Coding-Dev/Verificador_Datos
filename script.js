const form = document.getElementById('validationForm');
        const submitBtn = document.getElementById('submit-btn');
        const formPage = document.getElementById('form-page');
        const mainPage = document.getElementById('main-page');
        
        let validations = {
            nombre: false,
            edad: false,
            correo: false,
            password: false
        };

        // Validación en tiempo real
        document.getElementById('nombre').addEventListener('input', validateName);
        document.getElementById('edad').addEventListener('input', validateAge);
        document.getElementById('correo').addEventListener('input', validateEmail);
        document.getElementById('password').addEventListener('input', validatePassword);

        function validateName() {
            const input = document.getElementById('nombre');
            const message = document.getElementById('nombre-msg');
            const value = input.value.trim();
            
            // Verificar que sean exactamente dos palabras con primera letra mayúscula
            const nameRegex = /^[A-Z][a-záéíóúñü]*\s[A-Z][a-záéíóúñü]*$/;
            
            if (value === '') {
                showMessage(message, '', 'error');
                setValidation('nombre', false, input);
                return;
            }
            
            if (nameRegex.test(value)) {
                showMessage(message, '✓ Nombre válido', 'success');
                setValidation('nombre', true, input);
            } else {
                showMessage(message, '✗ Debe ser dos palabras con primera letra mayúscula', 'error');
                setValidation('nombre', false, input);
            }
        }

        function validateAge() {
            const input = document.getElementById('edad');
            const message = document.getElementById('edad-msg');
            const age = parseInt(input.value);
            
            if (isNaN(age)) {
                showMessage(message, '', 'error');
                setValidation('edad', false, input);
                return;
            }
            
            if (age >= 18 && age <= 55) {
                showMessage(message, '✓ Edad válida', 'success');
                setValidation('edad', true, input);
            } else if (age < 18) {
                showMessage(message, '✗ Edad mínima: 18 años', 'error');
                setValidation('edad', false, input);
            } else {
                showMessage(message, '✗ Edad máxima: 55 años', 'error');
                setValidation('edad', false, input);
            }
        }

        function validateEmail() {
            const input = document.getElementById('correo');
            const message = document.getElementById('correo-msg');
            const email = input.value.trim();
            
            if (email === '') {
                showMessage(message, '', 'error');
                setValidation('correo', false, input);
                return;
            }
            
            const emailRegex = /^[^\s@]+@gmail\.com$/;
            
            if (emailRegex.test(email)) {
                showMessage(message, '✓ Correo válido', 'success');
                setValidation('correo', true, input);
            } else {
                showMessage(message, '✗ Debe ser un correo de Gmail (@gmail.com)', 'error');
                setValidation('correo', false, input);
            }
        }

        function validatePassword() {
            const input = document.getElementById('password');
            const message = document.getElementById('password-msg');
            const strengthBar = document.getElementById('password-strength');
            const password = input.value;
            const length = password.length;
            
            if (length === 0) {
                showMessage(message, '', 'error');
                strengthBar.className = 'password-strength';
                setValidation('password', false, input);
                return;
            }
            
            if (length < 6) {
                showMessage(message, '✗ Mínimo 6 caracteres', 'error');
                strengthBar.className = 'password-strength';
                setValidation('password', false, input);
            } else if (length > 25) {
                showMessage(message, '✗ Máximo 25 caracteres', 'error');
                strengthBar.className = 'password-strength';
                setValidation('password', false, input);
            } else if (length >= 6 && length <= 10) {
                showMessage(message, '⚠ Contraseña débil', 'warning');
                strengthBar.className = 'password-strength strength-weak';
                setValidation('password', true, input);
            } else if (length >= 11 && length <= 20) {
                showMessage(message, '✓ Contraseña fuerte', 'success');
                strengthBar.className = 'password-strength strength-strong';
                setValidation('password', true, input);
            } else {
                showMessage(message, '✓ Contraseña muy robusta', 'success');
                strengthBar.className = 'password-strength strength-very-strong';
                setValidation('password', true, input);
            }
        }

        function showMessage(element, text, type) {
            element.textContent = text;
            element.className = `validation-message ${type} ${text ? 'show' : ''}`;
        }

        function setValidation(field, isValid, input) {
            validations[field] = isValid;
            input.className = isValid ? 'input-valid' : (input.value ? 'input-invalid' : '');
            updateSubmitButton();
        }

        function updateSubmitButton() {
            const allValid = Object.values(validations).every(v => v);
            submitBtn.disabled = !allValid;
        }

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const userData = {
                nombre: document.getElementById('nombre').value,
                edad: document.getElementById('edad').value,
                correo: document.getElementById('correo').value
            };
            
            showMainPage(userData);
        });

        function showMainPage(userData) {
            const userInfo = document.getElementById('user-info');
            userInfo.innerHTML = `
                <h3>Información del Usuario</h3>
                <p><strong>Nombre:</strong> ${userData.nombre}</p>
                <p><strong>Edad:</strong> ${userData.edad} años</p>
                <p><strong>Correo:</strong> ${userData.correo}</p>
            `;
            
            formPage.style.display = 'none';
            mainPage.style.display = 'block';
        }

        function goBack() {
            mainPage.style.display = 'none';
            formPage.style.display = 'block';
        }