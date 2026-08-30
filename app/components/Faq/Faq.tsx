'use client'

import styles from './Faq.module.css'

const FAQ_DATA = [
  {
    question: 'Onde fica localizado o consultório em Taubaté?',
    answer: 'Nosso atendimento é realizado em ambiente privativo e preparado com alta tecnologia no centro clínico de Taubaté, oferecendo fácil acesso e estacionamento.',
  },
  {
    question: 'O procedimento de implante dental é doloroso?',
    answer: 'Não. Utilizamos planejamento cirúrgico guiado por computador e anestesia local avançada. O procedimento é minimamente invasivo, garantindo um pós-operatório muito mais confortável.',
  },
  {
    question: 'Quanto tempo dura o tratamento com facetas e lâminas de porcelana?',
    answer: 'Com o planejamento digital 3D, o tratamento costuma ser concluído em poucas consultas. As lâminas cerâmicas possuem altíssima durabilidade e resistência a manchas.',
  },
  {
    question: 'Como funciona a primeira consulta de avaliação?',
    answer: 'Realizamos um diagnóstico completo através do mapeamento digital do seu sorriso, analisando a anatomia facial e funcionalidade antes de sugerir qualquer protocolo.',
  },
]

export function Faq() {
  return (
    <section id="faq" className={styles.faqSection}>
      <div className={styles.faqIntro}>
        <div className={styles.dentalEyebrow}>
          <span aria-hidden="true" /> TIRE SUAS DÚVIDAS
        </div>
        <h2>Perguntas Frequentes</h2>
      </div>

      <div className={styles.faqList}>
        {FAQ_DATA.map((item, index) => (
          <details key={index} className={styles.faqItem}>
            <summary className={styles.faqQuestion}>
              <strong>{item.question}</strong>
              <span className={styles.icon} aria-hidden="true">+</span>
            </summary>
            <p className={styles.faqAnswer}>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  )
}