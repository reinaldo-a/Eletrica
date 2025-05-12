document.addEventListener("DOMContentLoaded", () => {
  // Menu toggle para dispositivos móveis
  const menuToggle = document.querySelector(".menu-toggle")
  const nav = document.querySelector("nav")

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      nav.classList.toggle("active")
    })
  }

  // Animação de scroll suave para links internos
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: "smooth",
        })
      }
    })
  })

  // Animação de entrada para os cards de serviço
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate")
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  // Observar cards de serviço
  document.querySelectorAll(".service-card, .service-item").forEach((item) => {
    observer.observe(item)
  })

  // Adicionar classe CSS para animação
  const style = document.createElement("style")
  style.textContent = `
        .service-card, .service-item {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .service-card.animate, .service-item.animate {
            opacity: 1;
            transform: translateY(0);
        }
    `
  document.head.appendChild(style)

  // Atualizar ano do copyright automaticamente
  const yearElement = document.querySelector(".copyright-year")
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear()
  }

  // Controle dos botões de WhatsApp
  const heroSection = document.querySelector(".hero") || document.querySelector(".page-header")
  const fixedWhatsappButton = document.querySelector(".whatsapp-button.fixed")
  const footerSection = document.querySelector("footer")

  if (heroSection && fixedWhatsappButton && footerSection) {
    // Função para verificar a posição da rolagem
    function checkScroll() {
      const heroBottom = heroSection.getBoundingClientRect().bottom
      const footerTop = footerSection.getBoundingClientRect().top
      const windowHeight = window.innerHeight

      // Mostrar o botão fixo apenas quando estiver abaixo do hero e acima do footer
      if (heroBottom <= 0 && footerTop > windowHeight) {
        fixedWhatsappButton.style.display = "flex"
      } else {
        // Ocultar o botão quando estiver no hero ou no footer
        fixedWhatsappButton.style.display = "none"
      }
    }

    // Verificar inicialmente
    checkScroll()

    // Verificar ao rolar
    window.addEventListener("scroll", checkScroll)
  }
})
