document.addEventListener('DOMContentLoaded', () => {
    // GSAP animations
    gsap.registerPlugin(ScrollTrigger);
    const currentYear = new Date().getFullYear();
    
    // Directly embed translations
    const translations = {
        en: {
            "nav": {
                "home": "Home",
                "about": "About Us",
                "services": "Services",
                "team": "Team",
                "contact": "Contact"
            },
            "hero": {
                "title": "Expertise in Carbon Balance and Water Monitoring for Brazilian Agriculture",
                "subtitle": "Unlock the potential of your farm with fluxGHG's cutting-edge greenhouse gas and water monitoring solutions. Optimize your resource management for sustainable growth.",
                "cta": "Get Started"
            },
            "eddy_covariance": {
                "title": "Eddy Covariance: The Gold Standard in Carbon Flux Measurement",
                "paragraph1": "Eddy covariance is a highly accurate atmospheric measurement technique that quantifies the vertical turbulent fluxes of heat, water vapor, and greenhouse gases like carbon dioxide and methane. This powerful method allows fluxGHG to precisely measure the exchanges of these gases between the atmosphere and your agricultural ecosystem.",
                "paragraph2": "By deploying state-of-the-art flux towers equipped with eddy covariance technology, we can rapidly assess whether your farm is a net carbon sink or source. Our expert team will work with you to interpret the data and develop strategies to optimize your carbon balance and enhance the sustainability of your operations."
            },
            "co2_modeling": {
                "title": "Advanced CO2 Modeling: Extrapolating Carbon Dynamics Across Regions",
                "paragraph1": "At fluxGHG, we go beyond simple measurements. Our team of experienced data scientists and agronomists leverage the wealth of data collected by our flux towers to develop sophisticated CO2 models. These models allow us to simulate and predict carbon dynamics not just for your farm, but for entire regions.",
                "paragraph2": "By integrating data on soil organic matter, plant biomass, gas chambers, and remote sensing, we can extrapolate our findings to provide a comprehensive understanding of the carbon balance across various agricultural systems. This knowledge empowers you to make informed decisions about land management, crop selection, and carbon sequestration strategies, ultimately contributing to a more sustainable and climate-resilient agricultural sector in Brazil."
            },
            "water_monitoring": {
                "title": "Precision Water Management: Evapotranspiration Monitoring for Sustainable Agriculture",
                "paragraph1": "FluxGHG's eddy covariance systems provide direct, real-time measurements of evapotranspiration (ET) - monitoring water evaporation from soil and transpiration from plants. This cutting-edge technology enables you to track actual water use by your crops with unprecedented accuracy.",
                "paragraph2": "Our continuous ET monitoring empowers data-driven irrigation decisions, reducing water waste and maximizing crop productivity. By integrating ET data with soil moisture sensors and weather forecasts, we help develop precision irrigation strategies that conserve water while maintaining optimal growing conditions for Brazilian agriculture."
            },
            "about": {
                "title": "About Us",
                "expertise": {
                    "title": "Expertise",
                    "description": "Our team consists of highly qualified professionals from the Federal University of Santa Maria (UFSM), with extensive experience in greenhouse gas monitoring, micrometeorology, agronomy, and soil science."
                },
                "vision": {
                    "title": "Vision",
                    "description": "We aim to become a leader in the greenhouse gas monitoring market, helping companies make more informed and sustainable decisions through our innovative solutions."
                },
                "technology": {
                    "title": "Technology",
                    "description": "We utilize the eddy covariance technique to accurately quantify gas absorption and emissions quickly. Additionally, we use advanced AI models to extrapolate data, providing insights that enhance your understanding of carbon dynamics."
                }
            },
            "services": {
                "title": "Our Services",
                "intro": "Our specialized services help Brazilian agriculture optimize carbon balance and resource management through cutting-edge technology and expertise.",
                "installation": {
                    "title": "Installation of Measurement Systems for Greenhouse Gas Quantification",
                    "description": "We install state-of-the-art flux towers providing the fastest and most precise monitoring available. These systems measure carbon absorption and emissions, offering invaluable data for carbon credit projects and enhancing product value with rapid insights for sustainable farming."
                },
                "determination": {
                    "title": "Determination of Emission and Absorption Factors for Agricultural Areas",
                    "description": "We calculate real, location-specific emission and absorption factors tailored to Brazilian agriculture, rather than relying on US and European data. This provides you with accurate, relevant, and trustworthy data ensuring your carbon assessments are as precise as possible."
                },
                "extrapolation": {
                    "title": "Extrapolation through Modeling and Remote Sensing",
                    "description": "Using advanced satellite imagery and sophisticated software, we extrapolate flux tower data to broader areas of your property or region. This delivers comprehensive assessments covering larger landscapes and empowering data-driven decisions for your entire operation."
                },
                "water_monitoring": {
                    "title": "Hydric Monitoring and Evapotranspiration Analysis",
                    "description": "Our eddy covariance systems provide real-time evapotranspiration measurements for precision irrigation management. Monitor actual water use, optimize irrigation schedules, reduce waste, and maximize crop productivity while conserving precious water resources in changing climate conditions."
                }
            },
            "team": {
                "title": "Our Team",
                "alecsander": {
                    "name": "Alecsander Mergen",
                    "role": "Co-founder & CEO",
                    "description": "Ph.D. candidate in Physics with vast experience in the installation and configuration of Eddy Covariance systems. Alecsander is a leader in environmental monitoring technologies, bringing a deep understanding of the complex dynamics involved in gas flux measurements, making him a pivotal force behind our mission to advance sustainable agricultural practices."
                },
                "josue": {
                    "name": "Josué M. Sehnem",
                    "role": "Co-founder & CTO",
                    "description": "Electrical Engineer with extensive experience in data processing and analysis. Josué specializes in developing cutting-edge technological solutions that drive innovation in greenhouse gas monitoring and precision agriculture. His expertise ensures the highest standards of data accuracy and reliability."
                }
            },
            "contact": {
                "title": "Get in Touch",
                "description": "We'd love to hear from you! Please fill out the form and our team will get back to you shortly.",
                "name": "Your Name",
                "email": "Your Email",
                "message": "Your Message",
                "send": "Send Message",
                "email_label": "Email",
                "location_label": "Location",
                "connect_label": "Connect With Us"
            },
            "footer": {
                "copyright": `© ${currentYear} fluxGHG. All rights reserved.`,
                "punchline": "Innovative solutions for monitoring and analyzing greenhouse gas emissions using eddy covariance and advanced modeling."
            }
        },
        pt_br: {
            "nav": {
                "home": "Início",
                "about": "Sobre Nós",
                "services": "Serviços",
                "team": "Equipe",
                "contact": "Contato"
            },
            "hero": {
                "title": "Expertise em Balanço de Carbono e Monitoramento Hídrico para a Agricultura Brasileira",
                "subtitle": "Desbloqueie o potencial da sua fazenda com as soluções de ponta da fluxGHG para monitoramento de gases de efeito estufa e água. Otimize a gestão de seus recursos para um crescimento sustentável.",
                "cta": "Comece Agora"
            },
            "eddy_covariance": {
                "title": "Eddy Covariance: O Padrão Ouro na Medição de Fluxo de Carbono",
                "paragraph1": "Eddy covariance é uma técnica de medição atmosférica altamente precisa que quantifica os fluxos turbulentos verticais de calor, vapor d'água e gases de efeito estufa como dióxido de carbono e metano. Este método poderoso permite à fluxGHG medir com precisão as trocas desses gases entre a atmosfera e seu ecossistema agrícola.",
                "paragraph2": "Ao implantar torres de fluxo de última geração equipadas com tecnologia de eddy covariance, podemos avaliar rapidamente se sua fazenda é um sumidouro ou fonte líquida de carbono. Nossa equipe de especialistas trabalhará com você para interpretar os dados e desenvolver estratégias para otimizar seu balanço de carbono e melhorar a sustentabilidade de suas operações."
            },
            "co2_modeling": {
                "title": "Modelagem Avançada de CO2: Extrapolando a Dinâmica do Carbono em Regiões",
                "paragraph1": "Na fluxGHG, vamos além de simples medições. Nossa equipe de cientistas de dados e agrônomos experientes aproveita a riqueza de dados coletados por nossas torres de fluxo para desenvolver modelos sofisticados de CO2. Esses modelos nos permitem simular e prever a dinâmica do carbono não apenas para sua fazenda, mas para regiões inteiras.",
                "paragraph2": "Ao integrar dados sobre matéria orgânica do solo, biomassa vegetal, câmaras de gás e sensoriamento remoto, podemos extrapolar nossas descobertas para fornecer uma compreensão abrangente do balanço de carbono em vários sistemas agrícolas. Esse conhecimento permite que você tome decisões informadas sobre manejo do solo, seleção de culturas e estratégias de sequestro de carbono, contribuindo para um setor agrícola mais sustentável e resiliente ao clima no Brasil."
            },
            "water_monitoring": {
                "title": "Gestão Hídrica de Precisão: Monitoramento de Evapotranspiração para Agricultura Sustentável",
                "paragraph1": "Os sistemas de eddy covariance da fluxGHG fornecem medições diretas e em tempo real da evapotranspiração (ET) - monitorando a evaporação da água do solo e transpiração das plantas. Esta tecnologia de ponta permite que você acompanhe o uso real de água pelas suas culturas com precisão sem precedentes.",
                "paragraph2": "Nosso monitoramento contínuo de ET capacita decisões de irrigação baseadas em dados, reduzindo desperdício de água e maximizando produtividade das culturas. Ao integrar dados de ET com sensores de umidade do solo e previsões meteorológicas, desenvolvemos estratégias de irrigação de precisão que conservam água mantendo condições ideais de crescimento para a agricultura brasileira."
            },
            "about": {
                "title": "Sobre Nós",
                "expertise": {
                    "title": "Expertise",
                    "description": "Nossa equipe é composta por profissionais altamente qualificados da Universidade Federal de Santa Maria (UFSM), com vasta experiência em monitoramento de gases de efeito estufa, micrometeorologia, agronomia e ciência do solo."
                },
                "vision": {
                    "title": "Visão",
                    "description": "Nosso objetivo é nos tornarmos líderes no mercado de monitoramento de gases de efeito estufa, ajudando as empresas a tomar decisões mais conscientes e sustentáveis por meio de nossas soluções inovadoras."
                },
                "technology": {
                    "title": "Tecnologia",
                    "description": "Utilizamos a técnica de eddy covariance para quantificar com precisão a absorção e emissão de gases rapidamente. Além disso, usamos modelos avançados de IA para extrapolar dados, fornecendo insights que aprimoram sua compreensão da dinâmica do carbono."
                }
            },
            "services": {
                "title": "Nossos Serviços",
                "intro": "Nossos serviços especializados ajudam a agricultura brasileira a otimizar o balanço de carbono e o gerenciamento de recursos por meio de tecnologia de ponta e expertise.",
                "installation": {
                    "title": "Instalação de Sistemas de Medição para Quantificação de Gases de Efeito Estufa",
                    "description": "Instalamos torres de fluxo de última geração fornecendo o monitoramento mais rápido e preciso disponível. Esses sistemas medem absorção e emissão de carbono, oferecendo dados inestimáveis para projetos de crédito de carbono e aumentando o valor de produtos com insights rápidos para agricultura sustentável."
                },
                "determination": {
                    "title": "Determinação de Fatores de Emissão e Absorção para Áreas Agrícolas",
                    "description": "Calculamos fatores de emissão e absorção reais e específicos adaptados à agricultura brasileira, ao invés de depender de dados dos EUA e Europa. Isso fornece dados precisos, relevantes e confiáveis garantindo que suas avaliações de carbono sejam tão precisas quanto possível."
                },
                "extrapolation": {
                    "title": "Extrapolação através de Modelagem e Sensoriamento Remoto",
                    "description": "Usando imagens de satélite avançadas e software sofisticado, extrapolamos dados de torres de fluxo para áreas mais amplas de sua propriedade ou região. Isso fornece avaliações abrangentes cobrindo paisagens maiores e capacitando decisões baseadas em dados para toda a sua operação."
                },
                "water_monitoring": {
                    "title": "Monitoramento Hídrico e Análise de Evapotranspiração",
                    "description": "Nossos sistemas de eddy covariance fornecem medições de evapotranspiração em tempo real para gestão de irrigação de precisão. Monitore o uso real de água, otimize cronogramas de irrigação, reduza desperdício e maximize a produtividade das culturas enquanto conserva recursos hídricos preciosos em condições climáticas em mudança."
                }
            },
            "team": {
                "title": "Nossa Equipe",
                "alecsander": {
                    "name": "Alecsander Mergen",
                    "role": "Co-fundador e CEO",
                    "description": "Doutorando em Física com vasta experiência na instalação e configuração de sistemas de Eddy Covariance. Alecsander é um líder em tecnologias de monitoramento ambiental, trazendo uma profunda compreensão das complexas dinâmicas envolvidas nas medições de fluxo de gases, tornando-o uma força fundamental por trás de nossa missão de avançar práticas agrícolas sustentáveis."
                },
                "josue": {
                    "name": "Josué M. Sehnem",
                    "role": "Co-fundador e CTO",
                    "description": "Engenheiro Elétrico com vasta experiência em processamento e análise de dados. Josué é especializado no desenvolvimento de soluções tecnológicas de ponta que impulsionam a inovação no monitoramento de gases de efeito estufa e agricultura de precisão. Sua expertise garante os mais altos padrões de precisão e confiabilidade dos dados."
                }
            },
            "contact": {
                "title": "Entre em Contato",
                "description": "Gostaríamos de ouvir de você! Por favor, preencha o formulário e nossa equipe entrará em contato em breve.",
                "name": "Seu Nome",
                "email": "Seu Email",
                "message": "Sua Mensagem",
                "send": "Enviar Mensagem",
                "email_label": "Email",
                "location_label": "Localização",
                "connect_label": "Conecte-se Conosco"
            },
            "footer": {
                "copyright": `© ${currentYear} fluxGHG. Todos os direitos reservados.`,
                "punchline": "Soluções inovadoras para monitoramento e análise de emissões de gases de efeito estufa usando eddy covariance e modelagem avançada."
            }
        }
    };

    // Animate header on scroll
    gsap.to('header', {
        scrollTrigger: {
            start: 'top top',
            end: '+=100',
            toggleActions: 'play none none reverse',
            onEnter: () => document.querySelector('header').classList.add('scrolled'),
            onLeaveBack: () => document.querySelector('header').classList.remove('scrolled'),
        },
        duration: 0.3,
    });

    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }

    // Close menu when clicking on a link
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    // Close menu when screen resizes to desktop width
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });

    // Enhanced section animations with staggered effects
    gsap.utils.toArray('section').forEach(section => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: 'top 75%',
            }
        });
        
        tl.from(section.querySelector('h2'), {
            opacity: 0,
            y: 50,
            duration: 0.8
        });
        
        if (section.querySelector('.content-wrapper')) {
            tl.from(section.querySelector('.content-wrapper').children, {
                opacity: 0,
                y: 50,
                duration: 0.8,
                stagger: 0.2
            }, "-=0.4");
        }
        
        if (section.querySelector('.about-grid')) {
            tl.from(section.querySelectorAll('.about-item'), {
                opacity: 0,
                y: 50,
                duration: 0.8,
                stagger: 0.2
            }, "-=0.4");
        }
        
        if (section.querySelector('.services-container')) {
            tl.from(section.querySelector('.services-intro'), {
                opacity: 0,
                y: 30,
                duration: 0.8
            }, "-=0.4")
            .from(section.querySelectorAll('.service-card'), {
                opacity: 0,
                y: 50,
                duration: 0.8,
                stagger: 0.2
            }, "-=0.4");
        }
        
        if (section.querySelector('.team-grid')) {
            tl.from(section.querySelectorAll('.team-member'), {
                opacity: 0,
                y: 50,
                duration: 0.8,
                stagger: 0.2
            }, "-=0.4");
        }
        
        if (section.querySelector('form')) {
            tl.from(section.querySelector('form'), {
                opacity: 0,
                y: 30,
                duration: 0.8
            }, "-=0.4");
        }

        if (section.querySelector('.contact-wrapper')) {
            const contactTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: section.querySelector('.contact-wrapper'),
                    start: 'top 75%'
                }
            });
            
            contactTimeline
                .from('.contact-info', {
                    opacity: 0,
                    x: -50,
                    duration: 0.8,
                    ease: "power2.out"
                })
                .from('.contact-description', {
                    opacity: 0,
                    y: 20,
                    duration: 0.6
                }, "-=0.4")
                .from('.contact-detail', {
                    opacity: 0,
                    x: -30,
                    duration: 0.5,
                    stagger: 0.15
                }, "-=0.4")
                .from('.contact-form-container', {
                    opacity: 0,
                    x: 50,
                    duration: 0.8,
                    ease: "power2.out"
                }, "-=0.4")
                .from('.form-field', {
                    opacity: 0,
                    y: 30,
                    duration: 0.5,
                    stagger: 0.1
                }, "-=0.5")
                .from('.submit-btn', {
                    opacity: 0,
                    y: 20,
                    scale: 0.9,
                    duration: 0.5
                }, "-=0.3");
        }
    });

    // Enhanced image parallax effect
    const parallaxImages = document.querySelectorAll('.parallax-image');
    
    window.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        parallaxImages.forEach(image => {
            const rect = image.getBoundingClientRect();
            const imageX = rect.left + rect.width / 2;
            const imageY = rect.top + rect.height / 2;
            
            const diffX = mouseX - imageX;
            const diffY = mouseY - imageY;
            
            const maxMove = 15; // Maximum pixels to move
            
            // Calculate move distance with a damping factor for smoother effect
            const moveX = (diffX / window.innerWidth) * maxMove;
            const moveY = (diffY / window.innerHeight) * maxMove;
            
            // Apply transform with slight rotation for more dynamic effect
            gsap.to(image, {
                x: moveX,
                y: moveY,
                rotateX: moveY * 0.05,
                rotateY: -moveX * 0.05,
                duration: 1,
                ease: "power2.out"
            });
        });
    });

    // Add parallax scrolling effect to sections
    gsap.utils.toArray('.eddy-covariance, .co2-modeling, .water-monitoring').forEach(section => {
        const parallaxElements = section.querySelectorAll('.image-content');
        
        gsap.to(parallaxElements, {
            yPercent: -20,
            ease: "none",
            scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    });

    // Add modern hover effect for service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -15,
                scale: 1.02,
                boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)',
                duration: 0.3
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                scale: 1,
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.08)',
                duration: 0.3
            });
        });
    });

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Testimonial slider
    const testimonials = document.querySelectorAll('.testimonial');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.style.display = i === index ? 'block' : 'none';
        });
    }

    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }

    showTestimonial(currentTestimonial);
    setInterval(nextTestimonial, 5000);

    // Form validation and submission
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (name === '' || email === '' || message === '') {
            showNotification(
                currentLang === 'en' ? 'Please fill in all fields' : 'Por favor, preencha todos os campos', 
                'error'
            );
            return;
        }

        if (!isValidEmail(email)) {
            showNotification(
                currentLang === 'en' ? 'Please enter a valid email address' : 'Por favor, insira um endereço de email válido', 
                'error'
            );
            return;
        }

        // Add loading state to button
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalBtnContent = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span class="material-icons btn-icon loading">sync</span>`;
        submitBtn.classList.add('loading');

        try {
            const response = await fetch('/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, message }),
            });

            if (response.ok) {
                showNotification(
                    currentLang === 'en' ? 'Message sent successfully!' : 'Mensagem enviada com sucesso!', 
                    'success'
                );
                contactForm.reset();
                
                // Reset form field states
                const formFields = contactForm.querySelectorAll('.form-field');
                formFields.forEach(field => {
                    const input = field.querySelector('input, textarea');
                    const icon = field.querySelector('.field-icon');
                    if (icon) icon.style.color = 'var(--text-secondary)';
                });
            } else {
                showNotification(
                    currentLang === 'en' ? 'Error sending message. Please try again.' : 'Erro ao enviar mensagem. Por favor tente novamente.', 
                    'error'
                );
            }
        } catch (error) {
            console.error('Error:', error);
            showNotification(
                currentLang === 'en' ? 'Error sending message. Please try again.' : 'Erro ao enviar mensagem. Por favor tente novamente.', 
                'error'
            );
        } finally {
            // Reset button state
            submitBtn.innerHTML = originalBtnContent;
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
        }
    });

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.className = `notification ${type}`;
        document.body.appendChild(notification);

        gsap.to(notification, {
            opacity: 1,
            y: 20,
            duration: 0.5,
            onComplete: () => {
                gsap.to(notification, {
                    opacity: 0,
                    y: -20,
                    duration: 0.5,
                    delay: 3,
                    onComplete: () => {
                        document.body.removeChild(notification);
                    }
                });
            }
        });
    }

    // Add this new code for header scroll effect
    const header = document.querySelector('header');
    const scrollThreshold = 50; // Adjust this value as needed

    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Language selector
    const languageSelect = document.getElementById('language-select');

    // Add this to your existing DOMContentLoaded event listener
    let currentLang = 'en';

    function updateContent() {
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const keys = element.getAttribute('data-i18n').split('.');
            let value = translations[currentLang];
            for (const key of keys) {
                value = value[key];
            }
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = value;
                // Check if the input has a value and adjust the label accordingly
                if (element.value) {
                    element.nextElementSibling.classList.add('active');
                } else {
                    element.nextElementSibling.classList.remove('active');
                }
            } else if (element.tagName === 'LABEL') {
                element.textContent = value;
            } else if (element.tagName === 'A' && element.classList.contains('cta-button')) {
                element.innerHTML = `${value} <span class="material-icons">arrow_forward</span>`;
            } else {
                element.textContent = value;
            }
        });
        
        // Update helper text for language changes
        const helperTextContent = {
            'name': {
                en: 'Enter your full name',
                pt_br: 'Digite seu nome completo'
            },
            'email': {
                en: 'Enter a valid email address (e.g., name@example.com)',
                pt_br: 'Digite um endereço de email válido (ex: nome@exemplo.com)'
            },
            'message': {
                en: 'Describe how we can help you with carbon monitoring',
                pt_br: 'Descreva como podemos ajudá-lo com monitoramento de carbono'
            }
        };
        
        // Update helper text language
        document.querySelectorAll('.form-helper-text').forEach(helperText => {
            const inputId = helperText.previousElementSibling.previousElementSibling.id;
            helperText.textContent = helperTextContent[inputId][currentLang];
        });
    }

    function changeLanguage(lang) {
        currentLang = lang;
        updateContent();
        languageSelect.value = lang;
    }

    // Event listener for language select
    languageSelect.addEventListener('change', (e) => {
        changeLanguage(e.target.value);
    });

    // Add this function to properly handle the form field labels
    function setupFormInputs() {
        const formFields = document.querySelectorAll('.form-field');
        
        formFields.forEach(field => {
            const input = field.querySelector('input, textarea');
            const label = field.querySelector('label');
            
            if (!input || !label) return;
            
            // Set placeholder to space to ensure CSS selectors work properly
            input.placeholder = ' ';
            
            // Add animation when field gets focus
            input.addEventListener('focus', () => {
                field.classList.add('focused');
                const icon = field.querySelector('.field-icon');
                if (icon) icon.style.color = 'var(--primary)';
            });
            
            input.addEventListener('blur', () => {
                field.classList.remove('focused');
                if (!input.value.trim()) {
                    const icon = field.querySelector('.field-icon');
                    if (icon) icon.style.color = 'var(--text-secondary)';
                }
            });
            
            // Show label as active when input has content on page load
            if (input.value.trim() !== '') {
                field.classList.add('has-content');
                const icon = field.querySelector('.field-icon');
                if (icon) icon.style.color = 'var(--primary)';
            }
            
            // Handle input content changes
            input.addEventListener('input', () => {
                if (input.value.trim() !== '') {
                    field.classList.add('has-content');
                } else {
                    field.classList.remove('has-content');
                }
            });
        });
        
        // Add animation for submit button
        const submitBtn = document.querySelector('.submit-btn');
        if (submitBtn) {
            submitBtn.addEventListener('mouseenter', () => {
                const btnIcon = submitBtn.querySelector('.btn-icon');
                if (btnIcon) {
                    gsap.to(btnIcon, {
                        x: 5,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                }
            });
            
            submitBtn.addEventListener('mouseleave', () => {
                const btnIcon = submitBtn.querySelector('.btn-icon');
                if (btnIcon) {
                    gsap.to(btnIcon, {
                        x: 0,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                }
            });
        }
    }

    // Function to get user's preferred language
    function getPreferredLanguage() {
        const languages = navigator.languages || [navigator.language || navigator.userLanguage];
        
        for (let lang of languages) {
            lang = lang.substr(0, 2).toLowerCase();
            if (lang === 'pt') {
                return 'pt_br';
            }
            if (lang === 'en') {
                return 'en';
            }
        }
        
        return 'en'; // Default to English if no match
    }

    // Function to set language based on user preference
    function setLanguageByPreference() {
        const lang = getPreferredLanguage();
        changeLanguage(lang);
    }

    // Replace setLanguageByLocation with setLanguageByPreference
    setLanguageByPreference();
    setupFormInputs();
});