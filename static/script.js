document.addEventListener('DOMContentLoaded', () => {
    // GSAP animations
    gsap.registerPlugin(ScrollTrigger);

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
                "installation": {
                    "title": "Installation of Measurement Systems for Greenhouse Gas Quantification",
                    "description": "We install state-of-the-art flux towers in agricultural areas, providing the fastest and most precise monitoring method available. These towers measure carbon absorption and emission, offering invaluable data that can be utilized for carbon credit projects and enhancing the value of your products. Our approach ensures you get rapid insights to support sustainable farming decisions."
                },
                "determination": {
                    "title": "Determination of Emission and Absorption Factors for Agricultural Areas",
                    "description": "Many carbon projects rely on emission and absorption factors derived from US and European data, which often do not reflect the unique conditions of Brazilian agriculture. We specialize in calculating real, location-specific emission and absorption factors for your monitored systems, providing you with accurate, relevant, and trustworthy data tailored to your needs. This ensures your carbon assessments are as precise and applicable as possible."
                },
                "extrapolation": {
                    "title": "Extrapolation through Modeling and Remote Sensing",
                    "description": "Our team employs advanced satellite imagery and sophisticated software to extrapolate data gathered from flux tower measurements, extending the insights to broader areas of your property or region. This approach allows us to deliver comprehensive assessments that cover larger landscapes, offering a detailed understanding of carbon dynamics on a bigger scale, empowering you to make data-driven decisions for your entire operation."
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
                "name": "Your Name",
                "email": "Your Email",
                "message": "Your Message",
                "send": "Send Message"
            },
            "footer": {
                "copyright": "© 2024 fluxGHG. All rights reserved."
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
                "installation": {
                    "title": "Instalação de Sistemas de Medição para Quantificação de Gases de Efeito Estufa",
                    "description": "Instalamos torres de fluxo de última geração em áreas agrícolas, fornecendo o método de monitoramento mais rápido e preciso disponível. Essas torres medem a absorção e emissão de carbono, oferecendo dados inestimáveis que podem ser utilizados para projetos de crédito de carbono e aumentando o valor de seus produtos. Nossa abordagem garante que você obtenha insights rápidos para apoiar decisões agrícolas sustentáveis."
                },
                "determination": {
                    "title": "Determinação de Fatores de Emissão e Absorção para Áreas Agrícolas",
                    "description": "Muitos projetos de carbono dependem de fatores de emissão e absorção derivados de dados dos EUA e da Europa, que muitas vezes não refletem as condições únicas da agricultura brasileira. Nós nos especializamos em calcular fatores de emissão e absorção reais e específicos para seus sistemas monitorados, fornecendo dados precisos, relevantes e confiáveis adaptados às suas necessidades. Isso garante que suas avaliações de carbono sejam tão precisas e aplicáveis quanto possível."
                },
                "extrapolation": {
                    "title": "Extrapolação através de Modelagem e Sensoriamento Remoto",
                    "description": "Nossa equipe emprega imagens de satélite avançadas e software sofisticado para extrapolar dados coletados de medições de torres de fluxo, estendendo os insights para áreas mais amplas de sua propriedade ou região. Essa abordagem nos permite fornecer avaliações abrangentes que cobrem paisagens maiores, oferecendo uma compreensão detalhada da dinâmica do carbono em uma escala maior, capacitando você a tomar decisões baseadas em dados para toda a sua operação."
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
                "name": "Seu Nome",
                "email": "Seu Email",
                "message": "Sua Mensagem",
                "send": "Enviar Mensagem"
            },
            "footer": {
                "copyright": "© 2024 fluxGHG. Todos os direitos reservados."
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
        // Remove or comment out these lines:
        // backgroundColor: 'rgba(255, 255, 255, 0.95)',
        // boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        duration: 0.3,
    });

    // Animate sections on scroll
    gsap.utils.toArray('section').forEach(section => {
        gsap.from(section.children, {
            opacity: 0,
            y: 50,
            duration: 1,
            stagger: 0.2,
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
            },
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
            showNotification('Please fill in all fields', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        try {
            const response = await fetch('/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, message }),
            });

            if (response.ok) {
                showNotification('Message sent successfully!', 'success');
                contactForm.reset();
            } else {
                showNotification('Error sending message. Please try again.', 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            showNotification('Error sending message. Please try again.', 'error');
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

    // Add parallax effect to images
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

            const radialDistance = Math.sqrt(diffX * diffX + diffY * diffY);
            const maxDistance = Math.sqrt(window.innerWidth * window.innerWidth + window.innerHeight * window.innerHeight) / 2;

            const moveX = (diffX / maxDistance) * 10; // Adjust the multiplier to control the effect intensity
            const moveY = (diffY / maxDistance) * 10;

            image.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });

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

    // Add this function to handle input focus and blur events
    function setupFormInputs() {
        const inputs = document.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.nextElementSibling.classList.add('active');
            });
            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.nextElementSibling.classList.remove('active');
                }
            });
        });
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