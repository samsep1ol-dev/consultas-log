document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.nav-links li');
    const pages = document.querySelectorAll('.page-content');
    const logInfo = document.getElementById('logInfo');

    // Alternar entre páginas ao clicar nos links do menu
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetPage = this.getAttribute('data-page');

            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');

            pages.forEach(page => {
                page.classList.remove('active');
                if (page.id === targetPage) {
                    page.classList.add('active');
                }
            });
        });
    });

    // Alternar texto no logInfo
    setInterval(() => {
        if (logInfo.textContent.includes('24/7')) {
            logInfo.textContent = '🚥 CONSULTAS SEM RISCO DE CAIR';
        } else {
            logInfo.textContent = '🚀 CONSULTAS DE LOGS 24/7';
        }
    }, 3000);

    // Pesquisa nos itens do menu
    document.querySelector('.search-bar input').addEventListener('keyup', function (e) {
        if (e.key === 'Enter') {
            const searchTerm = this.value.toLowerCase();
            let found = false;

            navLinks.forEach(link => {
                const linkText = link.textContent.toLowerCase();
                if (linkText.includes(searchTerm)) {
                    link.style.display = 'block'; // Mostrar se coincidir
                    found = true;
                } else {
                    link.style.display = 'none'; // Ocultar se não coincidir
                }
            });

            if (!found) {
                showNotification('info', `❌ Nenhum resultado encontrado para: ${searchTerm}`);
            } else {
                showNotification('success', `🔎 Resultados encontrados para: ${searchTerm}`);
            }
        }
    });

    // Função de notificação
    const notificationContainer = document.getElementById('notificationContainer');

    function showNotification(type, message, duration = 5000) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;

        const iconMap = {
            success: '<i class="fas fa-check-circle"></i>',
            warning: '<i class="fas fa-exclamation-triangle"></i>',
            info: '<i class="fas fa-info-circle"></i>',
            error: '<i class="fas fa-times-circle"></i>'
        };

        notification.innerHTML = `
            <div class="notification-header">
                <span class="notification-title">
                    <span class="notification-icon">${iconMap[type]}</span>
                    ${type.charAt(0).toUpperCase() + type.slice(1)}
                </span>
                <button class="notification-close">&times;</button>
            </div>
            <div class="notification-body">${message}</div>
            <div class="notification-progress">
                <div class="notification-progress-bar"></div>
            </div>
        `;

        notificationContainer.appendChild(notification);

        setTimeout(() => notification.classList.add('show'), 10);

        const progressBar = notification.querySelector('.notification-progress-bar');
        let width = 100;
        const interval = setInterval(() => {
            width -= 100 / (duration / 100);
            progressBar.style.width = `${width}%`;
            if (width <= 0) {
                clearInterval(interval);
                hideNotification(notification);
            }
        }, 100);

        notification.querySelector('.notification-close').addEventListener('click', () => {
            clearInterval(interval);
            hideNotification(notification);
        });

        function hideNotification(notification) {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }
    }
});


document.addEventListener('DOMContentLoaded', function () {
    const btnConsultar = document.getElementById('btnConsultar');
    const resultado = document.getElementById('resultado');
    const navSettings = document.querySelector('li[data-page="settings"]'); // Seleciona o item do menu
    const notificationContainer = document.getElementById('notificationContainer');

    // Função para exibir notificações
    function showNotification(type, message, duration = 5000) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;

        const iconMap = {
            success: '<i class="fas fa-check-circle"></i>',
            warning: '<i class="fas fa-exclamation-triangle"></i>',
            info: '<i class="fas fa-info-circle"></i>',
            error: '<i class="fas fa-times-circle"></i>'
        };

        notification.innerHTML = `
            <div class="notification-header">
                <span class="notification-title">
                    <span class="notification-icon">${iconMap[type]}</span>
                    ${type.charAt(0).toUpperCase() + type.slice(1)}
                </span>
                <button class="notification-close">&times;</button>
            </div>
            <div class="notification-body">${message}</div>
            <div class="notification-progress">
                <div class="notification-progress-bar"></div>
            </div>
        `;

        notificationContainer.appendChild(notification);

        setTimeout(() => notification.classList.add('show'), 10);

        const progressBar = notification.querySelector('.notification-progress-bar');
        let width = 100;
        const interval = setInterval(() => {
            width -= 100 / (duration / 100);
            progressBar.style.width = `${width}%`;
            if (width <= 0) {
                clearInterval(interval);
                hideNotification(notification);
            }
        }, 100);

        notification.querySelector('.notification-close').addEventListener('click', () => {
            clearInterval(interval);
            hideNotification(notification);
        });

        function hideNotification(notification) {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }
    }

    // Evento de clique no botão
    btnConsultar.addEventListener('click', function () {
        // Mostra a primeira mensagem
        resultado.innerHTML = '<span class="msg">⏳ Consultando logs, aguarde...</span>';

        // Após 3 segundos, mostra a segunda mensagem, exibe notificação e redireciona
        setTimeout(() => {
            resultado.innerHTML = '<span class="msg">🔐 Você não tem permissão para realizar a consulta!</span>';
            // Mostra o aviso como notificação
            showNotification('info', '🔐 Você não tem permissão para realizar a consulta!');

            // Redireciona para o menu "settings" após 2 segundos
            setTimeout(() => {
                if (navSettings) {
                    navSettings.querySelector('a').click(); // Simula o clique no menu
                }
            }, 2000);
        }, 3000);
    });
});
