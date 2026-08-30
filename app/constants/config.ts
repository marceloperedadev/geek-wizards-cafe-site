export class Config {
  static readonly DOCTOR_NAME = process.env.NEXT_PUBLIC_DOCTOR_NAME || 'Dra. Bárbara Glayris'
  static readonly CRO_CODE = process.env.NEXT_PUBLIC_CRO_CODE || 'CRO-SP 123.456'
  static readonly INSTAGRAM_URL = process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://instagram.com/dra.barbaraglayris'
  
  // WhatsApp oficial com o número 12 99709-3459 e mensagem padrão pré-formatada
  static readonly WHATSAPP_URL = process.env.NEXT_PUBLIC_WHATSAPP_URL || 
    'https://wa.me/5512997093459?text=Ol%C3%A1%2C%20Dra.%20B%C3%A1rbara%20Glayris!%20Gostaria%20de%20agendar%20uma%20consulta%20em%20Taubat%C3%A9.'
}