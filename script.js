document.addEventListener('DOMContentLoaded', function () {
    // Animação de scroll para seções
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('.section-content');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Parallax suave para o hero
    window.addEventListener('scroll', function () {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const heroVideo = document.querySelector('.hero-video');

        if (hero && heroVideo) {
            const rate = scrolled * -0.5;
            heroVideo.style.transform = `translateY(${rate}px)`;
        }
    });

    // Animação dos cards de features
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in-up');
    });

    // Smooth scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Botão do Calendly (popup modal)
    const scheduleBtn = document.getElementById('scheduleButton');
    if (scheduleBtn) {
        scheduleBtn.addEventListener('click', function () {
            if (window.Calendly) {
                Calendly.initPopupWidget({
                    url: 'https://calendly.com/victorelosaude/30min'
                });
            } else {
                console.error('Calendly widget não foi carregado. Verifique se o script widget.js está incluído.');
                alert('Erro ao carregar o agendamento. Por favor, tente novamente mais tarde ou entre em contato diretamente.');
            }
        });
    }

    // Redimensionamento fluido do vídeo no hero (qualquer borda ou canto)
    const imageContent = document.querySelector('.hero .image-content');
    let isResizing = false;
    let startX, startY, startWidth, startHeight;

    if (imageContent) {
        imageContent.addEventListener('mousedown', function (e) {
            isResizing = true;
            startX = e.clientX;
            startY = e.clientY;
            startWidth = imageContent.offsetWidth;
            startHeight = imageContent.offsetHeight;
            e.preventDefault();
        });

        document.addEventListener('mousemove', function (e) {
            if (isResizing) {
                const dx = e.clientX - startX;
                const dy = e.clientY - startY;
                const newWidth = startWidth + dx;
                const newHeight = startHeight + dy;
                const maxWidth = window.innerWidth - imageContent.getBoundingClientRect().left - 20;
                const maxHeight = window.innerHeight - imageContent.getBoundingClientRect().top - 20;

                imageContent.style.width = `${Math.max(50, Math.min(newWidth, maxWidth))}px`;
                imageContent.style.height = `${Math.max(50, Math.min(newHeight, maxHeight))}px`;
                imageContent.style.flexBasis = `${Math.max(50, Math.min(newWidth, maxWidth))}px`;
            }
        });

        document.addEventListener('mouseup', function () {
            isResizing = false;
        });

        imageContent.addEventListener('selectstart', function (e) {
            if (isResizing) e.preventDefault();
        });
    }

    // ===================================================================
    //  INÍCIO DA LÓGICA DO BOTÃO DE CONTROLE DE SOM DO VÍDEO
    // ===================================================================
    const video = document.getElementById('hero-video');
    const muteBtn = document.getElementById('btn-mute');

    if (video && muteBtn) {
        const iconMuted = muteBtn.querySelector('.icon-muted');
        const iconUnmuted = muteBtn.querySelector('.icon-unmuted');

        // Estado inicial: som ativado
        iconMuted.style.display = 'none';
        iconUnmuted.style.display = 'block';

        muteBtn.addEventListener('click', (event) => {
            event.stopPropagation(); 
            if (video.muted) {
                video.muted = false;
                iconMuted.style.display = 'none';
                iconUnmuted.style.display = 'block';
            } else {
                video.muted = true;
                iconMuted.style.display = 'block';
                iconUnmuted.style.display = 'none';
            }
        });
    }
    // ===================================================================
    //  FIM DA LÓGICA DO BOTÃO
    // ===================================================================

    // Controle da animação silverTextShine com intervalo de 2 minutos
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        function startSilverTextShine() {
            heroTitle.style.animation = 'none';
            heroTitle.offsetHeight;
            heroTitle.style.animation = 'fadeInUp 1s ease-out, silverTextShine 6s linear';
        }

        setTimeout(startSilverTextShine, 2000);
        setInterval(() => {
            startSilverTextShine();
        }, 120000);
    }
});

// --- Funções Globais (fora do DOMContentLoaded) ---

// Função para o botão de contato
function openContact() {
    alert('Entre em contato conosco através dos canais internos da instituição ou envie um e-mail para nossa equipe de inovação!');
}

// Efeito de typing para o título (opcional)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Adicionar classe de animação CSS
const style = document.createElement('style');
style.textContent = `
    .fade-in-up {
        opacity: 0;
        transform: translateY(30px);
        animation: fadeInUp 0.8s ease forwards;
    }

    @keyframes fadeInUp {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Efeito de hover nos cards
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Loading animation
window.addEventListener('load', function () {
    document.body.classList.add('loaded');
});

// Efeito de partículas no background (opcional)
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
        hero.appendChild(particle);
    }
}

const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(180deg); }
    }
`;
document.head.appendChild(particleStyle);

createParticles();