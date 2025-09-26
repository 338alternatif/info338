document.addEventListener('DOMContentLoaded', function() {
    // Funcionalidade do menu lateral
    const menuButton = document.querySelector('.menu-button');
    const closeButton = document.querySelector('.close-btn');
    const sideMenu = document.querySelector('.side-menu');
    const overlay = document.querySelector('.overlay');
    const header = document.querySelector('.header');
    
    // 
    sideMenu.classList.remove('active');
    overlay.classList.remove('active');
    
    // 
    function scrollToRichList() {
        console.log('');
        const richSection = document.getElementById('rich-section');
        if (richSection) {
            // 
            const headerHeight = document.querySelector('.header').offsetHeight;
            const offset = headerHeight + 20;
            const targetPosition = richSection.getBoundingClientRect().top + window.pageYOffset - offset;
            
            // 
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // 
            richSection.classList.add('highlight-section');
            
            // 
            const richListPlaceholder = document.querySelector('.rich-list-placeholder');
            if (richListPlaceholder) {
                richListPlaceholder.classList.add('rich-highlight');
                
                // 3
                setTimeout(() => {
                    richSection.classList.remove('highlight-section');
                    richListPlaceholder.classList.remove('rich-highlight');
                }, 3000);
            }
        }
    }
    
    // URL，，
    if (window.location.hash === '#rich-section' || window.location.search.includes('section=rich')) {
        // ，
        setTimeout(scrollToRichList, 500);
    }
    
    // Calcula a altura atual da viewport
    function adjustMenuHeight() {
        const viewportHeight = window.innerHeight;
        sideMenu.style.height = viewportHeight + 'px';
    }
    
    // Ajusta a altura do menu ao carregar a página e quando a janela é redimensionada
    adjustMenuHeight();
    window.addEventListener('resize', adjustMenuHeight);
    
    // Garante que a barra de navegação superior permaneça fixa durante a rolagem
    window.addEventListener('scroll', function() {
        // Todos os elementos rolam naturalmente com a página, não é necessário tratamento especial
        // Este listener é mantido como um ponto de extensão para futuras funcionalidades relacionadas à rolagem
    });
    
    // Abrir menu
    menuButton.addEventListener('click', function() {
        // Obtém a posição atual de rolagem
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Define a posição do menu e da camada de sobreposição
        sideMenu.style.top = scrollTop + 'px';
        overlay.style.top = scrollTop + 'px';
        
        // Verifica se é um dispositivo desktop (largura maior que 480px)
        const isDesktop = window.innerWidth > 480;
        
        // Ativa o menu e a camada de sobreposição
        sideMenu.classList.add('active');
        overlay.classList.add('active');
        
        // Se for desktop, adapta a altura da sobreposição para o conteúdo
        if (isDesktop) {
            const contentHeight = document.querySelector('.container').scrollHeight;
            overlay.style.height = contentHeight + 'px';
        }
        
        // Ajusta a altura
        adjustMenuHeight();
    });
    
    // Fechar menu
    function closeMenu() {
        sideMenu.classList.remove('active');
        overlay.classList.remove('active');
    }
    
    closeButton.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);
    
    // Novo: mantém o menu lateral acompanhando durante a rolagem
    window.addEventListener('scroll', function() {
        if (sideMenu.classList.contains('active')) {
            // Obtém a posição atual de rolagem
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Verifica se é um dispositivo desktop (largura maior que 480px)
            const isDesktop = window.innerWidth > 480;
            
            // No desktop, o menu acompanha o conteúdo sem necessitar de atualização de posição
            if (!isDesktop) {
                // Apenas para dispositivos móveis, atualiza a posição do menu e da camada de sobreposição
                sideMenu.style.top = scrollTop + 'px';
                overlay.style.top = scrollTop + 'px';
            }
            
            // Ajusta a altura do menu
            adjustMenuHeight();
        }
    });
    
    // Função comum para rolar até a área alvo
    function scrollToTarget(targetId, callback) {
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            // （）
            if (typeof callback === 'function') {
                callback();
            }
            
            // ，UI
            setTimeout(() => {
                // （，）
                const headerHeight = document.querySelector('.header').offsetHeight;
                const offset = headerHeight + 20; // 20px
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
                
                // 
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // 
                targetElement.classList.add('highlight-section');
                
                // 
                if (targetId === 'rich-section') {
                    const richListPlaceholder = document.querySelector('.rich-list-placeholder');
                    if (richListPlaceholder) {
                        richListPlaceholder.style.boxShadow = '0 0 25px rgba(255, 215, 0, 0.5)';
                        // ，
                        richListPlaceholder.classList.add('highlight-section');
                        
                        // 
                        setTimeout(() => {
                            richListPlaceholder.style.boxShadow = '';
                            richListPlaceholder.classList.remove('highlight-section');
                        }, 3000);
                    }
                }
                
                // 
                setTimeout(() => {
                    targetElement.classList.remove('highlight-section');
                }, 2000);
            }, 100);
            
            return true;
        }
        
        return false;
    }
    
    // Navegação de funcionalidades
    const featureItems = document.querySelectorAll('.feature-item[data-target]');
    
    featureItems.forEach(item => {
        item.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            scrollToTarget(targetId);
        });
    });
    
    // Lidar com o botão de início na navegação de funcionalidades
    const homeFeatureItem = document.querySelector('.feature-item[data-action="home"]');
    if (homeFeatureItem) {
        homeFeatureItem.addEventListener('click', function() {
            // Rolagem suave até o topo da página
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            // Adicionar efeito de feedback visual
            const mainBanner = document.querySelector('.main-banner');
            if (mainBanner) {
                mainBanner.classList.add('highlight-section');
                setTimeout(() => {
                    mainBanner.classList.remove('highlight-section');
                }, 2000);
            }
        });
    }
    
    // Funcionalidade de navegação do menu lateral
    const menuItems = document.querySelectorAll('.menu-item[data-target]');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-target');
            
            // 
            closeMenu();
            
            // 
            if (targetId === 'rich-section') {
                console.log('，');
                // 
                setTimeout(scrollToRichList, 300);
            } else {
                scrollToTarget(targetId);
            }
        });
    });
    
    // Lidar com clique no item de menu inicial (rolar para o topo)
    const homeMenuItem = document.querySelector('.menu-item[data-action="home"]');
    if (homeMenuItem) {
        homeMenuItem.addEventListener('click', function(e) {
            e.preventDefault();
            // Rolagem suave até o topo da página
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            // Adicionar efeito de feedback visual
            const mainBanner = document.querySelector('.main-banner');
            if (mainBanner) {
                mainBanner.classList.add('highlight-section');
                setTimeout(() => {
                    mainBanner.classList.remove('highlight-section');
                }, 2000);
            }
            
            closeMenu();
        });
    }
    
    // Lidar com cliques em itens de menu sem atributo data-target
    const regularMenuItems = document.querySelectorAll('.menu-item:not([data-target]):not([data-action="home"]):not(:last-child)');
    
    regularMenuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const menuText = this.querySelector('span').textContent;
            alert(`${menuText} será lançado em breve, fique atento!`);
            closeMenu();
        });
    });
    
    // Funcionalidade de favoritar jogos
    const favoriteButtons = document.querySelectorAll('.game-favorite');
    favoriteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const star = this.querySelector('i');
            if (star.classList.contains('far')) {
                star.classList.remove('far');
                star.classList.add('fas');
                alert('Jogo adicionado aos favoritos!');
            } else {
                star.classList.remove('fas');
                star.classList.add('far');
                alert('Jogo removido dos favoritos!');
            }
        });
    });

    // Efeito de rolagem simulada
    const timelineScroll = document.querySelector('.timeline');
    const gameCardsScroll = document.querySelector('.game-cards');

    // Funcionalidade dos botões de paginação
    const prevButton = document.querySelector('.page-prev');
    const nextButton = document.querySelector('.page-next');
    const pageNumber = document.querySelector('.page-number');

    let currentPage = 133;

    if (prevButton && nextButton && pageNumber) {
        prevButton.addEventListener('click', function() {
            if (currentPage > 1) {
                currentPage--;
                pageNumber.textContent = currentPage;
            }
        });

        nextButton.addEventListener('click', function() {
            currentPage++;
            pageNumber.textContent = currentPage;
        });
    }
    
 
    
    // Evento de clique na tag de promoção
    const promoTag = document.querySelector('.promo-tag');
    if (promoTag) {
        promoTag.addEventListener('click', function() {
            alert('Ver detalhes da promoção');
        });
    }
    
    // Efeitos de animação para cartões de atividades promocionais
    const activityCards = document.querySelectorAll('.activity-card');
    
    activityCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 8px 20px rgba(0,0,0,0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 3px 10px rgba(0,0,0,0.2)';
        });
        
        card.addEventListener('click', function() {
            // Aqui pode-se adicionar operações após clicar no cartão, como exibir informações detalhadas
            console.log('Activity card clicked:', this.querySelector('h3').textContent);
        });
    });
    
 
    
    // Evento de clique no botão de logout
    const logoutButton = document.querySelector('.menu-item:last-child');
    if (logoutButton) {
        logoutButton.addEventListener('click', function(e) {
            e.preventDefault();
           
                closeMenu();
            
        });
    }
    
    // Funcionalidade de ver tudo
    const viewAllButtons = document.querySelectorAll('.view-all');
    const promoActivities = document.querySelector('.promo-activities');
    let isExpanded = true;
    
    if (viewAllButtons.length > 0 && promoActivities) {
        const viewAllButton = viewAllButtons[0]; // Botão de "Ver Tudo" para promoções
        
        viewAllButton.addEventListener('click', function() {
            if (isExpanded) {
                // Recolher, mostrar apenas os 3 primeiros
                const cards = promoActivities.querySelectorAll('.activity-card');
                for (let i = 3; i < cards.length; i++) {
                    cards[i].style.display = 'none';
                }
                viewAllButton.querySelector('span').textContent = 'Mostrar Mais';
                isExpanded = false;
            } else {
                // Expandir tudo
                const cards = promoActivities.querySelectorAll('.activity-card');
                for (let i = 0; i < cards.length; i++) {
                    cards[i].style.display = 'flex';
                }
                viewAllButton.querySelector('span').textContent = 'Ver Tudo';
                isExpanded = true;
            }
        });
        
        // Recolher por padrão na inicialização
        setTimeout(() => {
            viewAllButton.click();
        }, 500);
    }
}); 