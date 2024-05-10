import BotWhatsapp from '@bot-whatsapp/bot';

/**
 * Un flujo de conversación que responde a las palabras clave "hola" y "buenas".
 * Invita al cliente a preguntar o responder algo específico.
 */
export default BotWhatsapp.addKeyword(['hola', 'buenas'])
    .addAnswer('¡Hola de nuevo! ¿Tienes alguna pregunta o deseas saber más sobre nuestros servicios? Estoy aquí para ayudarte. 😀')
